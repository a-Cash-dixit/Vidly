import React, { Component } from 'react';
import auth from "../services/authService";
class LogOut extends Component {
    componentDidMount(){
        auth.Logout();
        window.location="/";
    }

    render() { 
        return ( null );
    }
}
 
export default LogOut;