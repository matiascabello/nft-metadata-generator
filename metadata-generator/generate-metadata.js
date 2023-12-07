const fs = require('fs')

const outputDir = "generated-metadata"

if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir);
  }

for (let i = 1; i <= 20; i++) {
    let json = {};
    json.name = "TOKEN_NAME" + i;
    json.description = "TOKEN_DESCRIPTION" + i;
    json.image = "ipfs://REPLACE_WITH_CID/" + i + ".png";

    fs.writeFileSync(`${outputDir}/${i}`, JSON.stringify(json))

    console.log(`Metadata file generated for token ${i}`)
}