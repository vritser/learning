import React, { Component, PropTypes }　from 'react';
import { connect } from 'react-redux';
import { signIn } from '../actions';

class SignIn extends Component {
    static contextTypes = {
        router:PropTypes.object
    }
    handleSubmit(input1,input2) {
        this.props.signIn({loginName:input1.value,password:input2.value});
        this.context.router.push('/');
    }
    render() {
        let usernameInput,passwordInput;
        return (
            <div>
                <form onSubmit={ e => { e.preventDefault(); this.handleSubmit(usernameInput, passwordInput) } }>
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

export default connect(null,{ signIn })(SignIn);