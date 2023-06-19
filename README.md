# Clean Node API

## Rota de Login

1. Tratamento de Exceções

- Validar se email não foi preenchido (erro 400)
- Validar se email digitado está correto (erro 400)
- Validar se senha não foi preenchida (erro 400)
- Validar se não foi enviada nenhuma requisição (erro 500)
- Validar se não foi enviado nenhum dados no corpo da requisição (erro 500)

2. Autenticação do Usuário

- Validar se os parametros foram passados corretamente na requisição
- Validar se algum dos parâmetros foram passados incorretamente (erro 401)
- Validar se gerou o acess token quando as credenciais foram inseridas (200)
- Validar se não foi enviada nenhuma autenticação (erro 500)
- Validar se foi enviada uma autenticação no corpo da requisição (erro 500)
