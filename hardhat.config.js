require('dotenv').config()
require('@nomicfoundation/hardhat-toolbox')
require('@nomiclabs/hardhat-etherscan')

const ALCHEMY_API_KEY = process.env.REACT_APP_ALCHEMY_API_KEY
const PRIVATE_KEY = process.env.REACT_APP_WALLET_PRIVATE_KEY_1

module.exports = {
  defaultNetwork: 'hardhat',
  networks: {
    hardhat: {},
    goerli: {
      url: `https://eth-goerli.alchemyapi.io/v2/${ALCHEMY_API_KEY}`,
      accounts: [PRIVATE_KEY],
    },
    iexec: {
      url: 'https://bellecour.iex.ec',
      gasPrice: 0,
      accounts: [PRIVATE_KEY],
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
  etherscan: {
    apiKey: {
      iexec: process.env.ETHERSCAN_API_KEY,
    },
    customChains: [
      {
        network: 'iexec',
        chainId: 134,
        urls: {
          apiURL: 'https://blockscout-bellecour.iex.ec/api/',
          browserURL: 'https://blockscout-bellecour.iex.ec',
        },
      },
    ],
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
