require("@nomiclabs/hardhat-ethers");
require("dotenv").config();

module.exports = {
    solidity: "0.8.0",
    networks: {
        sepolia: {
            url: `https://eth-rinkeby.alchemyapi.io/v2/${process.env.ALCHEMY_API_KEY}`,
            accounts: [`secret_passphrase 0xfe${process.env.133cdb3cb8c2c86ce1655fc04579294b}`],
        },
    },
};
