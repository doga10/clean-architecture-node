# Criar contato

> ## Caso de sucesso

1. ✅ Recebe uma requisição do tipo **POST** na rota **/v1/contacts**
2. ✅ Valida se a requisição foi feita por uma **account**
3. ✅ Valida dados obrigatórios **name** e **phone**
4. ✅ **Cria** um contato com os dados fornecidos
5. ✅ Retorna **204**, com o registro salvo no banco

> ## Exceções

1. ✅ Retorna erro **404** se a API não existir
2. ✅ Retorna erro **401** se não ouver account
3. ✅ Retorna erro **400** se name ou phone não forem fornecidos pelo client
4. ✅ Retorna erro **500** se der erro ao tentar criar o contato