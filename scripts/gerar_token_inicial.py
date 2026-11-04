"""Roda UMA vez no seu PC para gerar o primeiro refresh token do Bling.

Não precisa de servidor: depois de autorizar, o navegador vai tentar abrir
o link de redirecionamento (pode dar "página não encontrada", tudo bem).
Copie o endereço inteiro da barra e cole aqui.

Uso:  python gerar_token_inicial.py
"""
import base64
import secrets
import urllib.parse
import webbrowser

import requests

cid = input("Client ID do app no Bling: ").strip()
sec = input("Client Secret: ").strip()
state = secrets.token_hex(8)
url = ("https://www.bling.com.br/Api/v3/oauth/authorize?response_type=code"
       f"&client_id={urllib.parse.quote(cid)}&state={state}")
print("\nAbrindo o navegador para autorizar...\n" + url + "\n")
webbrowser.open(url)

volta = input("Cole aqui o endereço completo para onde o Bling te mandou (ou só o code): ").strip()
code = urllib.parse.parse_qs(urllib.parse.urlparse(volta).query).get("code", [volta])[0]

basic = base64.b64encode(f"{cid}:{sec}".encode()).decode()
r = requests.post("https://api.bling.com.br/Api/v3/oauth/token",
                  headers={"Authorization": "Basic " + basic, "Accept": "1.0"},
                  data={"grant_type": "authorization_code", "code": code}, timeout=30)
if r.status_code != 200:
    print("Falhou:", r.status_code, r.text)
else:
    print("\nRefresh token (cole no secret BLING_REFRESH_TOKEN_INICIAL):\n")
    print(r.json()["refresh_token"])
