// Import required libraries
const Web3js = require('web3js');
const dotenv = require('dotenv');
const express = require('express');

// Load environment variables from .env file
dotenv.config();

// Initialize Express app
const app = express();
const port = 3000;

// Setup Web3 provider
const web3 = new Web3(new Web3.providers.HttpProvider(process.env.INFURA_URL));

// Example: MartiasCoin contract address and ABI (Replace with your actual contract details)
const contractAddress = 'YOUR_CONTRACT_ADDRESS'; 
const contractABI = [
  // Your contract ABI goes here
];

// Create a contract instance
const contract = new web3.eth.Contract(contractABI, contractAddress);

// Example route to get token balance
app.get('/balance/:address', async (req, res) => {
  const { address } = req.params;

  try {
    const balance = await contract.methods.balanceOf(address).call();
    res.json({ address, balance });
  } catch (error) {
    res.status(500).send('Error fetching balance');
  }
});

// Example route to send tokens (Replace with real logic and security)
app.post('/send', async (req, res) => {
  const { fromAddress, toAddress, amount } = req.body;

  try {
    const nonce = await web3.eth.getTransactionCount(fromAddress);
    const gasPrice = await web3.eth.getGasPrice();

    // Create transaction
    const tx = {
      from: fromAddress,
      to: contractAddress,
      value: web3.utils.toWei(amount, 'ether'),
      gas: 2000000,
      gasPrice: gasPrice,
      nonce: nonce,
    };

    // Sign transaction
    const signedTx = await web3.eth.accounts.signTransaction(tx, process.env.PRIVATE_KEY);

    // Send transaction
    const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);

    res.json({ receipt });
  } catch (error) {
    res.status(500).send('Error sending tokens');
  }
});

// Start the Express server
app.listen(port, () => {
  console.log(`MartiasCoin app running on http://localhost:${port}`);
});
