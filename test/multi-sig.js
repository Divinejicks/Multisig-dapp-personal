const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("MultiSig contract", () => {
    let  multiSig = null;
    beforeEach(async () => {
        const MultiSig = await ethers.getContractFactory("MultiSig");
        const accounts = await ethers.getSigners();
        multiSig = await MultiSig.deploy(
            [accounts[0].address, accounts[1].address, accounts[2].address],
             2,
             {value: 1000});
        await multiSig.deployed();
    });

    describe("MultiSig", () => {
        it("Should create transfer", async () => {
            const accounts = await ethers.getSigners();
            await multiSig.connect(accounts[0]).createTransfer(100, accounts[3].address);
            const transfers = await multiSig.transfers(0);
            expect(transfers.id.toNumber()).to.equal(0);
            expect(transfers.amount.toNumber()).to.equal(100);
        });

        it("Should NOT create transfer", async () => {
            const accounts = await ethers.getSigners();
            await expect(multiSig.connect(accounts[4]).createTransfer(100, accounts[3].address))
            .to.be.revertedWith("Only Approver allowed");
            
        });

        it("Should not send transfer if approvalNum not reached", async () => {
            const accounts = await ethers.getSigners();
            const balanceBefore = await multiSig.balanceOf(accounts[6].address);
            await multiSig.connect(accounts[0]).createTransfer(100, accounts[6].address);
            await multiSig.connect(accounts[1]).sendTransfer(0);
            const balanceAfter = await multiSig.balanceOf(accounts[6].address);
            expect(balanceAfter.sub(balanceBefore)).to.equal(0)
        });

        it("Should send transfer if approvalNum is reached", async () => {
            const accounts = await ethers.getSigners();
            const balanceBefore = await multiSig.balanceOf(accounts[6].address);
            await multiSig.connect(accounts[0]).createTransfer(100, accounts[6].address);
            await multiSig.connect(accounts[1]).sendTransfer(0);
            await multiSig.connect(accounts[2]).sendTransfer(0);
            const balanceAfter = await multiSig.balanceOf(accounts[6].address);
            expect(balanceAfter.sub(balanceBefore)).to.equal(100)
        })
    })
});