import React, { Component, PropTypes } from 'react';
import WorkLog from './WorkLog';
import WorkPermission from './WorkPermission';

class Work extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: null,
        }
    }
    handleSelect(item) {
        this.setState({
            selected: item,
        })
    }
    render() {
        return (
            <ul className='list-group' style={{ 'width': 241, 'backgroundColor': '#f5f9ff' }}>
                <li className='list-group-item v-li'>考勤打卡</li>
                <li className='list-group-item v-li' onClick={() => { this.handleSelect(<WorkLog />) } }>日志</li>
                <li className='list-group-item v-li' onClick={() => { this.handleSelect(<WorkPermission />) } }>审批</li>
                <li className='list-group-item v-li'>智能报表</li>
                <li className='list-group-item v-li'>视频会议</li>
                <div className='v-content'>
                    {this.state.selected}
                </div>
            </ul>
        );
    }
}

export default Work;