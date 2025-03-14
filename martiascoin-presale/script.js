document.getElementById("buyTokens").addEventListener("click", async function () {
    let bnbAmount = document.getElementById("bnbAmount").value;
    let statusMessage = document.getElementById("statusMessage");

    if (!bnbAmount || bnbAmount <= 0) {
        statusMessage.innerHTML = "Please enter a valid BNB amount.";
        return;
    }

    statusMessage.innerHTML = "Processing transaction...";

    // Example: Connect Wallet (Metamask)
    if (typeof window.ethereum !== "undefined") {
        const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
        const userAddress = accounts[0];

        console.log(`User Address: ${userAddress}`);
        console.log(`Sending ${bnbAmount} BNB for MartiasCoin`);

        // Here, you would integrate with a smart contract for the actual purchase.
        statusMessage.innerHTML = `Transaction sent! Awaiting confirmation...`;
    } else {
        statusMessage.innerHTML = "Please install Metamask to proceed.";
    }
});
