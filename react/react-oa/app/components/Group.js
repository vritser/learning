import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { getSector } from '../actions/action_user';
import { getMembers } from '../actions/action_contact';
import { chooseApprover } from '../actions/action_work';

class Group extends Component {
    constructor(props) {
        super(props);
    }
    componentWillMount() {
        this.props.getSector();
    }
    renderMembers() {
        let {members, childSector} = this.props.approver;
        // if (members.length > 0 && childSector.length > 0) {
        <ul className='list-group'>
            {
                childSector.map(s => {
                    return <li onClick={() => { this.props.getMembers(s) } } key={s} className='list-group-item'>子部门</li>
                })
            }
            {
                members.map(m => {
                    return <li key={m._id} className='list-group-item'>{m.nickname}</li>
                })
            }
        </ul>
        // }
    }
    render() {
        const {sector, approver} = this.props;
        if (!this.props.sector) {
            return <div>加载</div>;
        }
        return (
            <div style={{ 'height': 350 }}>
                <h4 onClick={() => { this.props.getMembers(sector._id) } }>{sector.name}</h4>
                {
                    approver && approver.his.length > 0 ?
                        <ol className="breadcrumb">
                            {approver.his.map(h => {
                                return <li key={h} onClick={() => { this.props.getMembers(h) } }>子部门</li>
                            })}
                        </ol> : null
                }
                {
                    approver && approver.members && approver.childSector ?
                        <ul className='list-group'>
                            {
                                approver.childSector.map(s => {
                                    return <li onClick={() => { this.props.getMembers(s) } } key={s} className='list-group-item'>子部门</li>
                                })
                            }
                            {approver.members.map(m => {
                                return <li key={m._id} onClick={() => { this.props.chooseApprover(m) } } className='list-group-item'>{m.nickname}</li>
                            })}
                        </ul> : null
                }
            </div>
        );
    }
}

const mapStateToProps = ({user, contact}) => ({
    sector: user.sector,
    approver: contact.approver
})

export default connect(mapStateToProps, { getSector, getMembers, chooseApprover })(Group);