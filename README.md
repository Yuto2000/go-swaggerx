# go_swagger_help_package

## Introduction
This is a library that is supposed to use go-swagger.  
The troublesome commands are integrated into one.

[swagger-cli bundle](https://www.npmjs.com/package/swagger-cli) + [quay.io/goswagger/swagger](https://goswagger.io/generate/server.html)

## Installation
```
$ npm i go_swagger_help_package
```

## Usage

All options are required.

-o, --output output file pass  
-t, --type file type  
-i, --input input file pass  
-a, --package the package to save the operations  
-A, --name the name of the application  
-T, --template the base directory for generating the files  
-f, --spec the spec file to use  

example
```
$ go_swa_help -o ./swagger.yaml -t yaml -i ./swaggerMapping.yaml -a factory -A factory -T ./gen -f ./swagger.yaml
```
