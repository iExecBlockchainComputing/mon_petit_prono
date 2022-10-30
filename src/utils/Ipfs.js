import axios from 'axios'
import FormData from 'form-data'

async function PostLeagueImage(formData) {
  let imagePath = null
  try {
    const response = await axios({
      url: 'https://api.pinata.cloud/pinning/pinFileToIPFS',
      method: 'post',
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_PINIATA_JWT}`,
      },
      data: formData,
    })
    const data = response.data
    imagePath = data.IpfsHash
  } catch (error) {
    console.log(error)
  }
  return imagePath
}

async function PostLeagueMetadata(formData) {
  let imagePath = null
  try {
    const response = await axios({
      method: 'post',
      url: 'https://api.pinata.cloud/pinning/pinJSONToIPFS',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.REACT_APP_PINIATA_JWT}`,
      },
      data: formData,
    })
    const data = response.data
    imagePath = data.IpfsHash
  } catch (error) {
    console.log(error)
  }
  return imagePath
}

export async function addLeagueIPFS(
  _LeagueId,
  _LeagueName,
  file,
  _playerName,
  color,
) {
  //Upload the image on OFF-CHAIN storage
  let formData = new FormData()
  formData.append('file', file)
  let imagePath = null
  try {
    imagePath = await PostLeagueImage(formData)
  } catch (err) {
    console.log(err)
  }

  //Upload the metadata on OFF-CHAIN storage
  var data = JSON.stringify({
    LeagueId: `${_LeagueId}`,
    LeagueName: `${_LeagueName}`,
    CreatorName: `${_playerName}`,
    backgroundColor: `${color}`,
    description: 'League metadata',
    image: `${imagePath}`,
  })
  let Metadata = null
  try {
    Metadata = await PostLeagueMetadata(data)
  } catch (err) {
    console.log(err)
  }

  return Metadata
}

export async function getLeagueIPFSJson(cid) {
  console.log('cid Json :', cid)
  let response = null
  if (cid !== '') {
    try {
      response = await axios({
        method: 'get',
        url: `/ipfs/${cid}`,
        proxy: {
          host: 'https://gateway.ipfs.io',
        },
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.REACT_APP_PINIATA_JWT}`,
        },
      })
      console.log('get Json/response', response.data)
    } catch (error) {
      console.log(error)
    }
  }
  return response.data
}

export async function getIPFSImage(cid) {
  console.log('cid Image', cid)
  let response = null
  if (cid !== '') {
    try {
      response = await axios({
        method: 'get',
        url: `/ipfs/${cid}`,
        proxy: {
          host: 'https://gateway.ipfs.io',
        },
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_PINIATA_JWT}`,
        },
        responseType: 'blob',
      })
    } catch (error) {
      console.log(error)
    }
  }
  console.log('get Image/response', response.data)
  return response.data
}
