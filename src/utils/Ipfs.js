import * as IPFS from 'ipfs-core'
import { Buffer } from 'buffer'

let node

export async function ipfs() {
  node = await IPFS.create()
  const cidJson = await addLeagueIPFS()
  await getLeagueIPFS(cidJson)
}

async function addLeagueIPFS() {
  const jsonobject = { backgroundColor: '#ffffff', image: 'cid' }
  const data = Buffer.from(JSON.stringify(jsonobject))
  const results = (await node.add(data)).path
  return results
}

async function getLeagueIPFS(cid) {
  const stream = await node.cat(cid)
  const decoder = new TextDecoder()
  let data = ''
  for await (const chunk of stream) {
    data += decoder.decode(chunk)
  }
  const Object = JSON.parse(data)
  console.log(Object.image)
  return Object
}
