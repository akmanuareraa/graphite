import React, {useState} from 'react';
import Web3 from 'web3';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Nav from './components/reactComponents/Nav';
import PrefilledForm from './components/reactComponents/PrefilledForm';

function App() {

  // a main state to handle data flows between parent-child components
  const [mainState, setMainState] = useState(() => {
    return {
      account: null
    }
  })

  // function to update the mainstate
  // todo: tweak the function so that it accepts and key:value pair and store it to the main state
  const updateMainState=(address) => {
    setMainState({
      account: address
    })
  }

  return (
    <>
        <Nav
            mainStateData={mainState}
        />
        <PrefilledForm 
            updateMainState={updateMainState}
        />
    </>
  );
}

export default App;
