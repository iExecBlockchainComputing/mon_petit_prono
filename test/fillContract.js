require('dotenv').config()
const { ethers } = require('ethers')
const MyContract = require('../artifacts/contracts/PetitProno.sol/PetitProno.json')

const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS
const WALLET_ADDRESS_1 = '0xa1B1CAbE3FF10B0e08B95F74BF7A374A4A9f85d6'
const WALLET_ADDRESS_2 = '0x11Ec6e62CdEB571F3b8591b8d1C50d7a5e4D626f'
const provider = new ethers.providers.AlchemyProvider(
  (network = 'goerli'),
  process.env.REACT_APP_ALCHEMY_API_KEY,
)
const signer1 = new ethers.Wallet(
  process.env.REACT_APP_WALLET_PRIVATE_KEY_1,
  provider,
)
const signer2 = new ethers.Wallet(
  process.env.REACT_APP_WALLET_PRIVATE_KEY_2,
  provider,
)
const contract1 = new ethers.Contract(contractAddress, MyContract.abi, signer1)
const contract2 = new ethers.Contract(contractAddress, MyContract.abi, signer2)

async function fillLeague() {
  /**League */
  await contract1.addLeague('0x1', 'Coupe du Monde', 'ipfs://ipfs.link')
  await contract1.addLeague('0x2', "Coupe d'Europe", 'ipfs://ipfs.link')
}

async function fillTeam() {
  /**Team */
  await contract1.addTeam('0x1', '1x1', 'Adoption', 'ipfs://ipfs.link')
  await contract1.addTeam('0x1', '1x2', 'Entreprise', 'ipfs://ipfs.link')

  await contract1.addTeam('0x2', '1x3', 'Core', 'ipfs://ipfs.link')
  await contract1.addTeam('0x2', '1x4', 'Marketing', 'ipfs://ipfs.link')
}

async function fillPlayer() {
  /**Player */
  await contract1.addPlayer('0x1', '1x1', 'Robin')
  await contract2.addPlayer('0x1', '1x1', 'Pierre')

  await contract1.addPlayer('0x1', '1x2', 'Faiza')
  await contract2.addPlayer('0x1', '1x2', 'Anais')

  await contract1.addPlayer('0x2', '1x3', 'Paul')
  await contract2.addPlayer('0x2', '1x3', 'Thomas')

  await contract1.addPlayer('0x2', '1x4', 'Léane')
  await contract2.addPlayer('0x2', '1x4', 'Chloé')
}

async function fillForecast() {
  /**Forecast */
  //League 1 -> Team 1 -> Robin
  await contract1.addForecast(
    '0x1',
    '1x1',
    WALLET_ADDRESS_1,
    '2x1',
    [1, 2, 8],
    [2, 0],
  )
  await contract1.addForecast(
    '0x1',
    '1x1',
    WALLET_ADDRESS_1,
    '2x2',
    [2, 6, 1],
    [2, 1],
  )
  await contract1.addForecast(
    '0x1',
    '1x1',
    WALLET_ADDRESS_1,
    '2x3',
    [1, 5, 3],
    [1, 1],
  )
  //League 1 -> Team 1 -> Pierre
  await contract1.addForecast(
    '0x1',
    '1x1',
    WALLET_ADDRESS_2,
    '2x1',
    [1, 2, 8],
    [2, 0],
  )
  await contract1.addForecast(
    '0x1',
    '1x1',
    WALLET_ADDRESS_2,
    '2x2',
    [2, 6, 1],
    [2, 1],
  )
  await contract1.addForecast(
    '0x1',
    '1x1',
    WALLET_ADDRESS_2,
    '2x3',
    [1, 5, 3],
    [1, 1],
  )

  //League 1 -> Team 2 -> Faiza
  await contract1.addForecast(
    '0x1',
    '1x2',
    WALLET_ADDRESS_1,
    '2x1',
    [1, 2, 8],
    [2, 0],
  )
  await contract1.addForecast(
    '0x1',
    '1x2',
    WALLET_ADDRESS_1,
    '2x2',
    [2, 6, 1],
    [2, 1],
  )
  await contract1.addForecast(
    '0x1',
    '1x2',
    WALLET_ADDRESS_1,
    '2x3',
    [1, 5, 3],
    [1, 1],
  )
  //League 1 -> Team 2 -> Anais
  await contract1.addForecast(
    '0x1',
    '1x2',
    WALLET_ADDRESS_2,
    '2x1',
    [1, 2, 8],
    [2, 0],
  )
  await contract1.addForecast(
    '0x1',
    '1x2',
    WALLET_ADDRESS_2,
    '2x2',
    [2, 6, 1],
    [2, 1],
  )
  await contract1.addForecast(
    '0x1',
    '1x2',
    WALLET_ADDRESS_2,
    '2x3',
    [1, 5, 3],
    [1, 1],
  )

  //League 2 -> Team 1 -> Paul
  await contract1.addForecast(
    '0x1',
    '1x2',
    WALLET_ADDRESS_1,
    '2x1',
    [1, 2, 8],
    [2, 0],
  )
  await contract1.addForecast(
    '0x1',
    '1x2',
    WALLET_ADDRESS_1,
    '2x2',
    [2, 6, 1],
    [2, 1],
  )
  await contract1.addForecast(
    '0x1',
    '1x2',
    WALLET_ADDRESS_1,
    '2x3',
    [1, 5, 3],
    [1, 1],
  )
  //League 1 -> Team 1 -> Thomas
  await contract1.addForecast(
    '0x1',
    '1x2',
    WALLET_ADDRESS_2,
    '2x1',
    [1, 2, 8],
    [2, 0],
  )
  await contract1.addForecast(
    '0x1',
    '1x2',
    WALLET_ADDRESS_2,
    '2x2',
    [2, 6, 1],
    [2, 1],
  )
  await contract1.addForecast(
    '0x1',
    '1x2',
    WALLET_ADDRESS_2,
    '2x3',
    [1, 5, 3],
    [1, 1],
  )
  //League 2 -> Team 2 -> Léane
  await contract1.addForecast(
    '0x1',
    '1x2',
    WALLET_ADDRESS_1,
    '2x1',
    [1, 2, 8],
    [2, 0],
  )
  await contract1.addForecast(
    '0x1',
    '1x2',
    WALLET_ADDRESS_1,
    '2x2',
    [2, 6, 1],
    [2, 1],
  )
  await contract1.addForecast(
    '0x1',
    '1x2',
    WALLET_ADDRESS_1,
    '2x3',
    [1, 5, 3],
    [1, 1],
  )
  //League 1 -> Team 1 -> Chloé
  await contract1.addForecast(
    '0x1',
    '1x2',
    WALLET_ADDRESS_2,
    '2x1',
    [1, 2, 8],
    [2, 0],
  )
  await contract1.addForecast(
    '0x1',
    '1x2',
    WALLET_ADDRESS_2,
    '2x2',
    [2, 6, 1],
    [2, 1],
  )
  await contract1.addForecast(
    '0x1',
    '1x2',
    WALLET_ADDRESS_2,
    '2x3',
    [1, 5, 3],
    [1, 1],
  )
}

fillLeague()
fillTeam()
fillPlayer()
//fillForecast()
