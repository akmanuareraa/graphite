// import React, { useEffect } from 'react';
// import { useMoralis, useWeb3Transfer, useMoralisSubscription, useChain } from "react-moralis";
// import { ErrorMessage } from 'formik';

// import Crosschainbridge from '../plasmicComponents/Crosschainbridge.jsx'

// function CrossChainBridge(props) {

//     const mainTokenAddress = "0xcd95fCe102973Fe8f9F6a0092D135F8D057ce18D";
//     const mainBridgeAddress = "0x27bd520f7e4e9040bd8a445456349d3eabf8f878";
//     const childTokenAddress = "0x9f4ea54de714efcfec6f3c01c265007c13e15afa";
//     const sideBridgeAddress = "0x2Af4906A745884744156aF4471e3bb3785f59f9D";

//     const { Moralis, web3, enableWeb3, isWeb3Enabled, isWeb3EnableLoading, web3EnableError } = useMoralis()
//     const { switchNetwork, chainId, chain, account } = useChain();

//     const BridgeDepositEvent = () => {
//         useMoralisSubscription("TokensBridged", q => q, [], {
//             onCreate: data => alert(`Token Bridged with origin in ${data.attributes.mainDepositHash}`),
//         });
//     }

//     const BridgeWithdrawEvent = () => {
//         useMoralisSubscription("TokensUnlocked", q => q, [], {
//             onCreate: data => alert(`Token Unlocked with origin in ${data.attributes.mainDepositHash}`),
//         });
//     }

//     const EnableWeb3 = () => {
//         if (isWeb3Enabled) {
//             return null
//         }
//         return (
//             <div>
//                 {web3EnableError && <ErrorMessage error={web3EnableError} />}
//             </div>
//         )
//     }

//     const handleChange = e => {
//         console.log(e.target.value)
//         props.setMainState(prevState => {
//             return {
//                 ...prevState,
//                 crosschainbridge: {
//                     ...prevState.crosschainbridge,
//                     tokenamount: e.target.value
//                 }
//             }
//         })
//     }

//     const Deposit = (amount) => {
//         const { fetch, error, isFetching } = useWeb3Transfer({
//             amount: Moralis.Units.Token(amount, 18),
//             receiver: mainBridgeAddress,
//             type: "erc20",
//             contractAddress: mainTokenAddress,
//         });
//         fetch()
//         props.setAllUiStates(prevState => {
//             return {
//                 ...prevState,
//                 crosschainbridge: {
//                     ...prevState.crosschainbridge,
//                     fetchstatus: isFetching
//                 }
//             }
//         })
//         if (error) { console.log(error) }
//         // return (<div>
//         //     {error && <ErrorMessage error={error} />}
//         //     <button onClick={() => fetch()} disabled={isFetching}>Transfer to BSC</button>
//         // </div>)
//     }

//     const Withdraw = (amount) => {
//         const { fetch, error, isFetching } = useWeb3Transfer({
//             amount: Moralis.Units.Token(amount, 18),
//             receiver: sideBridgeAddress,
//             type: "erc20",
//             contractAddress: childTokenAddress,
//         });
//         fetch()
//         props.setAllUiStates(prevState => {
//             return {
//                 ...prevState,
//                 crosschainbridge: {
//                     ...prevState.crosschainbridge,
//                     fetchstatus: isFetching
//                 }
//             }
//         })
//         if (error) { console.log(error) }
//         // return (<div>
//         //     {error && <ErrorMessage error={error} />}
//         //     <button onClick={() => fetch()} disabled={isFetching}>Transfer to Polygon</button>
//         // </div>)
//     }

//     // component that solely manages the UI
//     const dashboardrenderer = () => {
//         return (
//             <>
//                 <Crosschainbridge

//                     onChange={handleChange}

//                     crossbridgestack={{
//                         metamaskstate: props.allUiStates.crosschainbridge.metamaskstate
//                     }}

//                     // metamaskbutton={{
//                     //     mainbutton: {
//                     //         onClick: () => {alert("Clicked")}
//                     //     },
//                     //     disabled: { isWeb3EnableLoading }
//                     // }}

//                     // mainbutton={{
//                     //     onClick: () => {alert("Clicked")}
//                     // }}

