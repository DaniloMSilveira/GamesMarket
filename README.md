# LearningDotnet
Repositório para criação de serviços em .Net

# Buildando a imagem docker do serviço (dentro da pasta do projeto GamesMarketApi)
docker build -t gamesmarketapi:1.0 .

# Executando migrations do Entity Framework
dotnet ef database update --project GamesMarketApi

# Subindo docker-compose com todas as aplicações
docker-compose up -d

# Lista de TODOS para fazer (backend):
- [ ] Validação nos DTOs para evitar erros durante o mapeamento para os modelos
- [ ] Implementar as demais rotas da API
- [ ] Adicionar filtros e paginação na rota GetGames
- [ ] Criar projeto com os testes de integração (verificar db in memory)
- [ ] Verificar forma de rodar as migrations do entity framework ao subir aplicação com docker-compose
- [ ] Criar rota de teste que utilizara querys SQL na unha
- [X] Implementar autenticação com o Identity
- [ ] Criar pub/sub com o RabbitMQ e um novo projeto com subscribers

# Lista de TODOS para fazer (frontend):
- [ ] Resolver problemas de build, reloading e lentidão ambiente de desenvolvimento (wsl2)
- [ ] Resolver todos conflitos do tslint com as tipagens corretas
- [ ] Terminar as telas de autenticação e atualização das roles com integração do identity
- [ ] Terminar pagina de home, menu lateral e demais telas
- [ ] Mudar form de crud para não ficar mudando a tela ao criar/editar
- [ ] Implementar boas praticas de frontend como cache e socket
