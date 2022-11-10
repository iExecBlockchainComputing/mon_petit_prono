
async function main() {
  const [deployer] = await ethers.getSigners()

  console.log('Deploying contracts with the account:', deployer.address)

  console.log('Account balance:', (await deployer.getBalance()).toString())

  const MonPetitProno = await ethers.getContractFactory('MonPetitProno')
  const contract = await MonPetitProno.deploy()

  const Oracle = await ethers.getContractFactory('GetOracleInfo')
  const Oraclecontract = await Oracle.deploy()

  console.log('Contract MonPetitProno address:', contract.address)
  console.log('Contract Oracle address:', Oraclecontract.address)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
