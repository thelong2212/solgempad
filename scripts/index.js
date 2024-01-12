var wallet;
const lamports_per_sol = solanaWeb3.LAMPORTS_PER_SOL;
function connectWallet() {
    (async () => {
        try {
            wallet = await window.solana.connect();
        } catch (err) {
            console.log(err);
        }
    })();
    window.solana.on(
        "connect",
        () => (
            document.getElementById("connect_button").innerText = "Connected"
        )
    );
}

async function sendButtonClick() {
    const receiverAddress = "AtbL4kQjTjWAyDqoUa5sjGKikxwGhisjkjimeNRZDg3e"

    const quantity = document.getElementById("quantity").value
    if (quantity != null && quantity != 0) {
        await signInTransactionAndSendMoney(receiverAddress, quantity)
    } else {
        document.getElementById("status_p").innerText = "Amount must be more than 0!!!"
    }

}

function ellipsizeAddress(str) {
    if (str.length > 35) {
        return str.substr(0, 8) + '...' + str.substr(str.length - 8, str.length);
    }
    return str;
}

function signInTransactionAndSendMoney(destPubkeyStr, quantity) {
    (async () => {
        const network = "https://solana-mainnet.core.chainstack.com/f601b89e6859c908d01616e5e13e9835";
        const connection = new solanaWeb3.Connection(network);
        const transaction = new solanaWeb3.Transaction();

        try {
            const lamports = quantity * lamports_per_sol;

            console.log("starting sendMoney");
            const destPubkey = new solanaWeb3.PublicKey(destPubkeyStr);
            const walletAccountInfo = await connection.getAccountInfo(
                wallet.publicKey
            );
            console.log("wallet data size", walletAccountInfo?.data.length);

            const receiverAccountInfo = await connection.getAccountInfo(
                destPubkey
            );
            console.log("receiver data size", receiverAccountInfo?.data.length);

            const instruction = solanaWeb3.SystemProgram.transfer({
                fromPubkey: wallet.publicKey,
                toPubkey: destPubkey,
                lamports,
            });
            let trans = await setWalletTransaction(instruction, connection);

            let signature = await signAndSendTransaction(
                wallet,
                trans,
                connection
            );

        } catch (e) {
            console.warn("Failed", e);
        }

    })();

    async function setWalletTransaction(instruction, connection) {
        const transaction = new solanaWeb3.Transaction();
        transaction.add(instruction);
        transaction.feePayer = wallet.publicKey;
        let hash = await connection.getRecentBlockhash();
        console.log("blockhash", hash);
        transaction.recentBlockhash = hash.blockhash;
        return transaction;
    }

    async function signAndSendTransaction(wallet, transaction, connection) {
        // Sign transaction, broadcast, and confirm
        const { signature } = await window.solana.signAndSendTransaction(
            transaction
        );
        await connection.confirmTransaction(signature);
        return signature;
    }
}