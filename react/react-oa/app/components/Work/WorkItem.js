import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { showWorkItemDetail } from '../../actions/action_work';

class WorkItem extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className='tFlex home-tab' onClick={() => { this.props.showWorkItemDetail(this.props.permissionType) } }>
                <div className='tab-inner'>
                    <div className='home-tab-icon'>
                        <img width='50px' src={require('../../../public/images/leave_2.png')} />
                    </div>
                    <div className='tab-title'>
                        <span>请假</span>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(null, { showWorkItemDetail })(WorkItem);