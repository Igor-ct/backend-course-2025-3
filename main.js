const fs = require('fs');
const { program } = require('commander');

program
  .option('-i, --input <file>', 'input JSON file')
  .option('-o, --output <file>', 'output file')
  .option('-d, --display', 'display result in console');

program.parse(process.argv);
const options = program.opts();


if (!options.input) {
  console.error('Please, specify input file');
  process.exit(1);
}


if (!fs.existsSync(options.input)) {
  console.error('Cannot find input file');
  process.exit(1);
}

/*
const message = 'Operation is success';


if (options.output) {
  fs.writeFileSync(options.output, message, 'utf-8');
}


if (options.display) {
  console.log(message);
}*/