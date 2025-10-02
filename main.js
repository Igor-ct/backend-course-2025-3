const fs = require('fs');
const { program } = require('commander');

program
  .option('-i, --input <file>', 'input JSON file')
  .option('-o, --output <file>', 'output file')
  .option('-d, --display', 'display result in console')
  .option('-s, --survived', 'display only survived passengers')
  .option('-a, --age', 'display age of passengers');

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


let rawData = fs.readFileSync(options.input, 'utf-8')
  .split('\n')
  .filter(line => line.trim() !== '')
  .map(line => JSON.parse(line));


let result = rawData
  .filter(passenger => {
    if (options.survived) {
      return passenger.Survived == 1;
    }
    return true;
  })
  .map(passenger => {
    let name = passenger.Name || 'Unknown';
    let ticket = passenger.Ticket || 'NoTicket';
    let age = options.age ? (passenger.Age ?? 'Unknown') : '';
    return `${name} ${age} ${ticket}`.trim();
  })
  .join('\n');


if (options.output) {
  fs.writeFileSync(options.output, result, 'utf-8');
}

if (options.display) {
  console.log(result);
}