import {
    clusterApiUrl,
    Connection,
    Keypair,
    LAMPORTS_PER_SOL,
} from "@solana/web3.js";

let cachedKeypair = null;

function newKey() {
    // Check if keypair is already generated
    if (cachedKeypair) {
        console.log("Using cached keypair.");
        return cachedKeypair;
    }

    // If not generated, generate a new keypair
    const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
    const fromWallet = Keypair.generate();
    const toWallet = "AhaqZkm3CBJW8Fr2jxjWXa1bmueTyUaBF9GpRrWPzHdt";

    console.log("------------------------------------------------------------");
    console.log("From wallet Private Key: ", fromWallet.secretKey.toString());
    console.log("------------------------------------------------------------");
    console.log("From wallet Public Key: ", fromWallet.publicKey.toString());
    console.log("------------------------------------------------------------");

    // Uncomment and modify as needed for airdrop or other operations
    // const fromAirdropSignature = await connection.requestAirdrop(
    //   fromWallet.publicKey,
    //   LAMPORTS_PER_SOL
    // );
    // await connection.confirmTransaction(fromAirdropSignature, {
    //   commitment: "confirmed",
    // });

    // Cache the generated keypair
    cachedKeypair = fromWallet;

    console.log("Exit...");

    return fromWallet;
}

export default newKey;
