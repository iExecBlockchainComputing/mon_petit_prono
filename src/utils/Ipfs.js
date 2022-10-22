import * as IPFS from 'ipfs-core'
import { Buffer } from 'buffer'

/*const init = async () => {
  return (await IPFS.create())
}
const node = init()*/

export async function addLeagueIPFS(_ipfs, color) {
  const node = await IPFS.create()
  console.log('1')
  const readUploadedFileAsText = (inputFile) => {
    const temporaryFileReader = new FileReader()

    return new Promise((resolve, reject) => {
      temporaryFileReader.onerror = () => {
        temporaryFileReader.abort()
        reject(new DOMException('Problem parsing input file.'))
      }

      temporaryFileReader.onload = () => {
        resolve(temporaryFileReader.result)
      }
      temporaryFileReader.readAsArrayBuffer(inputFile)
    })
  }
  const ArrayBuffer = await readUploadedFileAsText(_ipfs)
  const imgPath = (await node.add(ArrayBuffer)).path
  const jsonobject = { backgroundColor: color, image: imgPath }
  const data = Buffer.from(JSON.stringify(jsonobject))
  return (await node.add(data)).path
}

export async function getLeagueIPFS(cid) {
  const node = await IPFS.create()
  const stream = node.cat(cid)
  const decoder = new TextDecoder()
  let data = ''
  for await (const chunk of stream) {
    data += decoder.decode(chunk)
  }
  const Object = JSON.parse(data)
  return Object
}
