const fs = require('fs')
const csv = require('csv-parser')
const colorNamer = require('color-namer')
const { program } = require('commander');

program
  .option('--input <file>', 'Input file')
  .option('--ipfs <url>', 'IPFS Url')
  .parse(process.argv);

const options = program.opts();

if (!options.input || !options.ipfs) {
  console.error('Both --input and --ipfs options are required.');
  process.exit(1);
}

const ipfsURL = options.ipfs;
const csvFilePath = options.input;
const outputDir = "generated-metadata"

let fileNumber = 1

fs.createReadStream(csvFilePath)

  .pipe(csv())
  .on('data', (row) => {

    const calculateShadowDirection = () => {

      const light = row['light_x'];

      if (light > 0.33) {
        return 'Left';
      } else if (light >= -0.33 && light <= 0.33) {
        return 'Center';
      } else {
        return 'Right';
      }

    }

    const findBgColorName = () => {

      const r = row['bgcolor__001'];
      const g = row['bgcolor__002'];
      const b = row['bgcolor__003'];
      
      const color = colorNamer(`rgb(${r},${g},${b})`, {pick: ['html']})

      return color.html[0].name
    }


    const cnt = parseInt(row['cnt'], 10)
    const imageUrl = ipfsURL + row['image'];
    const itemName = row['name'];
    row['name'] = `${itemName} #${cnt + 1}`;
    row['image'] = imageUrl;

    const traits = [
      { trait_type: 'Burn date', value: row['attributes[burn_date]'] },
      { trait_type: 'Burn location', value: row['attributes[burn_location]'] },
      { trait_type: 'Curves', value: row['attributes[curves]'] },
      { trait_type: 'Technique', value: row['attributes[technique]'] },
      { trait_type: 'Artist', value: row['attributes[artist]'] },
      { trait_type: 'Shadow', value: calculateShadowDirection() },
      { trait_type: 'Background color', value: findBgColorName() },
      { trait_type: 'Width', value: row['width'] }
    ];


    // Delete unused rows to keep them from being inserted into the json file.

    delete row['attributes[burn_date]'];
    delete row['attributes[burn_location]'];
    delete row['attributes[curves]'];
    delete row['attributes[technique]'];
    delete row['attributes[artist]'];
    delete row['width'];
    delete row['height'];
    delete row['id'];
    delete row['cnt'];
    delete row['light_x'];
    delete row['bgcolor__001'];
    delete row['bgcolor__002'];
    delete row['bgcolor__003'];
    

    // Build json file with rows and traits array.

    const json = JSON.stringify({...row, traits});
    fs.writeFileSync(`${outputDir}/${fileNumber}`, json)
    
    fileNumber++

  })
  .on('end', () => {
    console.log("CSV File Processed. Metadata files generated!")
  })