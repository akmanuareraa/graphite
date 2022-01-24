import React, { useState } from 'react';
import Web3 from 'web3';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import config from './config-frontend'
import Nav from './components/reactComponents/Nav';
import PrefilledForm from './components/reactComponents/PrefilledForm';
import GenerateSalesOrder from './components/reactComponents/GenerateSalesOrder';
import ConfirmSalesOrder from './components/reactComponents/ConfirmSalesOrder';
import VerifyEstId from './components/reactComponents/VerifyEstId';
import InvoiceGeneration from './components/reactComponents/InvoiceGeneration';
import InvoiceConfirmation from './components/reactComponents/InvoiceConfirmation';
import LogisticsGeneration from './components/reactComponents/LogisticsGeneration';
import LogisticsConfirmation from './components/reactComponents/LogisticsConfirmation';
//import CrossChainBridge from './components/reactComponents/CrossChainBridge';
import Homepage from './components/reactComponents/Homepage';

function App() {

  

  // a main state to handle data flows between parent-child components
  const [mainState, setMainState] = useState(() => {
    return {
      account: null,
      web3: new Web3(window.ethereum),

      createAsset: {
        txnHash: null,
        rNo: "---",
        pDate: "---",
        referenceId: null,
        timer: null
      },

      generateSalesOrder: {},
      confirmSalesOrder: {
        dataLoaded: false
      },
      generateinvoice: {
        txnHash: null,
      },
      confirminvoice: {
        txnHash: null,
      },
      generatelogistics: {
        txnHash: null,
      },
      confirmlogistics: {
        txnHash: null,
      },
      verifyestid: {
        tokenNo: ""
      },
      crosschainbridge: {
        tokenamount: '',
      }
    }
  })

  // state to handle url parameters of all components
  const [allUrlParams, setAllUrlParams] = useState(() => {
    return {
      createAsset: {
        appfeeq: 0,
        iksfeeq: 0,
        taxq: 0,
        appfeecu: 0,
        iksfeecu: 0,
        taxcu: 0
      },
      verifyestid: {
        docno:null
      },
      generateSalesOrder: {
        pono: null
      },
      confirmSalesOrder: {
        pono: null
      },
      generateinvoice: {
        invoiceno: null
      },
      confirminvoice: {
        invoiceno: null
      },
      generatelogistics: {
        cha: null
      },
      confirmlogistics: {
        cha: null
      }
    }
  })

  // state to handle url parameters of all components
  const [allUiStates, setAllUiStates] = useState(() => {
    return {
      navbar: {
        verifyid: false,
        bridge: false,
        walletdisconnect: true,
        walletconnect: false
      },
      createAsset: {
        walletStateDis: true,
        walletStateCon: false,
        installmm: false,
        connectmm: true,
        sendtxn: false,
        sendtxnconsent: false,
        processing: false,
        txnsuccess: false,
        txnfailed: false,
        tickboxState: false,
        transaction: "null",
        application: true,
        applicant: false,
        organization: false,
        applicationtab: true,
        applicanttab: false,
        orgtab: false
      },
      generateSalesOrder: {
        walletStateDis: true,
        walletStateCon: false,
        installmm: false,
        connectmm: true,
        processing: false,
        txnsuccess: false,
        txnfailed: false,
        salesorder: false,
        sendtxnso: false,
        sendtxnconsentso: false,
      },
      confirmSalesOrder: {
        dashboard: true,
        tickboxState: false,
        walletStateDis: true,
        walletStateCon: false,
        installmm: false,
        connectmm: true,
        sendtxn: false,
        processing: false,
        txnsuccess: false,
        txnfailed: false,
        sendtxnconsentso: false,
        sendtxnso: false
      },
      generateinvoice: {
        walletStateDis: true,
        walletStateCon: false,
        installmm: false,
        connectmm: true,
        processing: false,
        txnsuccess: false,
        txnfailed: false,
        invoice: false,
        sendtxninv: false,
        sendtxnconsentinv: false,
      },
      confirminvoice: {
        tickboxState: false,
        walletStateDis: true,
        walletStateCon: false,
        installmm: false,
        connectmm: true,
        sendtxn: false,
        processing: false,
        txnsuccess: false,
        txnfailed: false,
        invoice: false,
        sendtxnconsentinv: false,
        sendtxninv: false
      },
      generatelogistics: {
        walletStateDis: true,
        walletStateCon: false,
        installmm: false,
        connectmm: true,
        processing: false,
        txnsuccess: false,
        txnfailed: false,
        logistics: false,
        sendtxnlog: false,
        sendtxnconsentlog: false,
      },
      confirmlogistics: {
        tickboxState: false,
        walletStateDis: true,
        walletStateCon: false,
        installmm: false,
        connectmm: true,
        sendtxn: false,
        processing: false,
        txnsuccess: false,
        txnfailed: false,
        logistics: false,
        sendtxnconsentlog: false,
        sendtxnlog: false
      },
      verifyestid: {
        displayId: false
      },
      crosschainbridge: {
        deposittab: true,
        withdrawtab: false,
        depositdashboard: true,
        withdrawdashboard: false,
        depositbutton: true,
        withdrawbutton: false,
        metamaskstate: true
      }
    }
  })

  // function to parse parameters from URL
  const urlParser = (pageName) => {

    // url parsing
    var params = {};

    var parser = document.createElement('a');
    parser.href = window.location.href;
    var query = parser.search.substring(1);

    var vars = query.split('&');
    for (var i = 0; i < vars.length; i++) {
      var pair = vars[i].split('=');
      params[pair[0]] = decodeURIComponent(pair[1]);
    }

    // pre calculation - only applicable for id asset creation
    if (pageName === "createAsset") {
      params["appfeect"] = parseFloat(params.appfeeq * params.appfeecu)
      params["iksfeect"] = parseFloat(params.iksfeeq * params.iksfeecu)
      params["taxct"] = parseFloat(params.taxq * params.taxcu)
      params["totalcharge"] = params.appfeect + params.iksfeect + params.taxct
    }

    // updating the state
    setAllUrlParams(prevState => {
      return {
        ...prevState,
        [pageName]: {
          ...prevState[pageName],
          ...params
        }
      }
    })
  }

  // function to handle Metamask related operations
  const setupMetamask = async (pageName) => {

    // check if web3 is injected
    if (typeof window.ethereum !== 'undefined') {

      // get the user account
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });

      //update app state
      setMainState(prevState => {
        return {
          ...prevState,
          account: accounts[0]
        }
      })

      setAllUiStates(prevState => {
        return {
          ...prevState,
          navbar: {
            ...prevState.navbar,
            walletdisconnect: false,
            walletconnect: true
          }
        }
      })

      // Switching current chain to Mumbai Testnet 
      // assuming that the user has already added the Mumbai Testnet chain to Metamask
      try {
        await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: '0x13881' }],
        })

        //console.log(window.ethereum.networkVersion)
        if (window.ethereum.networkVersion === "80001") {

          //changing the UI state depending upon the component
          if (pageName === "createAsset") {
            setAllUiStates(prevState => {

              //changing the UI state depending upon the consent received from the user
              if (allUrlParams.createAsset.consent) {
                return {
                  ...prevState,
                  createAsset: {
                    ...prevState.createAsset,
                    connectmm: false,
                    sendtxn: true,
                    walletStateDis: false,
                    walletStateCon: true
                  }
                }
              } else {
                return {
                  ...prevState,
                  createAsset: {
                    ...prevState.createAsset,
                    connectmm: false,
                    sendtxnconsent: true,
                    walletStateDis: false,
                    walletStateCon: true
                  }
                }
              }
            })
          } else if (pageName === "generateSalesOrder") {
            setAllUiStates(prevState => {
              return {
                ...prevState,
                generateSalesOrder: {
                  ...prevState.generateSalesOrder,
                  connectmm: false,
                  salesorder: true,
                  walletStateDis: false,
                  walletStateCon: true
                }
              }
            })
          } else if (pageName === "confirmSalesOrder") {

            //changing the UI state depending upon the consent received from the user
            if (allUiStates.confirmSalesOrder.tickboxState) {
              setAllUiStates(prevState => {
                return {
                  ...prevState,
                  confirmSalesOrder: {
                    ...prevState.confirmSalesOrder,
                    connectmm: false,
                    sendtxnso: true,
                    walletStateDis: false,
                    walletStateCon: true
                  }
                }
              })
            } else {
              setAllUiStates(prevState => {
                return {
                  ...prevState,
                  confirmSalesOrder: {
                    ...prevState.confirmSalesOrder,
                    connectmm: false,
                    sendtxnconsentso: true,
                    walletStateDis: false,
                    walletStateCon: true
                  }
                }
              })
            }
          } else if (pageName === "generateinvoice") {
            console.log('Inside Gen Invoice')
            setAllUiStates(prevState => {
              return {
                ...prevState,
                generateinvoice: {
                  ...prevState.generateinvoice,
                  connectmm: false,
                  invoice: true,
                  walletStateDis: false,
                  walletStateCon: true
                }
              }
            })
          } else if (pageName === "confirminvoice") {

            //changing the UI state depending upon the consent received from the user
            if (allUiStates.confirminvoice.tickboxState) {
              setAllUiStates(prevState => {
                return {
                  ...prevState,
                  confirminvoice: {
                    ...prevState.confirminvoice,
                    connectmm: false,
                    sendtxninv: true,
                    walletStateDis: false,
                    walletStateCon: true
                  }
                }
              })
            } else {
              setAllUiStates(prevState => {
                return {
                  ...prevState,
                  confirminvoice: {
                    ...prevState.confirminvoice,
                    connectmm: false,
                    sendtxnconsentinv: true,
                    walletStateDis: false,
                    walletStateCon: true
                  }
                }
              })
            }
          } else if (pageName === "generatelogistics") {
            console.log('UI STATE:', allUiStates.generatelogistics)
            setAllUiStates(prevState => {
              return {
                ...prevState,
                generatelogistics: {
                  ...prevState.generatelogistics,
                  connectmm: false,
                  logistics: true,
                  walletStateDis: false,
                  walletStateCon: true
                }
              }
            })
          } else if (pageName === "confirmlogistics") {

            //changing the UI state depending upon the consent received from the user
            if (allUiStates.confirmlogistics.tickboxState) {
              setAllUiStates(prevState => {
                return {
                  ...prevState,
                  confirmlogistics: {
                    ...prevState.confirmlogistics,
                    connectmm: false,
                    sendtxnlog: true,
                    walletStateDis: false,
                    walletStateCon: true
                  }
                }
              })
            } else {
              setAllUiStates(prevState => {
                return {
                  ...prevState,
                  confirmlogistics: {
                    ...prevState.confirmlogistics,
                    connectmm: false,
                    sendtxnconsentlog: true,
                    walletStateDis: false,
                    walletStateCon: true
                  }
                }
              })
            }
          }
        }

      } catch (switchError) {
        console.log("Mumbai Testnet not added to Metamask. Attempting to add chain to Metamask...")
        try {

          // if the user has not added the chain already
          // add now
          await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [{ chainId: '0x13881', rpcUrls: ['https://rpc-mumbai.maticvigil.com/'], chainName: 'Polygon Mumbai Testnet' /* ... */ }],
          })

          //console.log(window.ethereum.networkVersion)
          if (window.ethereum.networkVersion === "80001") {
            if (pageName === "createAsset") {
              setAllUiStates(prevState => {
                if (allUrlParams.createAsset.consent) {
                  return {
                    ...prevState,
                    createAsset: {
                      ...prevState.createAsset,
                      connectmm: false,
                      sendtxn: true,
                      walletStateDis: false,
                      walletStateCon: true
                    }
                  }
                } else {
                  return {
                    ...prevState,
                    createAsset: {
                      connectmm: false,
                      sendtxnconsent: true,
                      walletStateDis: false,
                      walletStateCon: true
                    }
                  }
                }
              })
            } else if (pageName === "generateSalesOrder") {
              setAllUiStates(prevState => {
                return {
                  ...prevState,
                  generateSalesOrder: {
                    ...prevState.generateSalesOrder,
                    connectmm: false,
                    salesorder: true,
                    walletStateDis: false,
                    walletStateCon: true
                  }
                }
              })
            } else if (pageName === "confirmSalesOrder") {
              setAllUiStates(prevState => {
                return {
                  ...prevState,
                  confirmSalesOrder: {
                    ...prevState.confirmSalesOrder,
                    connectmm: false,
                    sendtxnconsentso: true,
                    walletStateDis: false,
                    walletStateCon: true
                  }
                }
              })
            } else if (pageName === "generateinvoice") {
              console.log('Inside Gen Invoice')
              setAllUiStates(prevState => {
                return {
                  ...prevState,
                  generateinvoice: {
                    ...prevState.generateinvoice,
                    connectmm: false,
                    invoice: true,
                    walletStateDis: false,
                    walletStateCon: true
                  }
                }
              })
            } else if (pageName === "confirminvoice") {

              //changing the UI state depending upon the consent received from the user
              if (allUiStates.confirminvoice.tickboxState) {
                setAllUiStates(prevState => {
                  return {
                    ...prevState,
                    confirminvoice: {
                      ...prevState.confirminvoice,
                      connectmm: false,
                      sendtxninv: true,
                      walletStateDis: false,
                      walletStateCon: true
                    }
                  }
                })
              } else {
                setAllUiStates(prevState => {
                  return {
                    ...prevState,
                    confirminvoice: {
                      ...prevState.confirminvoice,
                      connectmm: false,
                      sendtxnconsentinv: true,
                      walletStateDis: false,
                      walletStateCon: true
                    }
                  }
                })
              }
            } else if (pageName === "generatelogistics") {
              console.log('UI STATE:', allUiStates.generatelogistics)
              setAllUiStates(prevState => {
                return {
                  ...prevState,
                  generatelogistics: {
                    ...prevState.generatelogistics,
                    connectmm: false,
                    logistics: true,
                    walletStateDis: false,
                    walletStateCon: true
                  }
                }
              })
            } else if (pageName === "confirmlogistics") {

              //changing the UI state depending upon the consent received from the user
              if (allUiStates.confirmlogistics.tickboxState) {
                setAllUiStates(prevState => {
                  return {
                    ...prevState,
                    confirmlogistics: {
                      ...prevState.confirmlogistics,
                      connectmm: false,
                      sendtxnlog: true,
                      walletStateDis: false,
                      walletStateCon: true
                    }
                  }
                })
              } else {
                setAllUiStates(prevState => {
                  return {
                    ...prevState,
                    confirmlogistics: {
                      ...prevState.confirmlogistics,
                      connectmm: false,
                      sendtxnconsentlog: true,
                      walletStateDis: false,
                      walletStateCon: true
                    }
                  }
                })
              }
            }
          }

          // if any error is caught, user gets redirected back to the portal along with the error message
        } catch (addError) {
          console.log("Error occured in Adding Mumbai Testnet Network to Metamask")
          alert("Error occured in Adding Mumbai Testnet Network to Metamask. Please contact Administrator. Redirecting back to portal...")
          let additionalParams = '&status=failed&reason=' + addError
          window.location.href = config.redirectUrl + additionalParams
        }
      }
    } else {
      alert("Please install Metamask to proceed")
    }
  }

  // A modified function for using settimeout which can display the seconds for redirection
  let getTimeout = (() => { // IIFE
    let _setTimeout = setTimeout, // Reference to the original setTimeout
      map = {}; // Map of all timeouts with their end times

    setTimeout = (callback, delay) => { // Modify setTimeout
      let id = _setTimeout(callback, delay); // Run the original, and store the id
      map[id] = Date.now() + delay; // Store the end time
      return id; // Return the id
    };

    return (id) => { // The actual getTimeout function
      // If there was no timeout with that id, return NaN, otherwise, return the time left clamped to 0
      return map[id] ? Math.max(map[id] - Date.now(), 0) : NaN;
    }
  })();

  // function that executes redirection after successfull/failed events
  let redirectExecution = ((paramsToSend, additionalParams, timePeriod, displayInterval, component) => {

    // URL parameters to send back
    let urlParamsToSend = "";
    for (const [key, value] of Object.entries(paramsToSend)) {
      urlParamsToSend = urlParamsToSend + key.toString() + "=" + value.toString() + "&"
    }

    // redirection in timePeriod secs
    let redirectTimeout = setTimeout(() => {
      window.location.href = config.redirectUrl + urlParamsToSend + additionalParams
    }, timePeriod);

    // display the time left until the redirect
    setInterval(() => {
      setMainState(prevState => {
        return {
          ...prevState,
          [component]: {
            ...prevState[component],
            timer: (getTimeout(redirectTimeout) / 1000).toString().slice(0, 1)
          }
        }
      })
      console.log(getTimeout(redirectTimeout))
    }, displayInterval);
  })


  return (
    <>
      <BrowserRouter>
        <Nav
          mainState={mainState}
          allUiStates={allUiStates}
        />
        <Routes>

          <Route path="/" element={<Homepage />} />

          <Route path="/createNewAsset/:params" element={<PrefilledForm
            mainState={mainState}
            setMainState={setMainState}
            allUiStates={allUiStates}
            setAllUiStates={setAllUiStates}
            allUrlParams={allUrlParams}
            setAllUrlParams={setAllUrlParams}
            setupMetamask={setupMetamask}
            urlParser={urlParser}
            getTimeout={getTimeout}
            redirectExecution={redirectExecution}
          />} />

          <Route path="/generateSalesOrder/:params" element={<GenerateSalesOrder
            mainState={mainState}
            setMainState={setMainState}
            allUiStates={allUiStates}
            setAllUiStates={setAllUiStates}
            allUrlParams={allUrlParams}
            setAllUrlParams={setAllUrlParams}
            setupMetamask={setupMetamask}
            urlParser={urlParser}
            getTimeout={getTimeout}
            redirectExecution={redirectExecution}
          />} />

          <Route path="/confirmSalesOrder/:params" element={<ConfirmSalesOrder
            mainState={mainState}
            setMainState={setMainState}
            allUiStates={allUiStates}
            setAllUiStates={setAllUiStates}
            allUrlParams={allUrlParams}
            setAllUrlParams={setAllUrlParams}
            setupMetamask={setupMetamask}
            urlParser={urlParser}
            getTimeout={getTimeout}
            redirectExecution={redirectExecution}
          />} />

          <Route path="/generateInvoice/:params" element={<InvoiceGeneration
            mainState={mainState}
            setMainState={setMainState}
            allUiStates={allUiStates}
            setAllUiStates={setAllUiStates}
            allUrlParams={allUrlParams}
            setAllUrlParams={setAllUrlParams}
            setupMetamask={setupMetamask}
            urlParser={urlParser}
            getTimeout={getTimeout}
            redirectExecution={redirectExecution}
          />} />

          <Route path="/confirmInvoice/:params" element={<InvoiceConfirmation
            mainState={mainState}
            setMainState={setMainState}
            allUiStates={allUiStates}
            setAllUiStates={setAllUiStates}
            allUrlParams={allUrlParams}
            setAllUrlParams={setAllUrlParams}
            setupMetamask={setupMetamask}
            urlParser={urlParser}
            getTimeout={getTimeout}
            redirectExecution={redirectExecution}
          />} />

          <Route path="/generateLogistics/:params" element={<LogisticsGeneration
            mainState={mainState}
            setMainState={setMainState}
            allUiStates={allUiStates}
            setAllUiStates={setAllUiStates}
            allUrlParams={allUrlParams}
            setAllUrlParams={setAllUrlParams}
            setupMetamask={setupMetamask}
            urlParser={urlParser}
            getTimeout={getTimeout}
            redirectExecution={redirectExecution}
          />} />

          <Route path="/confirmLogistics/:params" element={<LogisticsConfirmation
            mainState={mainState}
            setMainState={setMainState}
            allUiStates={allUiStates}
            setAllUiStates={setAllUiStates}
            allUrlParams={allUrlParams}
            setAllUrlParams={setAllUrlParams}
            setupMetamask={setupMetamask}
            urlParser={urlParser}
            getTimeout={getTimeout}
            redirectExecution={redirectExecution}
          />} />

          <Route path="/verifyid/:docno" element={<VerifyEstId
            mainState={mainState}
            setMainState={setMainState}
            allUiStates={allUiStates}
            setAllUiStates={setAllUiStates}
            allUrlParams={allUrlParams}
            setAllUrlParams={setAllUrlParams}
            setupMetamask={setupMetamask}
          />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
