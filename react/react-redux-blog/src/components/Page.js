import React, {Component } from 'react';
import { connect } from 'react-redux';
import { fetchBlogs } from '../actions/action_blog';

class Page extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        let pages = [];
        for (let i = 1; i <= this.props.count; i++) {
            pages.push(
                <li key={i}>
                    <a href='#' onClick={e => { e.preventDefault(); this.props.fetchBlogs(i) } }>{i}</a>
                </li>
            )
        }
        return (
            <ul>
                { pages }
            </ul>
        )
    }
}

export default connect(null, { fetchBlogs })(Page);