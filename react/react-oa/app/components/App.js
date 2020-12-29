import React, { Component } from 'react';
import MenuList from './MenuList';
import Navbar from './Navbar';
import Login from './Login';
import MessageList from './Message/MessageList';
import { connect } from 'react-redux';
import Contact from './Contact';
import UserCard from './UserCard';
import Work from './Work/Work';
import Ding from './Ding';
import Tell from './Tell';
import YunDisk from './YunDisk';

class App extends Component {
    render() {
        if (!this.props.user.name) {
            return (
                <div style={{ 'position': 'absolute', 'left': '50%', 'top': '50%' }}>
                    <Login />
                </div>
                // <UserCard />
            )
        }
        return (
            <div style={{ 'marginTop': 20, 'marginLeft': 70, 'borderRadius': 4, 'backgroundColor': '#f5f9ff', 'width': 1000, 'overflow': 'hidden' }}>
                <Navbar />
                <div className='pull-left'>
                    <MenuList>
                        <MessageList />
                        <Ding />
                        <Tell />
                        <Contact />
                        <Work />
                        <YunDisk />
                    </MenuList>
                </div>
            </div>
        )
    }
}

const mapStateToProps = ({user}) => ({ user })

export default connect(mapStateToProps)(App);