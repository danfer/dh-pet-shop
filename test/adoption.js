const Adoption = artifacts.require("Adoption");

/*
 * uncomment accounts to access the test accounts made available by the
 * Ethereum client
 * See docs: https://www.trufflesuite.com/docs/truffle/testing/writing-tests-in-javascript
 */
contract("Adoption", function (/* accounts */) {
  // it("should assert true", async function () {
  //   await Adoption.deployed();
  //   return assert.isTrue(true);
  // });

  contract('Adoption', function(accounts) {
    describe('first group of tests', () => { 
      let instance;

      before(async () => {
        instance = await Adoption.deployed();
      });

      it('User should adopt a pet', async () => {
        await instance.adopt.sendTransaction(8, {from: accounts[0]});
        let adopter = await instance.adopters.call(8);
        assert.equal(adopter, accounts[0], "Incorrect owner address");
      });

      it('Should get adopter address by pet id in array', async () => {
        let adopters = await instance.getAdopters.call();

        assert.equal(adopters[8], accounts[0], "Owner of pet id should be recorded at array");
      });

      it('Should throw if invalid pet id is given', async () => {
        try {
          await instance.adopt.sendTransaction(17, { from: accounts[0] });
        } catch (error) {
          assert.include(String(error), "revert", `Expected "revert" but instead got ${error}`);
        }
      });

     });
  });
});
