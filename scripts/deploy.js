async function main() {
    // We get the contract to deploy
    const FortubeFlashLiquidator = await ethers.getContractFactory("StrategyCommonRewardPoolLPV2");
    const liquidator = await FortubeFlashLiquidator.deploy();

    console.log("FortubeFlashLiquidator deployed to:", liquidator.address);
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });