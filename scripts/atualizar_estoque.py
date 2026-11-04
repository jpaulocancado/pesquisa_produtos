"""Puxa o saldo de todos os produtos do Bling e grava em /estoque no Firebase.

Formato gravado:
  /estoque = { "atualizadoEm": <ms>, "itens": { "<sku>": <saldo> } }
O app casa cada produto pelo campo "sku" (que é o "codigo" do Bling).
"""
import time

from comum import chave_sku, fb_put, listar_produtos_bling, token_bling

token = token_bling()
produtos = listar_produtos_bling(token)

itens = {}
for p in produtos:
    k = chave_sku(p.get("codigo"))
    if not k:
        continue
    saldo = (p.get("estoque") or {}).get("saldoVirtualTotal")
    if saldo is None:
        continue
    itens[k] = saldo

fb_put("estoque", {"atualizadoEm": int(time.time() * 1000), "itens": itens})
print(f"Estoque atualizado: {len(itens)} SKUs gravados ({len(produtos)} produtos lidos no Bling).")
