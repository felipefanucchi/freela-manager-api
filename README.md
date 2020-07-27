# Adonis API application

This is the boilerplate for creating an API server in AdonisJs, it comes pre-configured with.

1. Bodyparser
2. Authentication
3. CORS
4. Lucid ORM
5. Migrations and seeds

## Setup

### Docker

Run the following command to up the serve.

```
docker-compose up -d --build
```

Access the node container:
```
docker exec -it <container-id> sh
```

### Migrations

Inside container, you must run the migrations:

```
adonis migratrion:run
```

### Controllers

Create controllers on cli:
```
adonis make:controller User --type http
```
