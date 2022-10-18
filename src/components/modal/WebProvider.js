import { useEffect } from 'react'
import { ethers } from 'ethers'
import MyContract from '../../assets/abi.json'
import { useSelector, useDispatch } from 'react-redux'


export default function WebProvider() {
  const wallet = useSelector((state) => state.wallet)
  const dispatch = useDispatch()
  const { ethereum } = window
  const provider = new ethers.providers.Web3Provider(window.ethereum)
  const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS
  const signer = provider.getSigner()
  const contract = new ethers.Contract(
    contractAddress,
    MyContract.abi,
    provider,
  )
  const contractWithSigner = contract.connect(signer)

  useEffect(() => {
    connectWallet()
    switchNetwork()
    updateStore()
    test()
  }, [])

  const test = async () => {
    const val = await contract.getLeaguesID()
    console.log('yeah ma valeur :', val)
  }

  const updateStore = () => {
    dispatch({ type: 'wallet/accountAddress', payload: wallet.accountAddress })
    dispatch({ type: 'wallet/setContract', payload: contract })
    dispatch({ type: 'wallet/setProvider', payload: provider })
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
      console.log(error.message)
    }
  }

  const AllNetwork = [
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
    {
      chainId: '0x5',
      chainName: 'Réseau de test Goerli',
      nativeCurrency: {
        name: 'GoerliETH',
        symbol: 'GoerliETH',
        decimals: 18,
      },
      rpcUrls: ['https://rpc.goerli.mudit.blog/'],
      blockExplorerUrls: ['https://goerli.etherscan.io'],
    },
  ]

  const addNetwork = async () => {
    try {
      await window.ethereum.request({
        method: 'wallet_addEthereumChain',
        params: [AllNetwork[1]],
      })
    } catch (err) {
      console.log(err.message)
    }
  }

  const switchNetwork = async () => {
    try {
      await ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: AllNetwork[1].chainId }],
      })
    } catch (err) {
      addNetwork()
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
      console.log('your are already not connected to MetaMask')
    }
  }

  //listening acount change and network change
  ethereum.on('chainChanged', (_chainId) => {
    window.location.reload()
  })
  ethereum.on('accountsChanged', (_accounts) => {
    window.location.reload()
  })

  //call function from smart contract
  const SmartContractFunction = async () => {
    const currentValue = await contract.getValue()
    console.log(currentValue)
  }
}
