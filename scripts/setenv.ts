const { writeFile } = require('fs');
const { argv } = require('yargs');

// read environment variables from .env file
require('dotenv').config();

// read the command line arguments passed with yargs
const environment = argv.environment;
const isProduction = environment === 'prod';

const targetPath = isProduction ? `./src/environments/environment.prod.ts` : `./src/environments/environment.ts`;

// we have access to our environment variables in the process.env object
// Thanks to dotenv
const environmentFileContent = `
export const environment = {
  production: ${isProduction},
  baseUrl: "${process.env["API_URL"]}",
  apiKey: "${process.env["API_KEY"]}"
};
`;

// write the content to the respective file
writeFile(targetPath, environmentFileContent, function(err: any) {
  if (err) {
    console.log('An error occurred', err);
    return;
  }

  console.log(`Wrote variables to ${targetPath}`);
});

//read the command line arguments passed with yargs
if (!process.env["API_KEY"] || !process.env["API_URL"]) {
  console.error('All the required environment variables were not provided!');
  process.exit(-1)
}