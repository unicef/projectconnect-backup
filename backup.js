var azure = require('azure-storage');
var config = require('./config.js');
var fs = require('fs');
var azure_key = config.azure.key1;
var storage_account = config.azure.storage_account;
var blobSvc = azure.createBlobService(storage_account, azure_key);
var containerName = 'backup-school-mapping';

upload_blob_and_destroy_file(process.argv[2])
function upload_blob_and_destroy_file(filename) {
  console.log('Begin store to blob:', filename);
  return new Promise(function(resolve, reject) {
    blobSvc.createBlockBlobFromLocalFile(
      containerName,
      filename,
      filename,
      function(err, result, response) {
        if (!err) {
          console.log(filename, 'uploaded!');
          fs.unlink(filename, function(err) {
            if (err) {
              return reject(err);
            }
            console.log('file deleted successfully');
            resolve();
          });
        } else {
          return reject(err);
        }
      });
  });
}

