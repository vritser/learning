import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { checkLogin,logout } from '../actions';

class Navbar extends Component {
    componentWillMount() {
        this.props.checkLogin();
    }

    render() {
        const { loginUser } = this.props;

        let isLogin = Object.keys(loginUser).length > 0 ? true : false;
        return (
            <nav className='navbar navbar-default navbar-fixed-top' role='navigation'>
                <div className='container'>
                    <ul className='nav navbar-nav'>
                        <li><Link to='/'>Home</Link></li>
                        <li><Link to='/post/new'>Post</Link></li>
                    </ul>
                    {
                        isLogin ?
                            <ul className='nav navbar-nav navbar-right'>
                                <li><a href='#'>欢迎你 , {loginUser.name}</a></li>
                                <li><a href='#' onClick={ e => { e.preventDefault(); this.props.logout(); } }>注销</a></li>
                            </ul>
                            :
                            <ul className='nav navbar-nav navbar-right'>
                                <li><Link to='/user/signup' >注册</Link></li>
                                <li><Link to='/user/signin' >登录</Link></li>
                            </ul>

                    }
                </div>
            </nav>
        )
    }
}

const mapStateToProps = ({ loginUser }) => {
    return { loginUser: loginUser };
}

export default connect(mapStateToProps, { checkLogin, logout })(Navbar);