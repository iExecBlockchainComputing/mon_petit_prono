const { loadFixture } = require('@nomicfoundation/hardhat-network-helpers')
const { expect } = require('chai')
const { ethers } = require('hardhat')

describe('Mon petit prono test', function () {
  async function deployTokenFixture() {
    const [owner, otherAccount] = await ethers.getSigners()
    const contract = await ethers.getContractFactory('MonPetitProno')
    const deployedContract = await contract.deploy()
    return { deployedContract, owner, otherAccount }
  }
  describe('Test deployment ', function () {
    it('Should set right owner', async function () {
      const { deployedContract, owner } = await loadFixture(deployTokenFixture)
      expect(await deployedContract.owner()).to.equal(owner.address)
    })
  })

  describe('League Functions', function () {
    async function LeagueFeature() {
      const { deployedContract } = await loadFixture(deployTokenFixture)
      await deployedContract.addLeague(
        '0x1',
        'Coupe du Monde',
        'https://ipfs_link',
      )
      const leaguesID = await deployedContract.getLeaguesID()
      return { leaguesID, deployedContract }
    }
    it('Verify getLeaguesID', async function () {
      const { leaguesID } = await loadFixture(LeagueFeature)
      expect(leaguesID[0]).to.equal('0x1')
    })
    it('Verify getLeagueById', async function () {
      const { leaguesID, deployedContract } = await loadFixture(LeagueFeature)
      const OneLeague = await deployedContract.getLeagueById(leaguesID[0])
      expect(OneLeague.toString()).to.equal(
        ['0x1', 'Coupe du Monde', 'https://ipfs_link'].toString(),
      )
    })
  })

  describe('Team Functions', function () {
    async function TeamFeature() {
      const { deployedContract } = await loadFixture(deployTokenFixture)
      await deployedContract.addLeague(
        '0x1',
        'Coupe du Monde',
        'https://ipfs_link',
      )
      const leaguesID = await deployedContract.getLeaguesID()
      await deployedContract.addTeam(
        leaguesID[0],
        '1x1',
        'adoption Team',
        'https://ipfs_link',
      )
      await deployedContract.addTeam(
        leaguesID[0],
        '1x2',
        'compagny Team',
        'https://ipfs_link',
      )
      const TeamsIdFromOneLeague = await deployedContract.getTeamsIdFromOneLeague(
        leaguesID[0],
      )
      return { deployedContract, leaguesID, TeamsIdFromOneLeague }
    }
    it('Verify getTeamsIdFromOneLeague', async function () {
      const { TeamsIdFromOneLeague } = await loadFixture(TeamFeature)
      expect(TeamsIdFromOneLeague.toString()).to.equal(
        ['1x1', '1x2'].toString(),
      )
    })
    it('Verify getTeamsInfos', async function () {
      const {
        deployedContract,
        leaguesID,
        TeamsIdFromOneLeague,
      } = await loadFixture(TeamFeature)
      const TeamsInfos = await deployedContract.getTeamsInfos(
        leaguesID[0],
        TeamsIdFromOneLeague[0],
      )
      expect(TeamsInfos.toString()).to.equal(
        ['1x1', 'adoption Team', 'https://ipfs_link'].toString(),
      )
    })
  })

  describe('Team Functions', function () {
    async function PlayerFeature() {
      const { deployedContract } = await loadFixture(deployTokenFixture)
      await deployedContract.addLeague(
        '0x1',
        'Coupe du Monde',
        'https://ipfs_link',
      )
      const leaguesID = await deployedContract.getLeaguesID()
      await deployedContract.addTeam(
        leaguesID[0],
        '1x1',
        'adoption Team',
        'https://ipfs_link',
      )
      await deployedContract.addTeam(
        leaguesID[0],
        '1x2',
        'compagny Team',
        'https://ipfs_link',
      )
      const TeamsIdFromOneLeague = await deployedContract.getTeamsIdFromOneLeague(
        leaguesID[0],
      )
      const signer2 = await ethers.getSigner(
        '0x70997970C51812dc3A010C7d01b50e0d17dc79C8',
      )
      const signer3 = await ethers.getSigner(
        '0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC',
      )
      await deployedContract.addPlayer('0x1', '1x1', 'Robin')
      await deployedContract.connect(signer2).addPlayer('0x1', '1x1', 'Paul')
      await deployedContract.connect(signer3).addPlayer('0x1', '1x1', 'Pierre')

      return {
        deployedContract,
        leaguesID,
        TeamsIdFromOneLeague,
      }
    }
    it('Verify getAllPlayerAddrFromOneTeam', async function () {
      const {
        leaguesID,
        TeamsIdFromOneLeague,
        deployedContract,
      } = await loadFixture(PlayerFeature)
      const AllPlayerAddrFromOneTeam = await deployedContract.getAllPlayerAddrFromOneTeam(
        leaguesID[0],
        TeamsIdFromOneLeague[0],
      )
      expect(AllPlayerAddrFromOneTeam.toString()).to.equal(
        [
          '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266',
          '0x70997970C51812dc3A010C7d01b50e0d17dc79C8',
          '0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC',
        ].toString(),
      )
    })
    /**it('Verify getMyTeamFromOneLeague', async function () {
      const { deployedContract, leaguesID } = await loadFixture(TeamFeature)
      const myTeam = await deployedContract.getMyTeamFromOneLeague(leaguesID[0])
      expect(myTeam.toString()).to.equal(['1x1', '1x2'].toString())
    })*/
  })
})
