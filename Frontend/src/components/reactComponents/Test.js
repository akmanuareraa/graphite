import React from 'react';
import { useParams } from "react-router-dom";


function Test(props) {

    const {salesId} = useParams();

    return (
        <div>
            HELLO
            SALES ID: {salesId}
        </div>
    );
}

export default Test;