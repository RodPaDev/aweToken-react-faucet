const hre = require('hardhat')
const updateDotenv = require('update-dotenv')

async function main() {
  const [deployer] = await hre.ethers.getSigners()

  console.log('Deploying contracts with the account:', deployer.address)

  const DevTokenFacotry = await hre.ethers.getContractFactory('DevToken')
  const devToken = await DevTokenFacotry.deploy('DevToken', 'DEVT')

  await devToken.deployed()

  console.log('Token deployed to:', devToken.address)
  await updateDotenv({ REACT_APP_TOKEN_ADDRESS: devToken.address }).then(
    (env, err) => {
      return err ? console.log('err!', err) : console.log('Done!', env)
    }
  )
  console.log('Exiting deploy')
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error)
    process.exit(1)
  })
