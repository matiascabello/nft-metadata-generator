# Create multiple NFTs

The process of creating multiple NFTs and making them available for minting in OpenSea consists of four steps.

## 1) Create images

For testing purposes, this repository includes a [script](https://github.com/matiascabello/sublimart/tree/main/image-generator) that automatically generates 20 plain-colored images at random.

## 2) Upload images to ipfs

The generated images must be uploaded to a storage bucket. In this case, [NFT.Storage](https://nft.storage/) was used.

For a neat bulk upload process, we can use the [NFTUp](https://nft.storage/docs/how-to/nftup/) tool, which is provided and maintained by NFT.Storage.

Once all the images are successfully uploaded, copy the CID of the newly created directory in NFT.Storage.

## 3) Create NFT metadata files

NFT metadata files store all the data related to tokens: name, description, image, attributes, etc.

For testing purposes, this repository includes a [script](https://github.com/matiascabello/sublimart/tree/main/metadata-generator) to bulk create the metadata files for the images generated in step 1.

Replace the `json` properties values with the appropriate ones, especially the CID of the directory that stores the images.

`json.name = "TOKEN_NAME" + i;`
`json.description = "TOKEN_DESCRIPTION" + i;`
`json.image = "ipfs://REPLACE_WITH_CID/" + i + ".png";`


## 4) Upload metadata files to ipfs

Similarly to step 2, bulk upload the generated metadata files to NFT.Storage using NFT UP. Copy the CID/IPFS URL as you will need it to complete the following step.



## 5) Update baseURI in the collection's smart contract

In order to make the NFT smart contract get the correct information, we must call the `setBaseURI` method in the token contract. This can be done by interacting directly with the smart contract through the blockchain explorer. Notice that only the owner of the contract can call the `setBaseURI` method.

Pass the `IPFS` URL as the newBaseURI parameter required by `setBaseURI`. Make sure to add a slash (/) at the end of the URL. For example: `ipfs://bafybeifv5swwz6wzdbj7dzfhnimis34elblloxhelk26pt6ataxpftfg5a/`