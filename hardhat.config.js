require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config(); // Load environment variables
require("@nomicfoundation/solidity-analyzer")

const privateKey = process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [];

module.exports = {
<<<<<<< HEAD
    solidity: "0.8.0",
    networks: {
        sepolia: {
            url: `https://eth-rinkeby.alchemyapi.io/v2/${process.env.ALCHEMY_API_KEY}`,
            accounts: [`secret_passphrase 0xfe${process.env.133cdb3cb8c2c86ce1655fc04579294b}`],
        },
=======
  defaultNetwork: "sepolia",
  solidity: "0.8.21",
  networks: {
    sepolia: {
      url: process.env.SEPOLIA_RPC_URL || "https://eth-sepolia.g.alchemy.com/v2/is6oTEUTj10LM446FMcp5aq-Qol7na2k",
      accounts: privateKey, // Use the validated key array
    }
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY || "" // Fixed placement inside etherscan object
>>>>>>> 1e19b8a (Initial commit)
    },
}
