const { loadFixture } = require('@nomicfoundation/hardhat-network-helpers')
const { anyValue } = require('@nomicfoundation/hardhat-chai-matchers/withArgs')
const { expect } = require('chai')
const { ethers } = require('hardhat')

describe('Mon petit prono test', function () {
  async function deployTokenFixture() {
    //contract are deployed using first signer account by default
    const [owner, otherAccount] = await ethers.getSigners()

    const contract = await ethers.getContractFactory('PetitProno')
    const deployedContract = await contract.deploy()

    return { deployedContract, owner, otherAccount }
  }
  describe('Test deployment ', function () {
    it('Should set right owner', async function () {
      const { deployedContract, owner } = await loadFixture(deployTokenFixture)
      expect(await deployedContract.owner()).to.equal(owner.address)
    })
  })

  describe('Getter & Setter', function () {
    it('Should set and get the right value', async function () {
      const { deployedContract } = await loadFixture(deployTokenFixture)
      await deployedContract.set(
        '0xa1B1CAbE3FF10B0e08B95F74BF7A374A4A9f85d6',
        'https://ipfs_link',
      )
      expect(
        await deployedContract.get(
          '0xa1B1CAbE3FF10B0e08B95F74BF7A374A4A9f85d6',
        ),
      ).to.equal('https://ipfs_link')
    })

    it('Should remove the right value', async function () {
      const { deployedContract } = await loadFixture(deployTokenFixture)
      await deployedContract.set(
        '0xa1B1CAbE3FF10B0e08B95F74BF7A374A4A9f85d6',
        'https://ipfs_link',
      )
      await deployedContract.remove(
        '0xa1B1CAbE3FF10B0e08B95F74BF7A374A4A9f85d6',
      )
      expect(
        await deployedContract.get(
          '0xa1B1CAbE3FF10B0e08B95F74BF7A374A4A9f85d6',
        ),
      ).to.equal('')
    })
  })
})
