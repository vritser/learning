import React, { Component, PropTypes } from 'react';
import Modal from 'react-modal';
import { connect } from 'react-redux';
import { addFriend } from '../actions/action_contact';

class Create extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showAddFriend: false,
        }
    }
    openAddFriend() {
        this.setState({ showAddFriend: true })
    }
    closeAddFriend() {
        this.setState({ showAddFriend: false })
    }
    render() {
        const customStyles = {
            overlay: {
                backgroundColor: 'rgba(0, 0, 0, 0.5)'
            }
        };
        return (
            <ul className='list-group' style={{ 'position': 'absolute', 'top': -110, 'left': 10 }}>
                <li style={{ 'width': 80, 'fontSize': 10, 'padding': 5, 'textAlign': 'center' }} className='list-group-item'>企业群聊天</li>
                <li style={{ 'width': 80, 'fontSize': 10, 'padding': 5, 'textAlign': 'center' }} className='list-group-item'>发起聊天</li>
                <li style={{ 'width': 80, 'fontSize': 10, 'padding': 5, 'textAlign': 'center' }} className='list-group-item'>Ding</li>
                <li onClick={this.openAddFriend.bind(this)} style={{ 'width': 80, 'fontSize': 10, 'padding': 5, 'textAlign': 'center' }} className='list-group-item'>添加好友</li>
                <Modal
                    className="Modal__Bootstrap modal-dialog"
                    closeTimeoutMS={150}
                    style={customStyles}
                    isOpen={this.state.showAddFriend}
                    onRequestClose={this.closeAddFriend.bind(this)}
                    >
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" onClick={this.closeAddFriend.bind(this)}>
                                <span aria-hidden="true">&times;</span>
                                <span className="sr-only">Close</span>
                            </button>
                            <h4 className="modal-title" style={{ 'textAlign': 'center' }}>添加好友</h4>
                        </div>
                        <div className="modal-body">
                            <input className='form-control' ref='phone' type='text' placeholder='请输入手机号' />
                        </div>
                        <div className="modal-footer" style={{ 'textAlign': 'center' }}>
                            <button type="button" className="btn btn-primary" onClick={() => { this.props.addFriend(this.refs.phone.value) } }>确定</button>
                        </div>
                    </div>
                </Modal>
            </ul>
        );
    }
}

export default connect(null, { addFriend })(Create);