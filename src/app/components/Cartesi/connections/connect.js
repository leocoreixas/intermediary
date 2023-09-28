import { ethers, Signer } from "ethers";
import { JsonRpcProvider, Provider } from "@ethersproject/providers";

async function connect(
    rpc,
    mnemonic = null,
    accountIndex = null
){
    const provider = new JsonRpcProvider(rpc);
    const signer = mnemonic
        ? ethers.Wallet.fromMnemonic(
              mnemonic,
              `m/44'/60'/0'/0/${accountIndex ?? 0}`
          ).connect(provider)
        : undefined;

    return {
        provider,
        signer,
    };
};

export default connect;

