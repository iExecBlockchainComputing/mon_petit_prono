import { useEffect } from 'react'
import { ethers } from 'ethers'
import MyContract from './abi.json'
import { useSelector, useDispatch } from 'react-redux'

const AllNetwork = [
  {
    chainId: '0x' + parseInt(134).toString(16),
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
    chainId: '0x' + parseInt(5).toString(16),
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

const { ethereum } = window
const provider = new ethers.providers.Web3Provider(window.ethereum)
const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS
const signer = provider.getSigner()
export const contract = new ethers.Contract(
  contractAddress,
  MyContract.abi,
  provider,
)
const contractWithSigner = contract.connect(signer)

export function WebProvider() {
  const wallet = useSelector((state) => state.wallet)
  const dispatch = useDispatch()

  useEffect(() => {
    connectWallet()
    switchNetwork()
    updateStore()
  }, [])

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

  const addNetwork = async () => {
    try {
      await window.ethereum.request({
        method: 'wallet_addEthereumChain',
        params: [AllNetwork[1]],
      })
    } catch (error) {
      console.error(error)
    }
  }

  const switchNetwork = async () => {
    try {
      await ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: AllNetwork[1].chainId }],
      })
    } catch {
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
}
