module.exports = async ({
                            getNamedAccounts,
                            deployments,
                            getChainId
                        }) => {

    const {deploy, log, get} = deployments
    const {deployer} = await getNamedAccounts()

    log("----------------------------------------------------")
    let strategy = await get('StrategyCommonRewardPoolLPV2');


    const approvalDelay = 21600;
    const lp0 = "USDC";
    const lp1 = "BNB"
    const name = `Moo Quick ${lp0}-${lp1}`
    const symbol  = `mooQuick${lp0}-${lp1}`

    const BeefyVaultV6 = await deploy('BeefyVaultV6', {
        from: deployer,
        args: [
            strategy.address,
            name,
            symbol,
            approvalDelay
        ],
        log: true
    })

    log("----------------------------------------------------")

}

module.exports.tags = ['all', 'main']