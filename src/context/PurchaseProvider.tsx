import { useEffect, useState } from "react";
// wallet provider network
import {
  useConnection,
  useWallet,
  WalletProviderProps,
} from "@solana/wallet-adapter-react";
// style
import("@solana/wallet-adapter-react-ui/styles.css" as any);
// component
import { useNotify } from "hooks/notify";
// context
import PurchaseContext from "context/PurchaseContext";
// idl json
import idl from "utils/idl.json";
import {
  PublicKey,
  SystemProgram,
  SYSVAR_RENT_PUBKEY,
  Transaction,
  TransactionSignature,
} from "@solana/web3.js";

import * as anchor from "@project-serum/anchor";
import { Program, Provider, BN, Idl } from "@project-serum/anchor";
import {
  Token,
  ASSOCIATED_TOKEN_PROGRAM_ID,
  TOKEN_PROGRAM_ID,
} from "@solana/spl-token";

export function PurchaseProvider(
  props: Omit<WalletProviderProps, "wallets">
): JSX.Element {
  //  notify hook
  const notify = useNotify();
  //  connection
  const { connection } = useConnection();
  const { wallet, publicKey, sendTransaction } = useWallet();
  
  const provider = new Provider(connection, wallet as any, {
    preflightCommitment: "confirmed",
  });

  const program = new Program(
    idl as Idl,
    new PublicKey("CvV4Ni3f2UYndXTyWHahwK26iinh2nk2xQr2wtLtiUKz"),
    provider
  );

  // assocated token account for connected wallet, should be USDC token account in production
  let usdtUserTokenAccount: PublicKey;
  let aphdUserTokenAccount: PublicKey;
  let usdtTreasuryTokenAccount: PublicKey;

  // constant, admin user will initialize sale state to this account
  const SALE_PUBKEY = new PublicKey(
    process.env.NEXT_PUBLIC_SALE_PUBKEY as string
  );

  // pyament_mint from `show_sale` CLI
  const PAYMENT_MINT_PUBKEY = new PublicKey(
    process.env.NEXT_PUBLIC_PAYMENT_MINT_PUBKEY as string
  );

  const APHD_MINT_PUBKEY = new PublicKey(
    process.env.NEXT_PUBLIC_APHD_TOKEN_MINT_PUBKEY as string
  );

  // treasury_account from `show_sale` CLI

  const TREASURY_PUBKEY = new PublicKey(
    process.env.NEXT_PUBLIC_TREASUERY_PUBKEY as string
  );

  
  useEffect(() => {
    (async () => {
      // sale & buyer state
      if (!publicKey) {
        return;
      }
 
      try {
        const res = await Promise.all([
          // get token account, we don"t need to check if connected wallet has token account, because they have to pay with this token account
          Token.getAssociatedTokenAddress(
            ASSOCIATED_TOKEN_PROGRAM_ID,
            TOKEN_PROGRAM_ID,
            PAYMENT_MINT_PUBKEY,
            publicKey
          ),

          Token.getAssociatedTokenAddress(
            ASSOCIATED_TOKEN_PROGRAM_ID,
            TOKEN_PROGRAM_ID,
            APHD_MINT_PUBKEY,
            publicKey
          ),

          Token.getAssociatedTokenAddress(
            ASSOCIATED_TOKEN_PROGRAM_ID,
            TOKEN_PROGRAM_ID,
            PAYMENT_MINT_PUBKEY,
            TREASURY_PUBKEY
          ),

        ]);

        // associated token account, in production USDT account for connected wallet
        usdtUserTokenAccount = res[0];
        aphdUserTokenAccount = res[1];
        usdtTreasuryTokenAccount = res[2];
        
      } catch (err) {
        notify("error", "Unkown error");
      }
    })();
  }, [publicKey]);

  const purchase = async (depositValue: number) => {
    if (!publicKey) {
      notify("warning", "Please connect your wallet.");
      return;
    }
    
    if (!usdtUserTokenAccount) {
    
      const res = await Promise.all([
        // get token account, we don"t need to check if connected wallet has token account, because they have to pay with this token account
        Token.getAssociatedTokenAddress(
          ASSOCIATED_TOKEN_PROGRAM_ID,
          TOKEN_PROGRAM_ID,
          PAYMENT_MINT_PUBKEY,
          publicKey
        ),
      ]);
      // associated token account, in production USDC account for connected wallet
      usdtUserTokenAccount = res[0];
    }

    if (!aphdUserTokenAccount) {
      const res = await Promise.all([
        // get token account, we don"t need to check if connected wallet has token account, because they have to pay with this token account
        Token.getAssociatedTokenAddress(
          ASSOCIATED_TOKEN_PROGRAM_ID,
          TOKEN_PROGRAM_ID,
          APHD_MINT_PUBKEY,
          publicKey
        ),
      ]);
      // associated token account, in production USDC account for connected wallet
      aphdUserTokenAccount = res[0];
    }

    if (!usdtTreasuryTokenAccount) {
      const res = await Promise.all([
        // get token account, we don"t need to check if connected wallet has token account, because they have to pay with this token account
        Token.getAssociatedTokenAddress(
          ASSOCIATED_TOKEN_PROGRAM_ID,
          TOKEN_PROGRAM_ID,
          PAYMENT_MINT_PUBKEY,
          TREASURY_PUBKEY
        ),
      ]);
      // associated token account, in production USDC account for connected wallet
      usdtTreasuryTokenAccount = res[0];
    }

    let signature: TransactionSignature = "";

    try {
      const transaction = new Transaction();
      let vault_account_pda = new PublicKey(
        process.env.NEXT_PUBLIC_VAULT_ACCOUNT_PUBKEY as string
      );

      let vault_account_auth_pda = new PublicKey(
        process.env.NEXT_PUBLIC_VAULT_ACCOUNT_AUTH_PUBKEY as string
      );

      transaction.add(
        // deposit in payment_mint (USDC in production)
        await program.instruction.processExecuteSale(
          new anchor.BN(depositValue * 1e6),
          {
            accounts: {
              userAccount: publicKey,
              tokenVaultAccount: vault_account_pda,
              vaultTokenAuthority: vault_account_auth_pda,
              aphdMint: PAYMENT_MINT_PUBKEY,
              tokenSaleAccount: SALE_PUBKEY,
              userAphdAccount: aphdUserTokenAccount,
              userUsdtAccount: usdtUserTokenAccount,
              tokenHolderAccount: TREASURY_PUBKEY,
              tokenHolderUsdtAccount: usdtTreasuryTokenAccount,
              tokenProgram: TOKEN_PROGRAM_ID,
              systemProgram: anchor.web3.SystemProgram.programId,
            },
          }
        )
      );

      signature = await sendTransaction(transaction, connection);
      notify("info", "Transaction sent:", signature);

      await connection.confirmTransaction(signature, "processed");
      notify("success", "Transaction successful!", signature);

    } catch (err: any) {
      console.log(err.message);
      if (err.message.endsWith("0x1770")) {
        notify("error", "Token Sale Not Initialized");
      } else if (err.message.endsWith("0x1771")) {
        notify(
          "error",
          "Token Sale Amount Exceeds"
        );
      } else if (err.message.endsWith("0x1772")) {
        notify("error", "Token Sale Funded");
      } else if (err.message.endsWith("0x1773")) {
        notify("error", "You do not have enough USDT");
      } else if (err.message.endsWith("0x1774")) {
        notify("error", "Token Sale Paused");
      } else if (err.message.endsWith("0x1775")) {
        notify("error", "Token Sale Ended");
      } else if (err.message.endsWith("0x1776")) {
        notify("error", "Token Sale Complete");
      } else if (err.message.endsWith("0x1777")) {
        notify("error", "Amount Less Than Minimum");
      } else if (err.message.endsWith("0x1778")) {
        notify("error", "Amount More Than Maximum");
      } else if (err.message.endsWith("0x1779")) {
        notify("error", "Amount Exceeds Tokens Available For Sale");
      } else {
        notify("error", "You have rejected transaction.");
      }
    }
  };

  return (
    <PurchaseContext.Provider
      value={{ purchase }}
      {...props}
    ></PurchaseContext.Provider>
  );
}

export default PurchaseProvider;
