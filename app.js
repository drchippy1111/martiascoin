const express = require("express");

const app = express();
const port = 3000;

// Middleware to parse JSON requests
app.use(express.json());

// Dummy blockchain data
let users = {
    "martias_wallet_1": { balance: 1000 },
    "martias_wallet_2": { balance: 500 },
};

// API to get balance
app.get("/balance/:walletId", (req, res) => {
    const walletId = req.params.walletId;
    if (users[walletId]) {
        res.json({ wallet: walletId, balance: users[walletId].balance });
    } else {
        res.status(404).json({ error: "Wallet not found" });
    }
});

// API to send MartiasCoin between wallets
app.post("/send", (req, res) => {
    const { from, to, amount } = req.body;

    if (!users[from] || !users[to]) {
        return res.status(400).json({ error: "Invalid wallet IDs" });
    }
    if (users[from].balance < amount) {
        return res.status(400).json({ error: "Insufficient balance" });
    }

    users[from].balance -= amount;
    users[to].balance += amount;

    res.json({ message: "Transaction successful", from, to, amount });
});

// Start the server
app.listen(port, () => {
    console.log(`MartiasCoin API running at http://localhost:${port}`);
});

// Airdrop API: Users can request free MartiasCoin
app.post("/airdrop/:walletId", (req, res) => {
    const walletId = req.params.walletId;

    if (!users[walletId]) {
        return res.status(404).json({ error: "Wallet not found" });
    }

    users[walletId].balance += AIRDROP_AMOUNT;
    res.json({ message: `Airdropped ${AIRDROP_AMOUNT} MartiasCoin to ${walletId}`, balance: users[walletId].balance });
});
