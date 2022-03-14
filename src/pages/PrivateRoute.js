import React from 'react';
import {Navigate, useLocation} from "react-router-dom";
import CheckJwtToken from "../components/lib/CheckJwtToken";

function PrivateRoute({children}) {
    const {CheckToken} = CheckJwtToken()
    const location = useLocation()
    
    if(CheckToken()){
        return children;
    }else{
        return <Navigate to="/sign-in" state={{from:location}}/>
    }
};

export default PrivateRoute
