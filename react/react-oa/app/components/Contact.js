import React, { Component, PropTypes } from 'react';
import Content from './Content';
import { connect } from 'react-redux';
import { getFriends } from '../actions/action_contact';
import { getSector } from '../actions/action_user';
import Group from './Group';
import ws from './client';

class Contact extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: null,
        }
    }
    componentWillMount() {
        this.props.getFriends();
        this.props.getSector();
    }
    handleOnMessage() {
        ws.onmessage = msg => {
            console.log('contact msg', msg);
        }
    }
    handleOnClick(contacts, title) {
        this.setState({
            selected: {
                contacts,
                title
            }
        })
    }
    render() {
        let { friends } = this.props.contact;
        let { sector } = this.props.user;
        return (
            <div style={{ 'width': 241, 'backgroundColor': '#f5f9ff' }}>
                {sector ?
                    <ul className='list-group' style={{ 'marginBottom': 0 }}>
                        <li className='list-group-item' style={{ 'overflow': 'hidden', 'backgroundColor': '#f5f9ff' }}>{sector.name}</li>
                        <li className='list-group-item v-li'> &nbsp;&nbsp;&nbsp; 组织架构</li>
                    </ul> : null
                }
                <ul className='list-group'>
                    <li className='list-group-item v-li' onClick={() => { this.handleOnClick(friends, '我的好友') } }>我的好友</li>
                    <li className='list-group-item v-li' onClick={() => { this.handleOnClick(groups, '我的群组') } }>我的群组</li>
                    <li className='list-group-item v-li'>特别关注</li>
                    <div className='v-content'>
                        <Content selected={this.state.selected} />
                    </div>
                </ul>
            </div>
        );
    }
}

const mapStateToProps = ({contact, user}) => ({ contact, user });

export default connect(mapStateToProps, { getFriends, getSector })(Contact);