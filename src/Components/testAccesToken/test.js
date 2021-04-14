import React, {Component} from 'react';
import authService from '../../Services/auth.service';
import userService from '../../Services/userService';

class Test extends Component {

    state ={ users: [] }

componentDidMount() {
    userService.getUsers().then(value => this.setState({ users: value }))
}


    render() {
        let { users } = this.state;
        console.log(users)
        return (
            <div>
                HELLO
            </div>
        );
    }
}

export default Test;
