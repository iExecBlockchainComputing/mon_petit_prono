require('@nomicfoundation/hardhat-toolbox')

// Go to https://www.alchemyapi.io, sign up, create
// a new App in its dashboard, and replace "KEY" with its key
const ALCHEMY_API_KEY = 'vwVPegmjhixISIT4GAQz1JpffoYO3Wiw'
const GOERLI_PRIVATE_KEY =
  '32a952d982ceb716fa5f2db927e29b4fb457aff645c78503148cd950977d8309'

module.exports = {
  defaultNetwork: 'goerli',
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
