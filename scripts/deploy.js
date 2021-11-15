const hre = require('hardhat')
const updateDotenv = require('update-dotenv')

async function main() {
  const [deployer] = await hre.ethers.getSigners()

  console.log('Deploying contracts with the account:', deployer.address)

  const tokenFactory = await hre.ethers.getContractFactory('AweToken')
  const aweToken = await tokenFactory.deploy('AweToken', 'AWE')

  await aweToken.deployed()

  console.log('Token deployed to:', aweToken.address)
  await updateDotenv({ REACT_APP_TOKEN_ADDRESS: aweToken.address }).then(
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
