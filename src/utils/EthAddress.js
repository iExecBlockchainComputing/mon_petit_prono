import './ethAddress.css'
import { useEffect, useState } from 'react'
import { IExec } from 'iexec'
import { MdOutlineContentCopy } from 'react-icons/md'

export default function EtherumAdress({ address, nb, color }) {
  const [displayENS, setDisplayENS] = useState(false)
  const [ENS, setENS] = useState('')
  let first = address.substring(0, nb)
  const [copyToClipboard, setCopyToClipboard] = useState(false)
  const [showingCopied, setShowingCopied] = useState(false)
  let last = address.substring(38, 42)
  const iexec = new IExec({ ethProvider: window.ethereum })

  function copied() {
    navigator.clipboard.writeText(address)
    setShowingCopied(true)
    setTimeout(() => {
      setShowingCopied(false)
    }, 1000)
  }

  useEffect(() => {
    async function getENS() {
      console.log(address)
      const ensName = await iexec.ens.lookupAddress(address)
      console.log(ensName)
      if (ensName !== null) {
        setDisplayENS(true)
        setENS(ensName.split('.')[0])
      }
    }
    getENS()
  }, [address])

  return (
    <span
      id="ethAddress"
      onMouseEnter={(e) => {
        setCopyToClipboard(true)
      }}
      onMouseLeave={(e) => {
        setCopyToClipboard(false)
      }}
      onClick={copied}
      style={{ color: color }}
    >
      {displayENS ? ENS : ' ' + first + '...' + last + '   '}
      {copyToClipboard && <MdOutlineContentCopy color={{ color: color }} />}
      {showingCopied && <div className="sm-message">Copied!</div>}
    </span>
  )
}
