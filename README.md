# Overview
Sample program to build MySQL and Fast API environment with DockerCompose

# Install
Create and Running
```
$ docker-compose up -d --build

# Debug Mode 
$ docker-compose -f debug-docker-compose.yml up --build -d
```

# Demo
## Document of API
http://localhost:8000/docs

#Debug Mode
http://localhost:8080/docs
You can try GET, POST, PUT


# Show Database
$ docker exec -it db bash

$ mysql -u user -h 127.0.0.1 -D worder -p
$ password
$ show databases;

$ show variables like "char%";
## ex) GET
```
$ curl -X GET "http://localhost:8000/users" -H "accept: application/json"
```
Result
```
[{"id":1,"age":15,"name":"太郎"},{"id":2,"age":18,"name":"次郎"},{"id":3,"age":20,"name":"花子"}]
```
## ex) POST
```
$ curl -X POST "http://localhost:8000/user?name=士郎&age=10" -H "accept: application/json"
```

Result
```
[{"id":1,"age":15,"name":"太郎"},{"id":2,"age":18,"name":"次郎"},{"id":3,"age":20,"name":"花子"},{"id":4,"age":10,"name":"士郎"}]
```

## ex) PUT
```
$ curl -X PUT "http://localhost:8000/users" -H "accept: application/json" -H "Content-Type: application/json" -d "[{\"id\":2,\"name\":\"次郎\",\"age\":13}]"
```

Result
```
[{"id":1,"age":15,"name":"太郎"},{"id":2,"age":13,"name":"次郎"},{"id":3,"age":20,"name":"花子"},{"id":4,"age":10,"name":"士郎"}]
```
$メニューの追加　put
http://localhost:8000/menus?category_id=1&menu=ピザ&price=1200&view_no=10

$メニューの編集　post
http://localhost:8000/menus?id=1&category_id=1&menu=やきそば&price=1100&view_no=99

