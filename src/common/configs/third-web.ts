import { createThirdwebClient } from "thirdweb";
import { createWallet, inAppWallet } from "thirdweb/wallets";

if (!process.env.THIRDWEB_CLIENT_ID || !process.env.THIRDWEB_SECRET) {
  throw new Error(
    "Missing THIRDWEB_CLIENT_ID || THIRDWEB_SECRET environment variable",
  );
}

export const thirdwebClient = createThirdwebClient({
  clientId: process.env.THIRDWEB_CLIENT_ID,
  secretKey: process.env.THIRDWEB_SECRET,
});

export const wallets = [
  inAppWallet({
    auth: {
      options: [
        "google",
        "apple",
        "telegram",
        "email",
        "x",
        "passkey",
        "phone",
      ],
    },
  }),
  createWallet("io.metamask"),
  createWallet("com.coinbase.wallet"),
  createWallet("me.rainbow"),
  createWallet("io.rabby"),
  createWallet("io.zerion.wallet"),
];
