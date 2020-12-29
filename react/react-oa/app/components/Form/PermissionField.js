import React, { Component, PropTypes } from 'react';
import Modal from 'react-modal';
import Group from '../Group';
import { connect } from 'react-redux';
import { chooseApprover } from '../../actions/action_work';

class PermissionField extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
        }
    }
    render() {
        const customStyles = {
            content: {
                width: '676px'
            },
            overlay: {
                backgroundColor: 'rgba(0, 0, 0, 0.5)'
            }
        };
        // let {id, label, required} = this.props.fieldInfo;
        let {choosedApprovers} = this.props;
        return (
            <div className='form-group'>
                <label className="col-sm-3 control-label">
                    审批人
                </label>
                <div className="col-sm-8">
                    <label className='control-label v-li-text' onClick={() => { this.setState({ show: true }) } }>添加审批人</label>
                    <ul className='list-group' style={{ 'marginTop': 10 }}>
                        {
                            choosedApprovers ?
                                choosedApprovers.map(c =>
                                    <li className='v-approver' key={c._id}>
                                        <img style={{ 'display': 'block' }} src={require('../../../public/images/li.png')} className='v-img' />
                                        <span>{c.nickname}</span>
                                    </li>
                                )
                                : null
                        }
                    </ul>
                </div>
                <Modal
                    className="Modal__Bootstrap modal-dialog"
                    closeTimeoutMS={150}
                    style={customStyles}
                    isOpen={this.state.show}
                    onRequestClose={() => { this.setState({ show: false }) } }
                    >
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" onClick={() => { this.setState({ show: false }) } }>
                                <span aria-hidden="true">&times;</span>
                                <span className="sr-only">Close</span>
                            </button>
                            <h4 className="modal-title" style={{ 'textAlign': 'center' }}>选人</h4>
                        </div>
                        <div className="modal-body">
                            <div className='row'>
                                <div className='col-sm-7' style={{ border: '1px solid #e5e5e5', borderRadius: '4px', margin: '0 10px 0 20px' }}>
                                    <div style={{ 'height': 350 }}>
                                        {
                                            choosedApprovers ?
                                                <div>
                                                    {choosedApprovers.map(a => {
                                                        return <span key={a._id} onClick={() => { this.props.chooseApprover(a); } }>{a.nickname}</span>
                                                    })}
                                                </div> : null
                                        }
                                    </div>
                                </div>
                                <div className='col-sm-4' style={{ border: '1px solid #e5e5e5', borderRadius: '4px', }}>
                                    <Group />
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer" style={{ 'textAlign': 'center' }}>
                            <button type="button" className="btn btn-primary" onClick={() => { this.setState({ show: false }) } }>确定</button>
                        </div>
                    </div>
                </Modal>
            </div>
        );
    }
}

const mapStateToProps = ({work}) => ({
    choosedApprovers: work.choosed
})

export default connect(mapStateToProps, { chooseApprover })(PermissionField);