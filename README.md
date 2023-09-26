# FCx Labs challenge

O Projeto é baseado em um sistema para cadastrar e gerenciar uma base de usuários com alguns dados minimos, login e password para autenticação.

Nesta primeira versão, não foram implementados os testes unitários.

## Arquitetura

A arquitetura do projeto esta montada no docker, através do docker-compose, com 4 serviços:
um webservice RESTFul em ASP.NET Core 7.0 LTS com OpenAPI para documentação da API
um banco de dados PostgreSQL
o PgAdmin4 para administrar o banco e o frontend rodando com o package serve no NPM.

### devOps helpers

Para executar o ambiente de teste, é preciso alterar o endereço IP 172.23.239.162 para o endereço que vai rodar os serviços (sugiro, pelo vscode, buscar no codigo onde está preenchido esse IP, são os arquivos **appsettings.json** e **.env**), acessar o PgAdmin4 pela porta 16543, adicionar o servidor (hostname: **db**, port: **5432**, database: **fcxlabs_db**, user: **fcxlabs_db_dev** e password: **Password** ), e rodar os dois scripts da pasta Scripts 01_DDL e 02_DML.

todos os usuarios estão com a mesma senha: **password123**

### acessos

<http://endereco-ip:5000/swagger/index.html> para acessar a documentação da API

<http://endereco-ip:16543> para acessar o PgAdmin

<http://endereco-ip> para acessar a interface web


### comandos

docker-compose build --no-cache

docker-compose up -d