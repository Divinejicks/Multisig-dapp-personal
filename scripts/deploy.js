const hre = require('hardhat');

async function main() {
    const MultiSig = await hre.ethers.getContractFactory("MultiSig");
    const accounts = await hre.ethers.getSigners();

    const multiSig = MultiSig.deploy(
        [accounts[0].address, accounts[1].address, accounts[2].address], 
        2,
        {value: 1000});
    await multiSig.deployed();

    console.log("MultiSig deployed to:", multiSig.address);
}

main().catch((error) => { 
    console.error(error);
    process.exitCode = 1;
  });