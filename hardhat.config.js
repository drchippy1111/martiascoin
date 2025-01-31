require("@nomiclabs/hardhat-ethers");
require("dotenv").config();

module.exports = {
    solidity: "0.8.0",
    networks: {
        rinkeby: {
            url: `https://eth-rinkeby.alchemyapi.io/v2/${process.env.ALCHEMY_API_KEY}`,
            accounts: [`0x030242ea33a7da5af43d960bad${process.env.133cdb3cb8c2c86ce1655fc04579294b}`],
        },
    },
};
