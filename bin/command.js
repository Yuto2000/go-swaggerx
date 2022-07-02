#!/usr/bin/env node
const program = require("commander");
const { execSync } = require('child_process')

program
.option("-o, --output <s>", "output file pass")
.option("-t, --type <s>", "file type")
.option("-i, --input <s>", "input file pass")
.parse(process.argv);

// make swagger-cli command
if (program._optionValues['output']
    && program._optionValues['type']
    && program._optionValues['input']
  ) {
    const cmd = execSync(
      'swagger-cli '
      + 'bundle '
      + '-o '
      + program._optionValues['output']
      + ' '
      + '-t '
      + program._optionValues['type']
      + ' '
      + program._optionValues['input']
    )
    console.log(`${cmd.toString()}`)

} else {
  console.log('options is not enough! check "-h" or "--help"')
}
