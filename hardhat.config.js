require("./tasks/accounts")
require("@nomiclabs/hardhat-waffle")
require("@nomiclabs/hardhat-ethers")
require("@nomiclabs/hardhat-etherscan")
require("hardhat-deploy")

require('dotenv').config()

const POLYGON_MAINNET_RPC_URL = process.env.POLYGON_MAINNET_RPC_URL || "https://polygon-rpc.com"
const MNEMONIC = process.env.MNEMONIC || "your mnemonic"


/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
    defaultNetwork: "hardhat",
    solidity: {
        compilers: [
            {
                version: "0.8.4"
            }
        ]
    },
    namedAccounts: {
        deployer: {
            default: 0, // here this will by default take the first account as deployer
            1: 0 // similarly on mainnet it will take the first account as deployer. Note though that depending on how hardhat network are configured, the account 0 on one network can be different than on another
        },
    },
    networks: {
        hardhat: {

        },
        ganache: {
            url: 'http://localhost:8545',
            accounts: {
                mnemonic: MNEMONIC,
            }
        },
        polygon: {
            url: POLYGON_MAINNET_RPC_URL,
            accounts: {
                mnemonic: MNEMONIC
            },
            saveDeployments: true,
        },
    },
    mocha: {
        timeout: 120000
    }
};