//                     // fullbridgeverticalstack={{
//                     //     metamaskbutton: {
//                     //         mainbutton: {
//                     //             onClick: () => {
//                     //                 console.log(2222)
//                     //             }
//                     //         }
//                     //     }
//                     // }}

//                     mmbutton={{
//                         onClick: () => {alert("Clciked")}
//                     }}

//                     errordisplay={<EnableWeb3 />}

//                     switchtab={{
//                         deposit: props.allUiStates.crosschainbridge.deposittab,
//                         withdraw: props.allUiStates.crosschainbridge.withdrawtab,
//                         deposittab: {
//                             onClick: () => {
//                                 // on changing tabs, also change the UI states
//                                 props.setAllUiStates(prevState => {
//                                     return {
//                                         ...prevState,
//                                         crosschainbridge: {
//                                             ...prevState.crosschainbridge,
//                                             deposittab: true,
//                                             withdrawtab: false,
//                                             depositdashboard: true,
//                                             withdrawdashboard: false,
//                                             depositbutton: true,
//                                             withdrawbutton: false
//                                         }
//                                     }
//                                 })
//                             }
//                         },
//                         withdrawtab: {
//                             onClick: () => {
//                                 // on changing tabs, also change the UI states
//                                 props.setAllUiStates(prevState => {
//                                     return {
//                                         ...prevState,
//                                         crosschainbridge: {
//                                             ...prevState.crosschainbridge,
//                                             deposittab: false,
//                                             withdrawtab: true,
//                                             depositdashboard: false,
//                                             withdrawdashboard: true,
//                                             depositbutton: false,
//                                             withdrawbutton: true
//                                         }
//                                     }
//                                 })
//                             }
//                         }
//                     }}

//                     bridgedashboard={{
//                         deposit: props.allUiStates.crosschainbridge.depositdashboard,
//                         withdraw: props.allUiStates.crosschainbridge.withdrawdashboard
//                     }}

//                     transferbutton={{
//                         deposit: props.allUiStates.crosschainbridge.depositbutton,
//                         withdraw: props.allUiStates.crosschainbridge.withdrawbutton,
//                         onClick: () => {
//                             // if the current active state of button is withdraw
//                             if (props.allUiStates.crosschainbridge.withdrawbutton) {
//                                 // execute withdraw function
//                                 Withdraw(props.mainState.crosschainbridge.tokenamount)
//                                 // if the current active state of button is deposit    
//                             } else if (props.allUiStates.crosschainbridge.depositbutton) {
//                                 // execute deposit function
//                                 Deposit(props.mainState.crosschainbridge.tokenamount)
//                             }
//                         }
//                     }}
//                 />
//             </>
//         )
//     }

//     useEffect(() => {
//         // changing the navbar state
//         props.setAllUiStates(prevState => {
//             return {
//                 ...prevState,
//                 navbar: {
//                     verifyid: false,
//                     bridge: true
//                 }
//             }
//         })
//         console.log('web3', isWeb3Enabled)

//         if (!isWeb3Enabled) {
//             //return <EnableWeb3 />;
//             console.log(1)
//             props.setAllUiStates(prevState => {
//                 return {
//                     ...prevState,
//                     crosschainbridge: {
//                         ...prevState.crosschainbridge,
//                         metamaskstate: true
//                     }
//                 }
//             })
//         }
//         else {
//             console.log(2)
//             BridgeDepositEvent();
//             BridgeWithdrawEvent();

//             let amount = 1;
//             props.setAllUiStates(prevState => {
//                 return {
//                     ...prevState,
//                     crosschainbridge: {
//                         ...prevState.crosschainbridge,
//                         metamaskstate: false
//                     }
//                 }
//             })
//             // return (<div>

//             //     <Deposit amount={amount}
//             //         Moralis={Moralis} />
//             //     <Withdraw amount={amount}
//             //         Moralis={Moralis} />;
//             // </div>)


//         }

//     }, [])

//     // whenever user changes the tab, reset the tokenamount in the state
//     useEffect(() => {
//         props.setMainState(prevState => {
//             return {
//                 ...prevState,
//                 crosschainbridge: {
//                     tokenamount: ''
//                 }
//             }
//         })
//     }, [props.allUiStates.crosschainbridge.depositselected])

//     return (
//         <div className="columns is-centered">
//             {dashboardrenderer()}
//         </div>
//     );
// }

// export default CrossChainBridge;