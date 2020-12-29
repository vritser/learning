import React, { Component, PropTypes } from 'react';
import ws from './client';
import { v4 } from 'node-uuid';
import { login, register } from '../actions/action_user'
import { connect } from 'react-redux';

class Login extends Component {
    constructor(props) {
        super(props);
        // this.refs.phone.value = '13303007025';
    }
    componentDidMount() {
        console.log('didmount');
    }
    componentWillReceiveProps(next) {
        ws.send(JSON.stringify({
            uid: next.user._id
        }))
    }
    render() {
        let {user} = this.props;
        return (
            <div className='form' style={{ 'width': 300, 'height': 350 }}>
                {user.name}
                <input type='text' ref='phone' placeholder='请输入手机号' className='form-control' />
                <input type='password' placeholder='请输入密码' className='form-control' />
                <button onClick={() => {
                    let user = {
                        name: '席总',
                        nickname: 'rose',
                        password: '123',
                        phone: '13303007025'
                    }
                    this.props.login({ user });
                } } className='btn btn-primary'>登录</button>
            </div>
        );
    }
}

const mapStateToProps = ({user}) => {
    return { user };
}

export default connect(mapStateToProps, { login, register })(Login);