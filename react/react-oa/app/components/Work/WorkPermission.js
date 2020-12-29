import React, { Component, PropTypes } from 'react';
import WorkItem from './WorkItem';
import WorkHistory from './WorkHistory';
import WorkItemDetail from './WorkItemDetail';
import WorkList from './WorkList';
import { connect } from 'react-redux';
// 审批
class WorkPermission extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: <WorkList />,
        }
    }
    render() {
        if (this.props.work.showItemDetail) {
            return <WorkItemDetail workType={this.props.work.workType} />
        }
        return (
            <div>
                <nav className='navbar navbar-default' role='navigation' style={{ 'marginBottom': 0 }}>
                    <ul className='nav navbar-nav'>
                        <li className='v-tab' onClick={() => { this.setState({ selected: <WorkList /> }) } }><a>发起审批</a></li>
                        <li className='v-tab' onClick={() => { this.setState({ selected: <WorkHistory /> }) } }><a>待我审批的</a></li>
                        <li className='v-tab'><a>我已审批的</a></li>
                        <li className='v-tab'><a>我发起的</a></li>
                    </ul>
                </nav>
                <div style={{ 'borderLeft': '1px solid #e7e7e7', 'minHeight': 500 }}>
                    {this.state.selected}
                </div>
            </div>
        );
    }
}

const mapStateToProps = ({work}) => ({ work });

export default connect(mapStateToProps)(WorkPermission);