"""Funções compartilhadas: token do Bling e acesso ao Firebase.

O refresh token do Bling muda a cada renovação. Por isso ele fica guardado no
nó /_bling_auth do Firebase (fechado ao público pelas regras), e é regravado
logo depois de cada renovação, antes de qualquer outra coisa.
"""
import base64
import json
import os
import sys
import time

import requests
from google.auth.transport.requests import Request
from google.oauth2 import service_account

FB = os.environ.get("FIREBASE_URL", "https://pesquisa-produtos-16475-default-rtdb.firebaseio.com").rstrip("/")
BLING_API = "https://api.bling.com.br/Api/v3"
BLING_TOKEN_URL = BLING_API + "/oauth/token"

_fb_token = None


def falhar(msg):
    print("ERRO: " + msg)
    sys.exit(1)


# ---------- Firebase (com a service account, ignora as regras) ----------
def _token_firebase():
    global _fb_token
    if _fb_token is None:
        raw = os.environ.get("FIREBASE_SERVICE_ACCOUNT")
        if not raw:
            falhar("secret FIREBASE_SERVICE_ACCOUNT não configurado")
        cred = service_account.Credentials.from_service_account_info(
            json.loads(raw),
            scopes=[
                "https://www.googleapis.com/auth/firebase.database",
                "https://www.googleapis.com/auth/userinfo.email",
            ],
        )
        cred.refresh(Request())
        _fb_token = cred.token
    return _fb_token


def fb_get(caminho):
    r = requests.get(f"{FB}/{caminho}.json", params={"access_token": _token_firebase()}, timeout=30)
    r.raise_for_status()
    return r.json()


def fb_put(caminho, dados):
    r = requests.put(f"{FB}/{caminho}.json", params={"access_token": _token_firebase()}, json=dados, timeout=60)
    r.raise_for_status()


# ---------- Bling ----------
def _renovar(refresh_token):
    cid = os.environ.get("BLING_CLIENT_ID")
    sec = os.environ.get("BLING_CLIENT_SECRET")
    if not cid or not sec:
        falhar("secrets BLING_CLIENT_ID / BLING_CLIENT_SECRET não configurados")
    basic = base64.b64encode(f"{cid}:{sec}".encode()).decode()
    return requests.post(
        BLING_TOKEN_URL,
        headers={"Authorization": "Basic " + basic, "Accept": "1.0"},
        data={"grant_type": "refresh_token", "refresh_token": refresh_token},
        timeout=30,
    )


def token_bling():
    """Devolve um access token válido, renovando quando preciso."""
    auth = fb_get("_bling_auth") or {}
    if auth.get("access_token") and auth.get("expira_em", 0) > time.time() + 300:
        return auth["access_token"]

    refresh = auth.get("refresh_token") or os.environ.get("BLING_REFRESH_TOKEN_INICIAL")
    if not refresh:
        falhar("nenhum refresh token: rode o gerar_token_inicial.py e configure BLING_REFRESH_TOKEN_INICIAL")

    r = _renovar(refresh)
    if r.status_code != 200 and auth.get("refresh_token") and os.environ.get("BLING_REFRESH_TOKEN_INICIAL"):
        # o token guardado falhou; tenta o inicial (caso você tenha gerado um novo)
        r = _renovar(os.environ["BLING_REFRESH_TOKEN_INICIAL"])
    if r.status_code != 200:
        falhar(f"Bling recusou a renovação do token (HTTP {r.status_code}). "
               "Gere um token novo com o gerar_token_inicial.py e atualize o secret BLING_REFRESH_TOKEN_INICIAL.")

    j = r.json()
    novo = {
        "access_token": j["access_token"],
        "refresh_token": j["refresh_token"],
        "expira_em": int(time.time()) + int(j.get("expires_in", 21600)),
        "renovado_em": int(time.time()),
    }
    fb_put("_bling_auth", novo)  # grava ANTES de usar, para não perder o refresh novo
    return novo["access_token"]


def listar_produtos_bling(token):
    """Todos os produtos ativos do Bling (100 por página, respeitando 3 req/s)."""
    todos, pagina = [], 1
    while True:
        r = requests.get(
            BLING_API + "/produtos",
            headers={"Authorization": "Bearer " + token},
            params={"pagina": pagina, "limite": 100, "criterio": 2},
            timeout=30,
        )
        if r.status_code == 429:
            time.sleep(2)
            continue
        r.raise_for_status()
        dados = r.json().get("data") or []
        todos.extend(dados)
        if len(dados) < 100:
            return todos
        pagina += 1
        time.sleep(0.4)


def chave_sku(sku):
    """Firebase não aceita . # $ [ ] / nas chaves. O app usa a mesma regra."""
    s = str(sku or "").strip()
    for c in ".#$[]/":
        s = s.replace(c, "_")
    return s
