# go-swaggerx

[![License](https://poser.pugx.org/ucan-lab/laravel-dacapo/license)](https://packagist.org/packages/ucan-lab/laravel-dacapo)
## Introduction
This is a library that is supposed to use go-swagger.  
The troublesome commands are integrated into one.

[swagger-cli bundle](https://www.npmjs.com/package/swagger-cli) + [quay.io/goswagger/swagger](https://goswagger.io/generate/server.html)

## Installation
```
$ npm i go-swaggerx
```

## Usage
### option mode

command : `go-swaggerx` + optiton

option

All options are required.

`-o, --output` output file pass  
`-t, --type` file type  
`-i, --input` input file pass  
`-a, --package` the package to save the operations  
`-A, --name` the name of the application  
`-T, --template` the base directory for generating the files  
`-f, --spec` the spec file to use  

example
```
$ go-swaggerx -o ./swagger.yaml -t yaml -i ./swaggerMapping.yaml -a factory -A factory -T ./gen -f ./swagger.yaml
```
### toml file mode

command : `go-swaggerx`

sample toml file

```toml
# This is a sample TOML document.

title = "example"

# do not edit
[command]
makeSwaggerFile = "swagger-cli bundle"
generateCode = "docker run --rm  --user $(id -u):$(id -g) -e GOPATH=$(go env GOPATH):/go -v $HOME:$HOME -w $(pwd) quay.io/goswagger/swagger generate server"

[makeSwaggerConfig]
output = "./swagger.yaml"
type = "yaml"
input = "./swaggerMapping.yaml"

[generateCodeConfig]
package = "factory"
name = "factory"
template = "./gen"
spec = "./swagger.yaml"
```
