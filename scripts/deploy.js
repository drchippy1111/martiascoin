const { ethers } = require("hardhat");

async function main() {
    const initialSupply = ethers.utils.parseEther("100000000"); // 100,000,000 tokens
    const Token = await ethers.getContractFactory("MyToken");
    const token = await Token.deploy(initialSupply);

    await token.deployed();
    console.log(`Token deployed to: ${token.address}`);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
