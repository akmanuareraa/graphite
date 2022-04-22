const graphite = artifacts.require('graphite');
const graphitev2 = artifacts.require('graphitev2');

const { upgradeProxy } = require('@openzeppelin/truffle-upgrades');

//Mint
//Transfer
//ApproveandTransferFromThirdAccount
//Burn
//Upgrade -->



    contract("Graphite test", accounts  => {
    
        it("should mint tokens", async () => {
        
        const account = accounts[3];
        
        const mintamount = 50;
    
        const instance = await graphite.deployed();
        const GPI = instance;
    
        var balance = await GPI.balanceOf.call(account);
        const account_starting_balance = balance.toNumber();
    
        await GPI.mint(account, mintamount, { from: accounts[0] });
    
        balance = await GPI.balanceOf.call(account);
        const account_ending_balance = balance.toNumber();
    
        assert.equal(
          account_ending_balance,
          account_starting_balance + mintamount,
          "Amount wasn't correctly minted"
        );

        
      });
    

    it("should transfer tokens correctly using transfer", async () => {
        
        const account1 = accounts[3];
        const account2 = accounts[4];
        
        const amount = 10;
    
        const instance = await graphite.deployed();
        const GPI = instance;
    
        var balance = await GPI.balanceOf.call(account1);
        const account1_starting_balance = balance.toNumber();

        balance = await GPI.balanceOf.call(account2);
        const account2_starting_balance = balance.toNumber();

        await GPI.transfer(account2, amount, { from: account1 });
    
        balance = await GPI.balanceOf.call(account1);
        const account1_ending_balance = balance.toNumber();

        balance = await GPI.balanceOf.call(account2);
        const account2_ending_balance = balance.toNumber();

        assert.equal(
          account1_ending_balance,
          account1_starting_balance - amount,
          "Sending account not correctly debited"
        );

        assert.equal(
            account2_ending_balance,
            account2_starting_balance + amount,
            "Receiving account not correctly credited"
          ); 
        });
        

        it("should transfer tokens correctly using approve and transferFrom", async () => {
          
          const account1 = accounts[3];
          const account2 = accounts[4];
          const account3 = accounts[5];
          
          const amount = 10;
      
          const instance = await graphite.deployed();
          const GPI = instance;
      
          var balance = await GPI.balanceOf.call(account1);
          const account1_starting_balance = balance.toNumber();
  
          balance = await GPI.balanceOf.call(account2);
          const account2_starting_balance = balance.toNumber();
          
          await GPI.approve(account3, amount, { from: account1 });
          await GPI.transferFrom(account1, account2, amount, { from: account3 });
      
          balance = await GPI.balanceOf.call(account1);
          const account1_ending_balance = balance.toNumber();
  
          balance = await GPI.balanceOf.call(account2);
          const account2_ending_balance = balance.toNumber();
  
          assert.equal(
            account1_ending_balance,
            account1_starting_balance - amount,
            "Sending account not correctly debited"
          );
  
          assert.equal(
              account2_ending_balance,
              account2_starting_balance + amount,
              "Receiving account not correctly credited"
            ); 
          });


          it("should burn tokens correctly", async () => {
            
            const account = accounts[3];
            
            const burnamount = 10;
        
            const instance = await graphite.deployed();
            const GPI = instance;
        
            var balance = await GPI.balanceOf.call(account);
            const account_starting_balance = balance.toNumber();
        
            await GPI.burn(burnamount, { from: account });
        
            balance = await GPI.balanceOf.call(account);
            const account_ending_balance = balance.toNumber();
        
            assert.equal(
              account_ending_balance,
              account_starting_balance - burnamount,
              "Amount wasn't correctly burned"
            );
    
            
          });


          it("should upgrade correctly and storage should be retained", async () => {
            
            const instance = await graphite.deployed();
            const GPI = instance;

            var account = accounts[3];
            
            var versionold = await GPI.getVersion();
            var symbolOld = await GPI.getTokenSymbol();
            
            const instanceNew = await upgradeProxy(GPI.address,graphitev2);
        
            var versionnew = await GPI.getVersion();
            var symbolNew = await GPI.getTokenSymbol();

            assert.equal(
              versionold,
              "Graphite(GPI) Version - 1.0",
              "Contract old version not correct"
            );

            assert.equal(
              versionnew,
              "Graphite(GPI) Version - 2.0",
              "Contract version not upgraded correctly"
            );

            assert.equal(
              symbolOld,
              symbolNew,
              "Storage changed after upgrade"
            );
    
            
          });
/*
          it("should upgrade correctly", async () => {
            
            const instance = await graphite.deployed();
            const GPI = instance;
        
            const instanceNew = await upgradeProxy(GPI.address,graphitev2);
        
            var version = await GPI.getVersion();


            assert.equal(
              version,
              "Graphite(GPI) Version - 2.0",
              "Contract version not upgraded correctly"
            );
    
            
          });
        */
           });
