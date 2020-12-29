import React, { Component, PropTypes } from 'react';
import MessageItem from './MessageItem';
import MessageDetail from './MessageDetail';
import { connect } from 'react-redux';
import { addToList, fetchMsg } from '../../actions/action_msg';
import ws from '../client';

class MessageList extends Component {
    constructor(props) {
        super(props);
        this.handleOnMessage.bind(this);
        this.handleOnMessage();
    }
    componentWillMount() {
        // 57fd8e24608a7c32e08a4edd
        // 57fdd3583cd65e74edf5a836
        // this.props.addToList('57fdd3583cd65e74edf5a836');
    }
    // addToList(contact) {

    // }
    handleOnMessage() {
        ws.onmessage = msg => {
            console.log('id:', msg);
            try {
                msg = JSON.parse(msg.data);
            } catch (error) {
                console.log("err:", error);
                return;
            }
            this.props.addToList(msg.from);
            this.props.fetchMsg(msg.from)
            console.log(msg);
        }
    }
    render() {
        let {messages, curr} = this.props;
        return (
            <ul className='list-group' style={{ 'width': 241, 'backgroundColor': '#f5f9ff' }}>
                {
                    messages.length > 0 ?
                        messages.map(message =>
                            <MessageItem key={message._id} msg={message} />
                        ) : null
                }
                <div className='v-content'>
                    {
                        curr ? <MessageDetail /> : <div></div>
                    }
                </div>
            </ul>
        );
    }
}

const mapStateToProps = ({msg}) => ({ messages: msg.msglist, curr: msg.curr })

export default connect(mapStateToProps, { addToList, fetchMsg })(MessageList);