import React, {Component, PropTypes} from 'react';

class Navbar extends Component {
    render() {
        return (
            <nav className='navbar v-navbar' role='navigation'>
                <div className="navbar-header">
                    <a className="navbar-brand" href="#">
                        <img className='v-img' alt="Brand" src={require('../../public/images/li.png') } />
                    </a>
                </div>
                <form className="navbar-form navbar-right" role="search">
                    <div className="form-group">
                        <input type="text" className="form-control" placeholder="Search" />
                    </div>
                    
                    <button type="submit" className="btn btn-default">up</button>
                </form>
            </nav>
        );
    }
}

export default Navbar;