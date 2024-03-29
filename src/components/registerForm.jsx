import React from 'react';
import  Joi  from 'joi-browser';
import Form from './common/form';
import auth from "../services/authService";
import * as userService from "../services/userService";
class RegisterForm extends Form {
    state = { data : {username:"",password:"",name:""}, errors:{} };
    schema ={
        username : Joi.string().required().email().label("Username"),
        password : Joi.string().required().min(5).label("Password"),
        name:Joi.string().required().label("Name")
    };
    doSubmit = async ()=>{
        try{
            const response= await userService.Register(this.state.data);
            auth.loginwithJwt(response.headers["x-auth-token"]);
            window.location="/";
        }
        catch (ex){
            if(ex.response && ex.response.status===400){
                const errors={...this.state.errors};
                errors.username=this.state.data;
                this.setState({errors});
            }
        }
        
    };

    render() { 
        return ( <div className="container mt-5" style={{ maxWidth: "35vw" }}>
            <h1 className="mb-5 font-weight-bolder" style={{ textAlign: "center" }}>Register</h1>
            <form onSubmit={this.hanldeSubmit}>
                {this.renderInput("username","Username")}
                {this.renderInput("password","Password","password")}
                {this.renderInput("name","Name")}
                {this.renderButton("Register")}
                </form>
        </div> );
    }
}
 
export default RegisterForm;