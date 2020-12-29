import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { addToList } from '../actions/action_msg';

class UserCard extends Component {
    handleSendMsg() {
        this.props.addToList(this.props.user._id);
    }
    render() {
        return (
            <div className='profile-card'>
                <header className='header' >
                    <div className='profile-bg' >
                    </div>
                    <div className='avatar-wrap'>
                        <img className='v-img-lg' src={require('../../public/images/li.png')} />
                    </div>
                    <div className='detail-info'>
                        <div className='name'>
                            <span>{this.props.user ? this.props.user.nickname : 'vritser'}</span>
                        </div>
                    </div>
                    <button className='btn del-friend'>解除好友</button>
                </header>
                <article className='detail-content'>
                </article>
                <footer className='footer'>
                    <div>
                        <a className='footer-item' href='#' onClick={this.handleSendMsg.bind(this)}><span>发消息</span></a>
                        <a className='footer-item' href='#'><span>打电话</span></a>
                        <a className='footer-item' href='#'><span>DING一下</span></a>
                    </div>
                </footer>
            </div>
        );
    }
}

export default connect(null, { addToList })(UserCard);