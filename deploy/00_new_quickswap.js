module.exports = async ({
                            getNamedAccounts,
                            deployments,
                            getChainId
                        }) => {

    const {deploy, log,  get} = deployments
    const {deployer} = await getNamedAccounts()

    const want = "0x40a5df3e37152d4daf279e0450289af76472b02e"; // the LP //TODO: correct LP
    const rewardPool = "0x346c9e501adc38f1f325cc0c2d44c325283eeaf1"; //todo: correct reward pool

    const vault = "0x0000000000000000000000000000000000000000"; //not known yet.
    const uniRouter = "0xa5e0829caced8ffdd4de3c43696c57f7d7a678ff"; //polygon uni router
    const keeper = "0x10aee6b5594942433e7fc2783598c979b030ef3d"; //polygon keeper

    const strategist = "0xf18adf71266411ff39ffc268843c9a64b3292d86"; //me
    const beefyFeeRecipient = "0xb66ca5319efc42fd1462693bab51ee0c9e452745";

    const QUICK = "0x831753dd7087cac61ab5644b308642cc1c33dc13";
    const WMATIC = "0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270";
    const LP0 = "0x2791bca1f2de4661ed88a30c99a7a9449aa84174"
    const LP1 = "0x5c4b7ccbf908e64f32e12c6650ec0c96d717f03f"

    const outputToNative = [QUICK,WMATIC]; //quick to wmatic
    const outputToLP0Route = [QUICK, LP0]; //quick to bnb - intermediate would be necessary here
    const outputToLP1Route = [QUICK, LP1]; //quick to bnb - intermediate would be necessary here

    log("----------------------------------------------------")
    const StrategyCommonRewardPoolLPV2 = await deploy('StrategyCommonRewardPoolLPV2', {
        from: deployer,
        args: [
            want,
            rewardPool,
            vault,
            uniRouter,
            keeper,
            strategist,
            beefyFeeRecipient,
            outputToNative,
            outputToLP0Route,
            outputToLP1Route
        ],
        log: true
    })
    log("-----------------------STRAT-----------------------------")

    log("-----------------------VAULT-----------------------------")
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