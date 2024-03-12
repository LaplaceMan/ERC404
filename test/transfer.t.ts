import { expect } from "chai";
import { ethers } from "hardhat";
import { ERC404Imp, ERC404Imp__factory } from "../typechain-types";

describe("Mint", async function () {
  async function deploy() {
    const [owner, otherAccount] = await ethers.getSigners();
    const factory: ERC404Imp__factory = await ethers.getContractFactory('ERC404Imp') as ERC404Imp__factory;
    const contract = await factory.deploy('test', 'test', 18, owner.address);
    await contract.waitForDeployment();
    const deployedAddress = await contract.getAddress();

    return { contractAddress: deployedAddress, owner, otherAccount };
  }


  it("transfer erc20", async function () {
    const data = await deploy();
    const mintAmount = ethers.parseEther('10')
    const contract = ERC404Imp__factory.connect(data.contractAddress, data.otherAccount)
    const tx_1 = await contract.mintERC20(data.otherAccount.address, mintAmount);
    await tx_1.wait();

    const sender20Balance = await contract.balanceOf(data.otherAccount.address);
    console.debug("Transfer befor sender 20 balance", sender20Balance);
    const sender721Balance = await contract.erc721BalanceOf(data.otherAccount.address);
    console.debug("Transfer befor sender 721 balance", sender721Balance);

    expect(sender20Balance).to.eq(mintAmount)

    const owner20Balance = await contract.balanceOf(data.owner.address);
    console.debug("Transfer befor owner 20 balance", owner20Balance);
    const owner721Balance = await contract.erc721BalanceOf(data.owner.address);
    console.debug("Transfer befor owner 721 balance", owner721Balance);

    const tx_3 = await contract.transfer(data.owner.address, mintAmount)
    await tx_3.wait();

    const sender20BalanceAfter = await contract.balanceOf(data.otherAccount.address);
    console.debug("Transfer after sender 20 balance", sender20BalanceAfter);
    const sender721BalanceAfter = await contract.erc721BalanceOf(data.otherAccount.address);
    console.debug("Transfer after sender 721 balance", sender721BalanceAfter);

    expect(sender20BalanceAfter).to.eq(0n)
    expect(sender721BalanceAfter).to.eq(0n)

    const owner20BalanceAfter = await contract.balanceOf(data.owner.address);
    console.debug("Transfer after owner 20 balance", owner20BalanceAfter);
    const owner721BalanceAftere = await contract.erc721BalanceOf(data.owner.address);
    console.debug("Transfer after owner 721 balance", owner721BalanceAftere);

    expect(owner20BalanceAfter).to.eq(mintAmount)
    expect(owner721BalanceAftere).to.eq(0n)
  })

  it("transfer erc20", async function () {
    const data = await deploy();
    const mintAmount = ethers.parseEther('50000')
    const contract = ERC404Imp__factory.connect(data.contractAddress, data.otherAccount)
    const tx_1 = await contract.mintERC20(data.otherAccount.address, mintAmount);
    await tx_1.wait();

    const sender20Balance = await contract.balanceOf(data.otherAccount.address);
    console.debug("Transfer befor sender 20 balance", sender20Balance);
    const sender721Balance = await contract.erc721BalanceOf(data.otherAccount.address);
    console.debug("Transfer befor sender 721 balance", sender721Balance);

    expect(sender20Balance).to.eq(mintAmount)

    const owner20Balance = await contract.balanceOf(data.owner.address);
    console.debug("Transfer befor owner 20 balance", owner20Balance);
    const owner721Balance = await contract.erc721BalanceOf(data.owner.address);
    console.debug("Transfer befor owner 721 balance", owner721Balance);

    const tx_3 = await contract.transfer(data.owner.address, mintAmount)
    await tx_3.wait();

    const sender20BalanceAfter = await contract.balanceOf(data.otherAccount.address);
    console.debug("Transfer after sender 20 balance", sender20BalanceAfter);
    const sender721BalanceAfter = await contract.erc721BalanceOf(data.otherAccount.address);
    console.debug("Transfer after sender 721 balance", sender721BalanceAfter);

    expect(sender20BalanceAfter).to.eq(0n)
    expect(sender721BalanceAfter).to.eq(0n)

    const owner20BalanceAfter = await contract.balanceOf(data.owner.address);
    console.debug("Transfer after owner 20 balance", owner20BalanceAfter);
    const owner721BalanceAftere = await contract.erc721BalanceOf(data.owner.address);
    console.debug("Transfer after owner 721 balance", owner721BalanceAftere);

    expect(owner20BalanceAfter).to.eq(mintAmount)
    expect(owner721BalanceAftere).to.eq(5n)
  })

})