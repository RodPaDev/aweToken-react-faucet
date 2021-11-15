require('@nomiclabs/hardhat-waffle')
require('dotenv').config()

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
// eslint-disable-next-line no-undef
task('accounts', 'Prints the list of accounts', async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners()

  for (const account of accounts) {
    console.log(account.address)
  }
})

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: '0.8.4',
  networks: {
    ropsten: {
      url: 'https://ropsten.infura.io/v3/840d7c4d4a2642da92d800480140f927',
      accounts: [`0x${process.env.PRIVATE_KEY}`]
    },
    hardhat: {
      chainId: 69420, // changed this to connect to metamsk easier
      accounts: {
        count: 3,
        accountsBalance: '10000000000000000000'
      }
    }
  },
  paths: {
    artifacts: './src/artifacts'
  }
}
