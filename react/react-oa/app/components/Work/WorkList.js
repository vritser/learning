import React, { Component, PropTypes } from 'react';
import WorkItem from './WorkItem';

class WorkList extends Component {
    render() {
        return (
            <div style={{ 'paddingLeft': 25 }}>
                <WorkItem permissionType='excused' />
                <WorkItem permissionType='pay' />
            </div>
        );
    }
}

export default WorkList;