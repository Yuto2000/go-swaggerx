#!/usr/bin/env node
const program = require("commander");
const { execSync } = require('child_process')

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

if (program._optionValues['output']
    && program._optionValues['type']
    && program._optionValues['input']
    && program._optionValues['package']
    && program._optionValues['name']
    && program._optionValues['template']
    && program._optionValues['spec']
  ) {
    // swagger-cli
    const cmd = execSync(
      'swagger-cli '
      + 'bundle '
      + '-o '
      + program._optionValues['output'] + ' '
      + '-t '
      + program._optionValues['type'] + ' '
      + program._optionValues['input']
    )
    console.log(`${cmd.toString()}`)

    // quay.io/goswagger/swagger
    const generate_cmd = execSync(
      'docker run --rm  --user $(id -u):$(id -g) -e GOPATH=$(go env GOPATH):/go -v $HOME:$HOME -w $(pwd) quay.io/goswagger/swagger generate server '
      + '-a '
      + program._optionValues['package'] + ' '
      + '-A '
      + program._optionValues['name'] + ' '
      + '-t '
      + program._optionValues['template'] + ' '
      + '-f '
      + program._optionValues['spec']
    )
    console.log(`${generate_cmd.toString()}`)

} else {
  console.log('options is not enough! check "-h" or "--help"')
}
