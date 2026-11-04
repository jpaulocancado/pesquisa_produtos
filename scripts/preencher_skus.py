"""Preenche o campo "sku" dos produtos do app comparando o nome com o do Bling.

- Só mexe em produtos que ainda não têm sku (a menos que SOBRESCREVER=sim).
- Casa por nome normalizado (sem acento, maiúsculo, espaços simples).
- Se existir scripts/de-para.csv (colunas: produto;sku), ele tem prioridade.
- O resultado sai no resumo da execução do GitHub Actions.
"""
import csv
import os
import re
import time
import unicodedata

from comum import fb_get, fb_put, listar_produtos_bling, token_bling


def norm(t):
    t = unicodedata.normalize("NFD", str(t or "")).encode("ascii", "ignore").decode()
    return re.sub(r"\s+", " ", t).strip().upper()


sobrescrever = os.environ.get("SOBRESCREVER", "nao").lower() == "sim"

app = fb_get("produtos") or []
if isinstance(app, dict):  # Firebase às vezes devolve lista como objeto
    app = [app[k] for k in sorted(app, key=lambda x: int(x))]

bling = listar_produtos_bling(token_bling())
por_nome = {}
for b in bling:
    if b.get("codigo"):
        por_nome.setdefault(norm(b.get("nome")), []).append(b["codigo"])

manual = {}
caminho_csv = os.path.join(os.path.dirname(__file__), "de-para.csv")
if os.path.exists(caminho_csv):
    with open(caminho_csv, encoding="utf-8-sig") as f:
        amostra = f.read(2048)
        f.seek(0)
        sep = ";" if amostra.count(";") >= amostra.count(",") else ","
        for linha in csv.DictReader(f, delimiter=sep):
            nome, sku = linha.get("produto"), (linha.get("sku") or "").strip()
            if nome and sku:
                manual[norm(nome)] = sku

ok, ja_tinha, duplos, sem = [], 0, [], []
for p in app:
    if not isinstance(p, dict) or not p.get("produto"):
        continue
    if p.get("sku") and not sobrescrever:
        ja_tinha += 1
        continue
    n = norm(p["produto"])
    if n in manual:
        p["sku"] = manual[n]
        ok.append((p["produto"], p["sku"], "de-para.csv"))
    elif len(por_nome.get(n, [])) == 1:
        p["sku"] = por_nome[n][0]
        ok.append((p["produto"], p["sku"], "nome igual"))
    elif len(por_nome.get(n, [])) > 1:
        duplos.append((p["produto"], ", ".join(por_nome[n])))
    else:
        sem.append(p["produto"])

if ok:
    fb_put("produtos", app)
    # avisa os outros aparelhos que a lista mudou (o app pergunta antes de sobrescrever)
    fb_put("produtosMeta", {"updatedAt": int(time.time() * 1000), "updatedBy": "github-actions"})

linhas = [
    "## Preenchimento de SKUs",
    f"- Preenchidos agora: **{len(ok)}**",
    f"- Já tinham SKU: {ja_tinha}",
    f"- Nome repetido no Bling (escolha na mão): {len(duplos)}",
    f"- Sem correspondência no Bling: {len(sem)}",
    "",
]
if duplos:
    linhas += ["### Nome repetido no Bling", "| Produto | SKUs possíveis |", "|---|---|"]
    linhas += [f"| {a} | {b} |" for a, b in duplos] + [""]
if sem:
    linhas += ["### Sem correspondência (preencha no app ou no de-para.csv)"] + [f"- {s}" for s in sem] + [""]
if ok:
    linhas += ["### Preenchidos", "| Produto | SKU | Como |", "|---|---|---|"]
    linhas += [f"| {a} | {b} | {c} |" for a, b, c in ok]

texto = "\n".join(linhas)
print(texto)
resumo = os.environ.get("GITHUB_STEP_SUMMARY")
if resumo:
    with open(resumo, "a", encoding="utf-8") as f:
        f.write(texto + "\n")
