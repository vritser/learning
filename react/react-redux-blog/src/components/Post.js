import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { fetchCates } from '../actions/action_cate';
import { createBlog } from '../actions/action_blog';
import { checkLogin } from '../actions';
import { markdown } from 'markdown';

class Post extends Component {
    static contextTypes = {
        router: PropTypes.object,
    }
    componentWillMount() {
        this.props.checkLogin();
        if (Object.keys(this.props.loginUser).length > 0)
            this.props.fetchCates();
        else
            this.context.router.push('/user/signin')
    }
    handleSubmit() {
        let title = this.refs.title.value;
        let category = this.refs.cate.value;
        let content = markdown.toHTML(this.refs.content.value);
        this.props.createBlog({
            blog: {
                title,
                category,
                content,
                author: this.props.loginUser._id,
            }
        });
        // this.context.router.push('/')        
    }
    render() {
        let cate;
        const { cates } = this.props;
        return (
            <div>
                <form
                    className='form-horizontal'
                    role='form'
                    onSubmit={ e => {
                        e.preventDefault();
                        this.handleSubmit();
                    } }>
                    <div className='form-group'>
                        <label htmlFor='title' className='col-sm-4 control-label'>Title</label>
                        <div className='col-sm-4'>
                            <input type='text' ref='title' className='form-control' id='title' placeholder='Title' />
                        </div>
                    </div>
                    <div className='form-group'>
                        <label htmlFor='' className='col-sm-4 control-label'>Category</label>
                        <div className='col-sm-4'>
                            <select className='form-control' ref='cate' >
                                {
                                    cates.map(cate => {
                                        return <option key={cate.id} value={cate.id}>{cate.name}</option>
                                    })
                                }
                            </select>
                        </div>
                    </div>
                    <div className='form-group'>
                        <label htmlFor='' className='col-sm-4 control-label'>Content</label>
                        <div className='col-sm-6'>
                            <textarea style={{ 'height': 225 }} ref='content' placeholder='support markdown syntax.' className='form-control'></textarea>
                        </div>
                    </div>
                    <div className='form-group'>
                        <div className='col-sm-3 col-sm-offset-4'>
                            <button type='submit' className='btn btn-default'>Publish</button>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}

const mapStateToProps = ({ home, loginUser }) => {
    return { cates: home.cates, loginUser };
}

export default connect(mapStateToProps, { fetchCates, createBlog, checkLogin })(Post);