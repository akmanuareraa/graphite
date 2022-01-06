import React from 'react';

import NavBar from '../plasmicComponents/NavBar';

function Nav({mainStateData}) {

    return (
        <div className="columns is-centered">
            <NavBar
                navbarbuttons={{
                    newasset: true
                }}
                walletbar={{
                  address: mainStateData["account"] 
                }}
            />
        </div>
    );
}

export default Nav;