#!/usr/bin/env node
const program = require('commander');
const { execSync } = require('child_process');
const fs = require('fs');
const toml = require('toml');

program
// swagger-cli
.option("-o, --output <s>", "output file pass")
.option("-t, --type <s>", "file type")
.option("-i, --input <s>", "input file pass")
// code generate
.option("-a, --package <s>", "the package to save the operations")
.option("-A, --name <s>", "the name of the application")
.option("-T, --template <s>", "the base directory for generating the files")
.option("-f, --spec <s>", "the spec file to use")
.parse(process.argv);

// option pattern
if (program._optionValues['output']
    && program._optionValues['type']
    && program._optionValues['input']
    && program._optionValues['package']
    && program._optionValues['name']
    && program._optionValues['template']
    && program._optionValues['spec']
  ) {
    const makeSwaggerFileCommand = 'swagger-cli bundle';
    const generateCodeCommand = 'docker run --rm  --user $(id -u):$(id -g) -e GOPATH=$(go env GOPATH):/go -v $HOME:$HOME -w $(pwd) quay.io/goswagger/swagger generate server';
    const makeSwaggerConfig = {
      output : program._optionValues['output'],
      type : program._optionValues['type'],
      input : program._optionValues['input'],
    };
    const generateCodeConfig = {
      package : program._optionValues['package'],
      name : program._optionValues['name'],
      template : program._optionValues['template'],
      spec : program._optionValues['spec'],
    };

    // swagger-cli
    execMakeSwagger(makeSwaggerFileCommand, makeSwaggerConfig)
    // generate code
    execGenerateCode(generateCodeCommand, generateCodeConfig)

  // toml pattern
  } else if (Object.keys(program._optionValues).length === 0) {
    // read toml file
    const config = toml.parse(fs.readFileSync("./go-swaggerx.toml", "utf-8"));
    const command = config.command;
    const makeSwaggerConfig = config.makeSwaggerConfig;
    const generateCodeConfig = config.generateCodeConfig;

    if (command.makeSwaggerFile
      && command.makeSwaggerFile
      && command.generateCode
      && makeSwaggerConfig.output
      && makeSwaggerConfig.type
      && makeSwaggerConfig.input
      && generateCodeConfig.package
      && generateCodeConfig.name
      && generateCodeConfig.template
      && generateCodeConfig.spec
      ) {
      // swagger-cli
      execMakeSwagger(command.makeSwaggerFile, makeSwaggerConfig)
      // generate code
      execGenerateCode(command.generateCode, generateCodeConfig)
    } else {
      errorMessage('check toml file');
    }

  } else {
    errorMessage('check "-h" or "--help"');
  }

function execMakeSwagger(command, config) {
  const cmd = execSync(
    command + ' '
    + '-o '
    + config.output + ' '
    + '-t '
    + config.type + ' '
    + config.input
  )
  console.log(`${cmd.toString()}`)
}

function execGenerateCode(command, config) {
  const cmd = execSync(
    command + ' '
    + '-a '
    + config.package + ' '
    + '-A '
    + config.name + ' '
    + '-t '
    + config.template + ' '
    + '-f '
    + config.spec + ' '
  )
  console.log(`${cmd.toString()}`)
}

function errorMessage(reason) {
  console.log('options is not enough! ' + reason);
}
