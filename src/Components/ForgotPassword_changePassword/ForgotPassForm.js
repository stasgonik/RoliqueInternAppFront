import React, {Component} from 'react';
import './forgotPassForm.css'
import configFront from "../../Constants/config";
import userService from "../../Services/userService";


class ForgotPassForm extends Component {

    state = {
        fields: {
            password: '',
            confirmPassword: ''
        },
        errors: {
            password: '',
            confirmPassword: ''
        },
        type: 'input',
        token: ''
    };

    constructor(props) {
        super(props);
        const search = props.location.search;
        const params = new URLSearchParams(search);
        const token = params.get('token');
        if (!token) {
            window.location.href = configFront.URL + 'login/';
        }
        this.setState({token})
        this.showHide = this.showHide.bind(this);
    }

    showHide(e) {
        e.preventDefault();
        e.stopPropagation();
        this.setState({
            type: this.state.type === "input" ? "password" : "input"
        });
    }

    myForm = React.createRef();

    handleValidation(){
        const fields = this.state.fields;
        let errors = {};
        let formIsValid = true;

        if(typeof fields["password"] !== "undefined"){
            if (!fields["password"].match(/^(?=.*[A-Za-z])(?=.*\d)([A-Za-z\d@$!%*#?&]?){4,50}$/)) {
                formIsValid = false;
                errors["password"] = "Password is not valid";
            }
        }

        if(fields["confirmPassword"] !== fields["password"]){
            formIsValid = false;
            errors["confirmPassword"] = "Passwords must be the same";
        }

        if(!fields["password"]){
            formIsValid = false;
            errors["password"] = "Cannot be empty";
        }

        if(!fields["confirmPassword"]){
            formIsValid = false;
            errors["confirmPassword"] = "Cannot be empty";
        }

        this.setState({ errors });
        return formIsValid;
    }

    send = async (e) => {
        e.preventDefault();
        try {
            const search = this.props.location.search;
            const params = new URLSearchParams(search);
            const token = params.get('token');
            if (!token) {
                window.location.href = configFront.URL + 'login/';
            }
            const body = { password: this.state.fields['password'], forgot_token: token}
            console.log(body)

            if(this.handleValidation()){
               const result = await userService.changePassword(body);
               console.log(result)
               window.location.href = configFront.URL + 'login/';
            }

        } catch (e) {
            console.log(e);
        }
    };


    handleChange(field, e){
        e.preventDefault();
        let fields = this.state.fields;
        fields[field] = e.target.value;
        this.setState({fields});
    }

    render() {
        return (
            <div className={'main-flex-login'}>
                <form className={'login-form'} onSubmit={this.send} ref={this.myForm}>

                    <h3 className={'login-form-h3'}>We need your email to change your password</h3>

                    <div>
                        <span className="password__show" onClick={this.showHide}>
                            {this.state.type === "input" ? "Hide Password" : "Show Password"}
                        </span>
                        <span className={'login-form-spam'}>Password</span>
                    </div>

                    <input id={'in1'} className={'password__input'} required={true}
                           type={this.state.type}
                           onChange={this.handleChange.bind(this, "password")}
                           value={this.state.fields["password"]}/>

                    <span  className='login-form-spam red'>{this.state.errors["password"]}</span>

                    <span className={'login-form-spam'}>Confirm Password</span>

                    <input id={'in2'} className={'password__input'} required={true}
                           type={this.state.type}
                           onChange={this.handleChange.bind(this, "confirmPassword")}
                           value={this.state.fields["confirmPassword"]}/>

                    <span  className='login-form-spam red'>{this.state.errors["confirmPassword"]}</span>

                    <div className="wrap">
                        <button className="button">Send</button>
                    </div>
                </form>
            </div>
        );
    }
}

export default ForgotPassForm;
