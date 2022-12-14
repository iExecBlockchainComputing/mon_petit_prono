import './ethAddress.css'
import { useState } from 'react'
import { MdOutlineContentCopy } from 'react-icons/md'

export default function EtherumAdress({ address, nb, color }) {
  let first = address.substring(0, nb)
  const [copyToClipboard, setCopyToClipboard] = useState(false)
  const [showingCopied, setShowingCopied] = useState(false)
  let last = address.substring(38, 42)

  function copied() {
    navigator.clipboard.writeText(address)
    setShowingCopied(true)
    setTimeout(() => {
      setShowingCopied(false)
    }, 1000)
  }

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
      {' ' + first + '...' + last+'   '}
      {copyToClipboard && <MdOutlineContentCopy color={{ color: color }} />}
      {showingCopied && <div className="sm-message">Copied!</div>}
    </span>
  )
}
