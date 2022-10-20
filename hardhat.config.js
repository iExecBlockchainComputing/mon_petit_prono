require('@nomicfoundation/hardhat-toolbox')
require('dotenv').config()

const ALCHEMY_API_KEY = process.env.REACT_APP_ALCHEMY_API_KEY
const GOERLI_PRIVATE_KEY = process.env.REACT_APP_WALLET_PRIVATE_KEY_1

module.exports = {
  defaultNetwork: 'hardhat',
  networks: {
    hardhat: {},
    goerli: {
      url: `https://eth-goerli.alchemyapi.io/v2/${ALCHEMY_API_KEY}`,
      accounts: [GOERLI_PRIVATE_KEY],
    },
  },
  solidity: {
    version: '0.8.17',
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  paths: {
    sources: './contracts',
    tests: './test',
    cache: './cache',
    artifacts: './artifacts',
  },
  mocha: {
    timeout: 40000,
  },
}
