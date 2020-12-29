import React, { Component, PropTypes } from 'react';
import UserCard from './UserCard';

class Content extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            user: null
        }
    }
    showUserCard(con) {
        this.setState({
            show: !this.state.show,
            user: con
        })
    }
    render() {
        if (!this.props.selected) {
            return <div>暂时没有</div>
        }
        return (
            <div className='panel panel-default' style={{ 'width': 689, 'height': 550, 'borderRadius': 0, }}>
                <div className='panel-heading' style={{ 'backgroundColor': '#f5f9ff' }}>
                    {this.props.selected.title}
                </div>
                <div className='panel-body' style={{ 'padding': 0 }}>
                    <ul className='list-group' >
                        {this.props.selected.contacts.map(con => (
                            <li className='list-group-item v-li' key={con._id} onClick={() => { this.showUserCard(con) } }>
                                <img className='v-img' src={require('../../public/images/li.png')} /> &nbsp; {con.nickname}
                            </li>
                        ))}
                    </ul>
                </div>
                <div style={{ 'display': this.state.show ? 'block' : 'none' }} >
                    <UserCard user={this.state.user} />
                </div>
            </div>
        );
    }
}

export default Content;