import React, { Component } from 'react';
import { connect } from 'react-redux';
import { signUp } from '../actions';

class SignUp extends Component {
    handleSubmit(nameInput, usernameInput, passwordInput) {
        let user = {
            name: nameInput.value,
            loginName: usernameInput.value,
            password: passwordInput.value
        };
        this.props.signUp({ user });
    }
    render() {
        let nameInput;
        let usernameInput;
        let passwordInput;
        return (
            <div>
                <form onSubmit={ e => { e.preventDefault(); this.handleSubmit(nameInput, usernameInput, passwordInput) } }>
                    <div className='form-group'>
                        <label htmlFor='name'>姓名：</label>
                        <input id='name' className='from-control' ref={ node => { nameInput = node; } } type='text' />
                    </div>
                    <div className='form-group'>
                        <label htmlFor='email'>邮箱：</label>
                        <input id='email' className='from-control' ref={ node => { usernameInput = node; } } type='text' />
                    </div>
                    <div className='form-group'>
                        <label htmlFor='pwd'>密码：</label>
                        <input id='pwd' className='from-control' ref={ node => { passwordInput = node; } } type='password' />
                    </div>
                    <div>
                        <button className='btn btn-success' type='submit'>提交</button>
                    </div>
                </form>
            </div>
        )
    }
}

export default connect(null, { signUp })(SignUp);