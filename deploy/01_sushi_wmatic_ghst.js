module.exports = async ({
                            getNamedAccounts,
                            deployments,
                            getChainId
                        }) => {

    const {deploy, log, get} = deployments
    const {deployer} = await getNamedAccounts()

    const want = "0xf69e93771f11aecd8e554aa165c3fe7fd811530c"; // the LP
    const poolId = 27;
    const masterChef = "0x0769fd68dfb93167989c6f7254cd0d766fb2841f";

    const vault = "0x0000000000000000000000000000000000000000"; //not known yet.
    const uniRouter = "0x1b02da8cb0d097eb8d57a175b88c7d8b47997506"; //sushi
    const keeper = "0x10aee6b5594942433e7fc2783598c979b030ef3d"; //polygon keeper

    const strategist = "0xf18adf71266411ff39ffc268843c9a64b3292d86"; //me
    const beefyFeeRecipient = "0xb66ca5319efc42fd1462693bab51ee0c9e452745";

    const NATIVE = "0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270"; //wmatic
    const OUTPUT = "0x0b3f868e0be5597d5db7feb59e1cadbb0fdda50a"; //sushi
    const LP0 = NATIVE; //wmatic
    const LP1 = "0x385eeac5cb85a38a9a07a70c73e0a3271cfb54a7"; //GHST

    const outputToNative = [OUTPUT,NATIVE];
    const nativeToOutput = [NATIVE,OUTPUT];
    const outputToLP0Route = [OUTPUT, LP0]; //quick to bnb - intermediate would be necessary here
    const outputToLP1Route = [OUTPUT, LP1]; //quick to bnb - intermediate would be necessary here

    log("----------------------------------------------------")
    const StrategyCommonRewardPoolLPV2 = await deploy('StrategyCommonMiniChefLP', {
        from: deployer,
        args: [
            want,
            poolId,
            masterChef,
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