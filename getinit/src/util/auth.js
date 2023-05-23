import {Navigate} from "react-router-dom";
import React from "react";

export function getAuthToken() {
    const token = localStorage.getItem('token');
    return token;
}

export function tokenLoader() {
    return getAuthToken();
}

export default function PrivateRoute({ children }) {

    const token = getAuthToken();
    if(!token) {
        return <Navigate to='/auth'/>
    }

    return children;
}

export function TokenRoute({ children }) {

    const token = getAuthToken();
    if(token) {
        return <Navigate to='/companyPanel'/>
    }

    return children;
}