const { loadFixture } = require('@nomicfoundation/hardhat-network-helpers')
const { expect } = require('chai')
const { ethers } = require('hardhat')

describe('Oracle', function () {
  async function deployTokenFixture() {
    const [owner, otherAccount] = await ethers.getSigners()
    const contract = await ethers.getContractFactory('GetOracleInfo')
    const deployedContract = await contract.deploy()
    return { deployedContract, owner, otherAccount }
  }
  describe('Test Oracle ', function () {
    it('function get', async function () {
      const { deployedContract, owner } = await loadFixture(deployTokenFixture)
      const tab = await deployedContract.get()
      expect(tab[0]).to.equal(0)
      expect(tab[1]).to.equal(0)
    })
    it('function getOracleData', async function () {
      const { deployedContract, owner } = await loadFixture(deployTokenFixture)
      /*const value = await deployedContract.getOracleData(
        '0x7d55ae0be7ec7d8189645f834522d9d8147865a2ef022deb006e9757567e2272',
      )
      expect(value).to.equal(44)*/
    })
  })
})
