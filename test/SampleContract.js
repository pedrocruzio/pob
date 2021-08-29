const { expect } = require("chai");
const { ethers } = require("hardhat");

// describe("Sample Contract", () => {
//     let SampleContract, sampleContract;

//     beforeEach(async () => {
//         SampleContract = await ethers.getContractFactory("SampleContract");
//         sampleContract = await SampleContract.deploy();
//     });

//     it("emit greeting event when greet function is called", async () => {
//         expect(sampleContract.greet())
//             .to
//             .emit(sampleContract, "Greet")
//             .withArgs("Hello World!");
//     });

// });

describe("Terms Contract", () => {
    let TermContract, termContract;
    let owner;
    let sender;
    let recipient1, addrs;
    let betAmount = 1e9;
    let stepsGoal = 3000;
    let daysOfBet = 5;
    let testToken = "YQ2PWY4KU5LZ3ELQQVCLUYV7CM3RN7PY"
    
    beforeEach(async () => {
        Terms = await ethers.getContractFactory("Terms");
        [owner, sender, recipient1, recipient2, ...addrs] = await ethers.getSigners();
        termContract = await Terms.deploy();
        await termContract.deployed();
    });

    describe("Terms Deployment", function () {
        it("Should set the right owner", async function () {
          expect(await termContract.owner()).to.equal(owner.address);
        });
      });

    describe("Success Scenarios", function() {
        it("it should be able to create a new entry", async () => {
            await expect(termContract.connect(sender).makeEntry(testToken, stepsGoal, daysOfBet, {"value": betAmount })
        ).to.emit(termContract, "NewEntry")
         .withArgs(sender.address, betAmount, stepsGoal, daysOfBet);
        });
      });
      
      describe("Correct Payout function", function() {
        it("it should be able to pay back 2500 gwei", async () => {
        expect(await termContract._calculatePayout(2, 8, 10000)).to.equal(2500);
        });
      });

  

});