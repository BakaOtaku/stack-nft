const {SigningCosmosClient,Secp256k1HdWallet,makeCosmoshubPath,coin,LcdClient,GasPrice}=require("@cosmjs/launchpad")
const {SigningCosmWasmClient}=require("@cosmjs/cosmwasm-stargate")
const {DirectSecp256k1HdWallet}=require("@cosmjs/proto-signing")
// require("")
const { FaucetClient } =require("@cosmjs/faucet-client");
const {axios}=require("axios")
const fs=require("fs");
// const {}
const newdata=require("@cosmjs/cosmwasm-launchpad");
const { stringify } = require("querystring");
// const { Coin } = require("@cosmjs/proto-signing/build/codec/cosmos/base/v1beta1/coin");
// const { Coin } = require("@cosmjs/cosmwasm-stargate/build/codec/cosmos/base/v1beta1/coin");

function print(data){
    console.log(data);
}
const config = {
    chainId: "musselnet-2",
    chainName: "Musselnet",
    addressPrefix: "wasm",
    rpcUrl: "https://rpc.musselnet.cosmwasm.com",
    httpUrl: "https://lcd.musselnet.cosmwasm.com",
    faucetUrl: "https://faucet.musselnet.cosmwasm.com",
    feeToken: "umayo",
    stakingToken: "ufrites",
    coinMap: {
      umayo: { denom: "MAYO", fractionalDigits: 6 },
      ufrites: { denom: "FRITES", fractionalDigits: 6 },
    },
    gasPrice: GasPrice.fromString("0.025umayo"),
    codeId: 6,
  };
  
  async function hitFaucet(address){
    if (!config.faucetUrl || !config.feeToken) return;

    try {
      const faucet = new FaucetClient(config.faucetUrl);
      await faucet.credit(address, config.feeToken);
    } catch (error) {
    //   setError(error.message);
      console.error(error);
    }
  }
var memonic=""
async function generatewallet(){
    // const walletgeneratr
    const hdPath=makeCosmoshubPath(0);
    // print(musselnet.addressPrefix)
    const wallet =await Secp256k1HdWallet.generate(12,hdPath,config.addressPrefix)
    const [{address}]=await wallet.getAccounts()
    print(address)
     mnemonic=await wallet.mnemonic
    const client =await createClient(wallet);
    // print(client);
    await hitFaucet(address);
    const coin=await client.getBalance(address,config.coinMap.umayo.denom)
    const data=await client.getChainId()
    print(data)
    print(coin)
    print(client)
    var filepath="./artifacts/cw721_base.wasm"
    const result=await uploadcode(filepath,client,address);
    // print(result)
    print(result.codeId)
    // print(result.address)
    const someshit=await loadwalletrun(client,address)

}

async function uploadcode(filepath,client,address){

    const meta={
        source:"https://github.com/dixitaniket/deployment/blob/72084264287bab08cae63745f6122d3c9fb02246/cw_nameservice.wasm",
        builder:"cosmwasm/rust-optimizer:0.10.4"
    }
    const wasm= fs.readFileSync(filepath)
    
    // let wasm = new Uint8Array(u);
    // print(wasm)
    // print(wasm.input.subarray())

    const result=await client.upload(address,wasm,meta)
    return result;



}

async function createClient(wallet){
    const gasLimits={
      upload: 1500000,
      init: 600000,
      exec: 400000,
      migrate: 600000,
      send: 80000,
      changeAdmin: 80000,
    };
  
    return SigningCosmWasmClient.connectWithSigner(config.rpcUrl, wallet, {
      prefix: config.addressPrefix,
      gasPrice: config.gasPrice,
      gasLimits: gasLimits,
    });
  }


  const thisaddress ="wasm1emu6l0d85l205c4er2yzy4ulxkng2uw58r7kt3"
  const codeID=16
  mnemonic='monkey width swim lottery vast enlist tongue guitar emerge battle love female'
  
  
  
  async function loadwalletrun(){
    const hdPath=makeCosmoshubPath(0);
    const wallet = await DirectSecp256k1HdWallet.fromMnemonic(mnemonic, hdPath, "wasm");
    const [{address}]=await wallet.getAccounts()
    print(address)
    const initMsg={
    }
    // print(initMsg)
    const client=await createClient(wallet);
    // await hitFaucet(address);
    // await 

    const data= await client.getBalance(address,"umayo")

    print(data);
    // print(client.getBalance())
    const money=await coin(10,"umayo")
    print(money)
    const { contractAddress } = await client.instantiate(address, codeID, initMsg,"blank", {
      memo: "",
      admin:null,
      transferAmount:[money,]
    });
    print(contractAddress)

  }

async function interaction(){
  const hdPath=makeCosmoshubPath(0);
  const wallet = await DirectSecp256k1HdWallet.fromMnemonic(mnemonic, hdPath, "wasm");
  const client=await createClient(wallet);
  // client.tra
  const [{address}]=await wallet.getAccounts()
  print(address)
  var orgname="abcd"
  var reponame="ahjasdf"
  const money=await coin(10,"umayo")

  const contractAddress="wasm1sasjqsw4p348sw6yqc038zuv5046702m3wkf7v"
  let result = await client.execute(address,contractAddress,{
    register_org :{orgname,reponame}
  },
  "",
  [money,]

  )
  print(result)
}




generatewallet();
// loadwalletrun()
// interaction();
// print(newdata)






