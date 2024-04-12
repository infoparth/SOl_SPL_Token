import {
    clusterApiUrl,
    Connection,
    Keypair,
    LAMPORTS_PER_SOL,
    PublicKey,
  } from "@solana/web3.js";
  import {
    createMint,
    getOrCreateAssociatedTokenAccount,
    mintTo,
    transfer,
  } from "@solana/spl-token";

//   import newKey from "./newKey.js";
  
  (async () => {
    // Step 1: Connect to cluster and generate two new Keypairs
    const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

  
    // const fromWallet = Keypair.generate();
    // const toWallet = Keypair.generate();

    const fromWallet = newKey();

    // const PRIVATE = new Uint8Array([
    //     22, 85, 155, 218, 55, 196, 141, 96, #, 17, 250, 56, 204, 233, 161, 46,
    //     175, 108, 109, 32, 72, 33, 190, 21, 107, 10, ###, 113, 42, #, 23, 182,
    //     214, 25, 229, 129, 33, ##, 251, 236, 91, 164, 31, 68, 233, 68, 7, 133,
    //     74, 30, 89, 32, 162, 18, 138, ##, 114, 234, ##, 237, 205, 119, 35, 212,
    //   ]);
  
    //   const fromWallet = Keypair.fromSecretKey(PRIVATE);

    const toWallet = new PublicKey('AhaqZkm3CBJW8Fr2jxjWXa1bmueTyUaBF9GpRrWPzHdt');
    console.log("------------------------------------------------------------")
    console.log("From wallet Private Key: ", fromWallet.secretKey.toString());
    console.log("------------------------------------------------------------")
    console.log("From wallet Public Key: ", fromWallet.publicKey.toString())
    console.log("------------------------------------------------------------")

  
    // Step 2: Airdrop SOL into your from wallet
    const fromAirdropSignature = await connection.requestAirdrop(
      fromWallet.publicKey,
      LAMPORTS_PER_SOL
    );
    // Wait for airdrop confirmation
    await connection.confirmTransaction(fromAirdropSignature, {
      commitment: "confirmed",
    });
  
    // Step 3: Create new token mint and get the token account of the fromWallet address
    // If the token account does not exist, create it

    console.log("Starting the mint function")
    const mint = await createMint(
      connection,
      fromWallet,
      fromWallet.publicKey,
      null,
      9
    );

    console.log("Starting the fromTokenAccount function")

    const fromTokenAccount = await getOrCreateAssociatedTokenAccount(
      connection,
      fromWallet,
      mint,
      fromWallet.publicKey
    );

    console.log("Starting the minitng finaly function")
    //Step 4: Mint a new token to the from account
    let signature = await mintTo(
      connection,
      fromWallet,
      mint,
      fromTokenAccount.address,
      fromWallet.publicKey,
      100000000000,
      []
    );
    console.log("mint tx:", signature);
    console.log("fromtoken.address :", fromTokenAccount.address);
  
    // Step 5: Get the token account of the to-wallet address and if it does not exist, create it
    const toTokenAccount = await getOrCreateAssociatedTokenAccount(
      connection,
      fromWallet,
      mint,
      toWallet
    );
  
    //Step 6: Transfer the new token to the to-wallet's token account that was just created
    // Transfer the new token to the "toTokenAccount" we just created
    signature = await transfer(
      connection,
      fromWallet,
      fromTokenAccount.address,
      toTokenAccount.address,
      fromWallet.publicKey,
      100000000000,
      []
    );
    console.log("transfer tx:", signature);
  })();
  