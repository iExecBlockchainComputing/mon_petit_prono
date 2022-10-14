import { useEffect, useState } from 'react'
import { ethers } from 'ethers'
const MyContract = require('./artifacts/contracts/PetitProno.sol/MonPetitProno.json')

export default function WebProvider() {
  const [haveMetamask, sethaveMetamask] = useState(true)
  const [accountAddress, setAccountAddress] = useState('')
  const [isConnected, setIsConnected] = useState(false)
  const { ethereum } = window
  const ethProvider = new ethers.providers.Web3Provider(window.ethereum)
  const contractAddress = '0xa1B1CAbE3FF10B0e08B95F74BF7A374A4A9f85d6'
  const contract = new ethers.Contract(
    contractAddress,
    MyContract.abi,
    provider,
  )

  useEffect(() => {
    connectWallet()
    changeNetwork()
  }, [])

  const connectWallet = async () => {
    try {
      if (!ethereum) {
        sethaveMetamask(false)
      }
      const accounts = await ethereum.request({
        method: 'eth_requestAccounts',
      })

      console.log('account address : ', accounts[0])
      setAccountAddress(accounts[0])
      setIsConnected(true)
    } catch (error) {
      setIsConnected(false)
    }
  }

  const changeNetwork = async () => {
    try {
      await window.ethereum.request({
        method: 'wallet_addEthereumChain',
        params: [
          {
            chainId: '0x86',
            chainName: 'iExec Sidechain',
            nativeCurrency: {
              name: 'xRLC',
              symbol: 'xRLC',
              decimals: 18,
            },
            rpcUrls: ['https://bellecour.iex.ec'],
            blockExplorerUrls: ['https://blockscout-bellecour.iex.ec'],
          },
        ],
      })
    } catch (err) {
      console.log(err.message)
    }
  }

  async function DisconnectProvider() {
    if (isConnected) {
      const accounts = await ethereum.on(
        'disconnect',
        setAccountAddress(''),
        setIsConnected(false),
      )
    } else {
      console.log('your are not connected to MetaMask')
    }
  }

  //listening acount change and network change
  ethProvider.on('chainChanged', (_chainId) => window.location.reload())
  ethProvider.on('accountsChanged', (_accounts) => window.location.reload())

  //call function from smart contract
  const SmartContractFunction = async () => {
    const currentValue = await contract.getValue()
    console.log(currentValue)
  }
}
