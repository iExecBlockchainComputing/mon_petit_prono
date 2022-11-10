const { loadFixture } = require('@nomicfoundation/hardhat-network-helpers')
const { expect } = require('chai')
const { ethers } = require('hardhat')

describe('Time', function () {
    async function deployTokenFixture() {
        const [owner, otherAccount] = await ethers.getSigners()
        const contract = await ethers.getContractFactory('GetOracleInfo')
        const deployedContract = await contract.deploy()
        return { deployedContract, owner, otherAccount }
      }
      describe('Test deployment ', function () {
        it('Should set right owner', async function () {
          const { deployedContract, owner } = await loadFixture(deployTokenFixture)
        })
      })
})