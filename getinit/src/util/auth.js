import {Navigate} from "react-router-dom";
import React from "react";

export function getAuthToken() {
    return localStorage.getItem('token');
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