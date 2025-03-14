const fs = require("fs");

// Simulated wallet data (you can replace this with a database)
const users = {
    "martias_wallet_1": { balance: 1000 },
    "martias_wallet_2": { balance: 500 },
    "martias_wallet_3": { balance: 0 },
};

// Airdrop amount per wallet
const AIRDROP_AMOUNT = 10;

// Function to airdrop coins
function airdrop(walletId) {
    if (!users[walletId]) {
        console.log(`Wallet ${walletId} not found.`);
        return;
    }

    users[walletId].balance += AIRDROP_AMOUNT;
    console.log(`Airdropped ${AIRDROP_AMOUNT} MartiasCoin to ${walletId}. New balance: ${users[walletId].balance}`);
}

// Airdrop to all users
function airdropToAll() {
    console.log("Starting MartiasCoin Airdrop...");
    for (const walletId in users) {
        airdrop(walletId);
    }

    // Save updated balances to a file
    fs.writeFileSync("balances.json", JSON.stringify(users, null, 2));
    console.log("Airdrop completed and balances updated.");
}

// Run the airdrop
airdropToAll();
