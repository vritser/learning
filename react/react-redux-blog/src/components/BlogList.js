import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchBlogs, filterBlogs } from '../actions/action_blog';
import { getFilterBlogs } from '../selectors';
import { Link } from 'react-router';
import Page from './Page';

class BlogList extends Component {
    componentWillMount() {
        this.props.fetchBlogs();
    }
    componentDidMount() {
        let { filter } = this.props
        this.refs.input.value = filter
    }
    handleChange(e) {
        this.props.filterBlogs(e.target.value);
    }
    render() {
        if (!this.props.blogs) {
            return <div> loading </div>
        }
        return (
            <div className='col-sm-8'>
                <input type='text' className='form-control' ref='input' onChange={this.handleChange.bind(this) }/>
                <ul className='list-group' style={{ 'marginTop': 20 }}>
                    {
                        this.props.blogs.map(blog => {
                            return (
                                <li className='list-group-item' key={blog._id}>
                                    <Link to='' >{blog.title}</Link>
                                </li>
                            )
                        })
                    }
                </ul>
                <Page count={2} />
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return { blogs: getFilterBlogs(state), filter: state.home.filter };
}

export default connect(mapStateToProps, { fetchBlogs, filterBlogs })(BlogList);