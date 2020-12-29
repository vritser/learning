import React, { Component, PropTypes } from 'react';
import MessageContent from './MessageContent';
import { connect } from 'react-redux';
import { fetchMsg, send } from '../../actions/action_msg';
import ws from '../client';

class MessageDetail extends Component {
    constructor(props) {
        super(props);

    }
    // componentWillMount() {
    //     if (this.props.curr) {
    //         this.props.fetchMsg(this.props.curr.from._id);
    //     }
    // }
    sendMsg() {
        let content = this.refs.content.value
        // 57fdd3583cd65e74edf5a836
        // 57fd8e24608a7c32e08a4edd
        let msg = { to: this.props.curr.from._id, from: this.props.user._id, hidden: false, content, type: 'personal', publishTime: new Date() }
        // let msg = { to: '57fd8e24608a7c32e08a4edd', from: '57fdd3583cd65e74edf5a836', hidden: false, content: 'Hello World!', type: 'personal' }
        this.props.send({ msg });
        this.props.fetchMsg(this.props.curr.from._id);
        ws.send(JSON.stringify(msg));

    }
    render() {
        let {msgs, user, curr} = this.props;
        if (!curr) {
            return <div></div>;
        }
        return (
            <div className="panel panel-default" style={{ 'width': 689, 'height': 550, 'borderRadius': 0 }}>
                <div className="panel-heading" style={{ 'backgroundColor': '#f5f9ff' }}>
                    <div className='media'>
                        <a className='media-left' href='#'>
                            <img className='v-img' src={require('../../../public/images/li.png')} />
                        </a>
                        <div className='media-body'>
                            <h5 className='media-heading'>{curr.from.nickname}</h5>
                            <span className='text-muted'>李毅(邯郸翱翔T111-开发部-工程师) </span>
                        </div>
                    </div>
                    <div style={{ 'position': 'absolute', 'right': 20, 'top': 10 }}>
                        <a className='btn btn-default'>btn</a>
                        <a className='btn btn-default'>btn</a>
                    </div>
                </div>
                <div className="panel-body" style={{ 'height': 400, 'overflow': 'auto', 'padding': '10 15', 'backgroundColor': '#f5f9ff' }}>

                    {
                        msgs.length > 0 ? msgs.map(msg => {
                            if (msg.from._id != user._id) {
                                return (<div key={msg._id} className='pull-left'><MessageContent msg={msg} /></div>)
                            } else {
                                return (<div key={msg._id} className='pull-right'><MessageContent msg={msg} /></div>)
                            }
                        }) : ''
                    }
                </div>
                <div className='panel-footer' style={{ 'backgroundColor': '#f5f9ff' }}>
                    <div></div>
                    <div className='row'>
                        <div className='col-sm-10'>
                            <textarea style={{ 'border': 'none', 'width': 500 }} rows='3' ref='content'>
                            </textarea>
                        </div>
                        <div className='col-sm-2'>
                            <button onClick={() => { this.sendMsg() } } className='btn btn-default btn-lg'>send</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = ({msg, user}) => ({ msgs: msg.detail.list, curr: msg.curr, user })

export default connect(mapStateToProps, { fetchMsg, send })(MessageDetail);