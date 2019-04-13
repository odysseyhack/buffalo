const driver = require('bigchaindb-driver');
const config = require('../config/config');
const keyGenerationUtils = require('../utils/keyGenerationUtils');

const BIGCHAINDB_URL = process.env.BIGCHAINDB_URL || config.bigchaindburl;

const connection = new driver.Connection(BIGCHAINDB_URL);

function registerProduct(keySeed, product) {
  const currentIdentity = keyGenerationUtils.generateKeypair(keySeed);
  return new Promise((resolve, reject) => {
    // Create asset object.
    const assetData = {
      type: 'TestProduct-2019',
      item: product,
    };

    // Create metadata object.
    const metaData = {
      action: 'register product',
      date: new Date().toISOString(),
    };

    // CREATE transaction.
    const registerProductToNetwork = driver.Transaction.makeCreateTransaction(

      // Include the resource as asset data.
      assetData,
      // Include metadata to give information on the action.
      metaData,
      // Create an output.
      [driver.Transaction.makeOutput(
        driver.Transaction.makeEd25519Condition(currentIdentity.publicKey),
      )],
      // Include the public key
      currentIdentity.publicKey,
    );

    // We sign the transaction
    const signedTransaction = driver.Transaction.signTransaction(registerProductToNetwork, currentIdentity.privateKey);

    // Post the transaction to the network
    connection.postTransactionCommit(signedTransaction).then((postedTransaction) => {
      // Let the promise resolve the created transaction.
      resolve(postedTransaction);

      // Catch exceptions
    }).catch((err) => {
      reject(err);
    });
  });
}

async function giveProduct(keySeed, transactionId) {
  const currentIdentity = keyGenerationUtils.generateKeypair(keySeed);
  const productCommonsIdentity = keyGenerationUtils.generateKeypair('productCommonsKeySeed');
  return new Promise( async (resolve, reject) => {
    // Construct metadata.
    const metaData = {
      action: 'Give to Commons',
      date: new Date().toISOString(),
    };

    const initialTransactions = await connection.getTransaction(transactionId);
    console.log('tester-->', initialTransactions);

    // Construct the new transaction
    const transferTransaction = driver.Transaction.makeTransferTransaction(
        // The previous transaction to be chained upon.
        [{tx: initialTransactions, output_index: 0}],

        // The (output) condition to be fullfilled in the next transaction.
        [driver.Transaction.makeOutput(driver.Transaction.makeEd25519Condition(productCommonsIdentity.publicKey))],

        // Metadata
        metaData,
    );

    // Sign the new transaction.
    const signedTransaction = driver.Transaction.signTransaction(transferTransaction, currentIdentity.privateKey);

    // Post the transaction.
    connection.postTransactionCommit(signedTransaction).then((successfullyPostedTransaction) => {
      // Return the posted transaction to the callback funcion.
      resolve(successfullyPostedTransaction);
    }).catch((error) => {
      // Throw error
      reject(error);
    });
  });
}

function takeProduct(keySeed, transactionId) {
  const currentIdentity = keyGenerationUtils.generateKeypair(keySeed);
  const productCommonsIdentity = keyGenerationUtils.generateKeypair('productCommonsKeySeed');
  return new Promise(async (resolve, reject) => {
    // Construct metadata.
    const metaData = {
      action: 'Take from Commons',
      date: new Date().toISOString(),
    };

    const initialTransactions = await connection.getTransaction(transactionId);
    console.log('tester-->', initialTransactions);

    // Construct the new transaction
    const transferTransaction = driver.Transaction.makeTransferTransaction(
        // The previous transaction to be chained upon.
        [{tx: initialTransactions, output_index: 0}],

        // The (output) condition to be fullfilled in the next transaction.
        [driver.Transaction.makeOutput(driver.Transaction.makeEd25519Condition(currentIdentity.publicKey))],

        // Metadata
        metaData,
    );

    // Sign the new transaction.
    const signedTransaction = driver.Transaction.signTransaction(transferTransaction, productCommonsIdentity.privateKey);

    // Post the transaction.
    connection.postTransactionCommit(signedTransaction).then((successfullyPostedTransaction) => {
      // Return the posted transaction to the callback funcion.
      resolve(successfullyPostedTransaction);
    }).catch((error) => {
      // Throw error
      reject(error);
    });
  });
}

module.exports = { registerProduct, giveProduct, takeProduct };
