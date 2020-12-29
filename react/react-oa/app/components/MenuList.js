import React, { Component, PropTypes } from 'react';
import Create from './Create';
import { connect } from 'react-redux';
import WorkPermissionDetail from './Work/WorkPermissionDetail';

class MenuList extends Component {
    constructor(prop) {
        super(prop);
        this.state = {
            selected: 0,
            showCreate: false,
        }
    }
    render() {
        return (
            <div style={{ 'position': 'relative', 'height': 550 }}>
                <nav className='navbar navbar-default' style={{ 'width': 80, 'height': 550, 'backgroundColor': '#e4eaf4' }} role='navigation'>
                    <div className="navbar-header">
                        <a className="navbar-brand" href="#">
                            <img className='v-img-lg' src={require('../../public/images/li.png')} />
                        </a>
                    </div>
                    <ul className='nav navbar-nav v-nav' style={{ 'marginTop': 30 }}>
                        <li onClick={() => { this.setState({ selected: 0 }) } }>
                            <a><span style={{ 'fontSize': 25 }} className="glyphicon glyphicon-comment"></span></a>
                        </li>
                        <li onClick={() => { this.setState({ selected: 1 }) } }>
                            <a><span style={{ 'fontSize': 25 }} className="glyphicon glyphicon-pushpin"></span></a>
                        </li>
                        <li onClick={() => { this.setState({ selected: 2 }) } }>
                            <a><span style={{ 'fontSize': 25 }} className="glyphicon glyphicon-earphone"></span></a>
                        </li>
                        <li onClick={() => { this.setState({ selected: 3 }) } }>
                            <a><span style={{ 'fontSize': 25 }} className="glyphicon glyphicon-user"></span></a>
                        </li>
                        <li onClick={() => { this.setState({ selected: 4 }) } }>
                            <a><span style={{ 'fontSize': 25 }} className="glyphicon glyphicon-th-large"></span></a>
                        </li>
                        <li onClick={() => { this.setState({ selected: 5 }) } }>
                            <a><span style={{ 'fontSize': 25 }} className='glyphicon glyphicon-cloud-upload'></span></a>
                        </li>
                    </ul>
                    <ul className='nav navbar-nav' style={{ 'marginTop': 50, 'marginLeft': 15, 'position': 'relative' }}>
                        <li onClick={() => { this.setState({ showCreate: !this.state.showCreate }) } }>
                            <a><span style={{ 'fontSize': 20 }} className='glyphicon glyphicon-plus-sign'></span></a>
                        </li>
                        <li><a>...</a></li>
                        <div style={{ 'display': this.state.showCreate ? 'block' : 'none' }} >
                            <Create />
                        </div>
                    </ul>
                </nav>
                <div style={{ 'position': 'absolute', 'top': 0, 'left': 80 }}>
                    {this.props.children[this.state.selected]}
                </div>
                <WorkPermissionDetail />
            </div >
        );
    }
}
const mapStateToProp = ({user}) => ({
    
})

export default MenuList;