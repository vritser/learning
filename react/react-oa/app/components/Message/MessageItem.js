import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { showDetail, fetchMsg } from '../../actions/action_msg';

class MessageItem extends Component {
    constructor(props) {
        super(props);

    }
    showDetail(msg) {
        this.props.showDetail(msg);
        this.props.fetchMsg(msg.from._id);
    }
    render() {
        const { msg } = this.props;
        return (
            <li
                className='list-group-item v-msg-item'
                onClick={() => { this.showDetail(msg) } }
                >
                <div className='media'>
                    <a className='media-left' href='#'>
                        <img className='v-img' src={require('../../../public/images/li.png')} />
                    </a>
                    <div className='media-body'>
                        <h5 className='media-heading'>
                            {msg.from.nickname}
                            <span className="badge small" style={{ 'color': '#fff' }}>部门</span>
                            <span className='pull-right v-time small'>{msg.publishTime}</span>
                        </h5>
                        <button type="button" className="btn btn-xs close">
                            <span aria-hidden="true">&times; </span>
                            <span className="sr-only">Close</span>
                        </button>
                        <p className='text-muted'>{msg.content}</p>
                    </div>
                </div>

            </li>
        );
    }
}

export default connect(null, { showDetail, fetchMsg })(MessageItem);