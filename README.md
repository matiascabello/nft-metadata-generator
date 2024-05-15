# NFT Metadata JSON Generator 0.1

NFT Metadata JSON Generator takes a CSV file with the metadata of an NFT Collection and creates a JSON file for each item with the specifications required by NFT Marketplaces such as OpenSea.

## Considerations for version 0.1

The first version of NFT Metadata JSON Generator was tailored taking into consideration the specifications of the [Sublimart NFT Collection](https://opensea.io/collection/sublimart-buenos-aires-1). Consider it a PoC that may evolve into a more flexible software, suitable for the needs of most NFT projects.

## Usage

To run the program, clone the repository, navigate to `/metadata-generator`, and execute the following command:

```bash
node generate-metadata --input <PATH_TO_CSV> --ipfs <IPFS_BASE_URL>
```

The command takes two arguments:

- `input`: path to the csv file with your metadata.
- `ipfs`: base URL of the images directory.

### CSV File

In this case the csv file should include the following columns:

- name
- description
- image (file name)
- external URL
- attributes[artist]
- attributes[burn_date]
- attributes[burn_location]
- attributes[technique]
- attributes[curves]
- width
- heigh
- id
- cnt
- ligh_x
- bgcolor__001
- bgcolor__002
- bgcolor__003

### IPFS URL

Before generating the set of JSON files, all item images should have been uploaded to IPFS or any other decentralized storage platform, as the program requires the URL of the directory with all the images. E.g: `ipfs://bafybeifgk4maoi7b436httwca643uq2u6yhoenc3o7yj4jsfbuatbontga/`

### Output

All generated JSON files are stored inside the `generated-metadata` directory.

Generated JSON example:


```json
{
    "name":"Test Name #1",
    "description":"Test Description",
    "image":"ipfs://bafybeifjvaqfaw62pvtmsctognkawvxjsdaiemelqf4quvdgoinsfwbw7q/5-82.png","external_url":"https://www.sublim.art/artwork/lo-abierto@flo_giovanni_pacini","traits":  [
        {"trait_type":"Burn date","value":"2022-09-16"},
        {"trait_type":"Burn location","value":"Buenos Aires"},
        {"trait_type":"Curves","value":"14"},
        {"trait_type":"Technique","value":"Oil on canvas"},
        {"trait_type":"Artist","value":"Flo Giovanni Pacini"},
        {"trait_type":"Shadow","value":"Left"},
        {"trait_type":"Background color","value":"dimgray"},
        {"trait_type":"Width","value":"8.5"}
    ]
}
```

#### Clarifications on JSON Data Construction

1. `name` and `description` fields in the CSV file directly map to `name` and `description` in the JSON output.

2. `image` is constructed by appending the `file_name` string to the `ipfs` constant passed as an argument.

3. The array of `traits` represents the atttributes of the item.

4. `Burn date`, `Burn location`, `Curves`, `Technique`, and `Artist` values are directly taken from their respective fields in the CSV file.

5. `Shadow` is calculated taking the `light_x` field, representing the direction of the projected shadow.

6. `Background color` is derived from `bgcolor__001`, `bgcolor__002`, `bgcolor__003` values, which together form an RGB color code. This code is then translated into a more friendly color name using the `color-namer` library.