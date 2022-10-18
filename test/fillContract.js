require('dotenv').config()
const { ethers } = require("ethers");
const MyContract = require('../artifacts/contracts/PetitProno.sol/MonPetitProno.json')

const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS
const provider = new ethers.providers.AlchemyProvider(
  (network = 'goerli'),
  process.env.REACT_APP_ALCHEMY_API_KEY,
)
const signer = new ethers.Wallet(
  process.env.REACT_APP_WALLET_PRIVATE_KEY,
  provider,
)
const contract = new ethers.Contract(contractAddress, MyContract.abi, signer)

async function fill() {
  const LeaguesID = await contract.getLeaguesID()
  console.log('The LeaguesID are: ' + LeaguesID)
}
fill()
