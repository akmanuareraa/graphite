const serverUrl = "https://jqeiowrpgarv.usemoralis.com:2053/server";
const appId = "TaWaoLfm9m9uk9TtKIVl8CXEEQUbUY8CHJIvTvhx";
Moralis.start({ serverUrl, appId }); 

const childTokenAddress = "0x1a7649FD72ac113D95Ab6d0Bd0873cf5c9d1D0aA";
const sideBridgeAddress = "0x2786c0a4723aEC299ECF4cfA8b3D3eAB14b2E945";

login();

async function login(){
    Moralis.Web3.enableWeb3().then(async function (){
        renderReturnData();
        subscribeUpdateUnlocked();
        const chainIdHex = await Moralis.switchNetwork("0x61"); 
    });
}

async function returnToken(){
    const amountToReturn = document.getElementById("amountToken").value;
    const options = {type: "erc20", 
                 amount: Moralis.Units.Token(amountToReturn, "18"), 
                 receiver: sideBridgeAddress,
                 contractAddress: childTokenAddress}
    let result = await Moralis.transfer(options)
}

async function renderReturnData () {
    queryReturned().then( (returnedData) => {
        buildTableReturned(returnedData);
    });
    queryUnlocked().then( (unlockedData) => {
        buildTableUnlocked(unlockedData);
    });
}

async function subscribeUpdateUnlocked(){
    let query = new Moralis.Query("TokensUnlocked");
    query.equalTo("requester", ethereum.selectedAddress);
    const subscriptionUnlocked = await query.subscribe();
    subscriptionUnlocked.on('create', async (object) => {
        const depositHash= JSON.parse(JSON.stringify(object,["sideDepositHash"])).sideDepositHash;
        window.alert("Token returned with origin in " + depositHash);
    });
}

async function queryReturned(){
    const query = new Moralis.Query("TokensReturned");
    query.equalTo("requester", ethereum.selectedAddress);
    const results = await query.find()
    return JSON.parse(JSON.stringify(results, ["sideDepositHash", "amount", "requester"]))
}

async function queryUnlocked(){
    const query = new Moralis.Query("TokensUnlocked");
    query.equalTo("requester", ethereum.selectedAddress);
    const results = await query.find()
    return JSON.parse(JSON.stringify(results, ["sideDepositHash", "amount", "requester"]))
}

function buildTableReturned(data){
    document.getElementById("returnedTransactions").innerHTML = `<table class="table table-dark table-striped" id="returnedTable">
                                                            </table>`;
    const table = document.getElementById("returnedTable");
    const rowHeader = `<thead>
                            <tr>
                                <th>Side Deposit Hash</th>
                                <th>Amount Bridged</th>
                                <th>Requester</th>
                            </tr>
                        </thead>`
    table.innerHTML += rowHeader;
    for (let i=0; i < data.length; i++){
        let row = `<tr>
                        <td>${data[i].sideDepositHash}</td>
                        <td>${data[i].amount/1e18}</td>
                        <td>${data[i].requester}</td>
                    </tr>`
        table.innerHTML += row
    }
}

function buildTableUnlocked(data){
    document.getElementById("tokensUnlocked").innerHTML = `<table class="table table-dark table-striped" id="unlockedTable">
                                                            </table>`;
    const table = document.getElementById("unlockedTable");
    const rowHeader = `<thead>
                            <tr>
                                <th>Side Deposit Hash</th>
                                <th>Amount Bridged</th>
                                <th>Requester</th>
                            </tr>
                        </thead>`
    table.innerHTML += rowHeader;
    for (let i=0; i < data.length; i++){
        let row = `<tr>
                        <td>${data[i].sideDepositHash}</td>
                        <td>${data[i].amount/1e18}</td>
                        <td>${data[i].requester}</td>
                    </tr>`
        table.innerHTML += row
    }
}
