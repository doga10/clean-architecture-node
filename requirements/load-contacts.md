# Listar contatos

> ## Caso de sucesso

1. ✅ Recebe uma requisição do tipo **GET** na rota **/v1/contacts**
2. ✅ Valida se a requisição foi feita por um **usuário**
3. ✅ Retorna **204** se não tiver nenhum contato
4. ✅ Retorna **200** com os dados dos contatos

> ## Exceções

1. ✅ Retorna erro **404** se a API não existir
2. ✅ Retorna erro **401** se não for um usuário
3. ✅ Retorna erro **500** se der erro ao tentar listar os contatos