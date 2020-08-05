# Adonis API application

This is the boilerplate for creating an API server in AdonisJs, it comes pre-configured with.

1. Bodyparser
2. Authentication
3. CORS
4. Lucid ORM
5. Migrations and seeds

## Setup

### Install dependencies
Run the following command to install project dependencies.
```
npm install
```
### Environment
Create a .env file based on the .env.example file in root folder. 

### Docker

Run the following command to up the serve.

```
docker-compose up -d --build
```

After you up the containers, the project is automatically served, in:
**http://localhost:3333**

Access the node container:
```
docker exec -it <container-id> sh
```

### Migrations

Inside container, you must run the migrations:

```
adonis migratrion:run
```

## Optional (CLI Commands)

### Controllers

Create controllers on cli:
```
adonis make:controller User --type http
```
