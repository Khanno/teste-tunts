# README to configurate the JSON file

## Name and Localization
The JSON file must have 'service_accounts_credentials' as its name. And must be at the source folder with the index.js or it won't work.

If you want just to change the line where the file is located, please refer to the line 15 in the index.js file.

```
await doc.useServiceAccountAuth(require('./service_accounts_credentials.json'));
```

## How it works

The index.js is a script that when executed will access a sheet with the specific ID - see line 8 in the index.js file if you want to change it, but the script wont work if the sheet is is another template than the original made for this script. 

```
const doc = new GoogleSpreadsheet('1WAbcyMZGSAxTot9RrJEDL8IcgfzdhtvoD8GObm-c-gU');
```

First you will need the dependecies, just run the following command in the terminal to download them.

```
npm install
```

Then, run npm start to let the script run.

```
npm start
```
