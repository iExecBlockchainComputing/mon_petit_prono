import { useEffect } from 'react'
import { ethers } from 'ethers'
import MyContract from '../../assets/abi.json'
import { useSelector, useDispatch } from 'react-redux'

export default function WebProvider() {
  const wallet = useSelector((state) => state.wallet)
  const dispatch = useDispatch()
  const { ethereum } = window
  const ethProvider = new ethers.providers.Web3Provider(window.ethereum)
  const contractAddress = '0xa1B1CAbE3FF10B0e08B95F74BF7A374A4A9f85d6'
  const contract = new ethers.Contract(
    contractAddress,
    MyContract.abi,
    ethProvider,
  )
  

  useEffect(() => {
    connectWallet()
    changeNetwork()
    updateStore()
  }, [])

  const updateStore =() => {
    dispatch({ type: 'wallet/accountAddress', payload: wallet.accountAddress })
    dispatch({ type: 'wallet/setContract', payload: contract })
    dispatch({ type: 'wallet/setProvider', payload: ethProvider })
  }

  const connectWallet = async () => {
    try {
      if (!ethereum) {
        dispatch({ type: 'wallet/haveMetamask', payload: false })
      }
      const accounts = await ethereum.request({
        method: 'eth_requestAccounts',
      })
      dispatch({ type: 'wallet/accountAddress', payload: accounts[0] })
      dispatch({ type: 'wallet/isConnected', payload: true })
    } catch (error) {
      dispatch({ type: 'wallet/isConnected', payload: false })
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
    if (wallet.isConnected) {
      await ethereum.on(
        'disconnect',
        dispatch({ type: 'wallet/accountAddress', payload: '' }),
        dispatch({ type: 'wallet/isConnected', payload: false }),
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
