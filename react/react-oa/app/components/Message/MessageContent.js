import React, { Component, PropTypes } from 'react';

class MessageContent extends Component {
    // constructor(props) {
    //     super(props);
    // }
    render() {
        let {msg} = this.props;
        return (
            <div className='media' style={{ 'overfollow': 'hidden', 'padding': 10 }}>
                <a className='media-left' href='#'>
                    <img className='v-img' src={require('../../../public/images/li.png')} />
                </a>
                <div className='media-body'>
                    <div className='media-heading'>
                        <span className='text-muted small'>{msg.from.nickname}</span>
                        <span style={{ 'marginLeft': 10 }} className='v-time small'>{msg.publishTime}</span>
                    </div>

                    <div style={{ 'backgroundColor': '#fff', 'height': 33 }}>
                        {msg.content}
                    </div>
                </div>
            </div>
        );
    }
}

export default MessageContent;