import React, { Component, PropTypes } from 'react';

class TextField extends Component {
    render() {
        let {id, label, placeholder, required } = this.props.fieldInfo;

        return (
            <div className='form-group'>
                <label htmlFor={id} className="col-sm-3 control-label">
                    {required ? '*' + label : label}
                </label>
                <div className="col-sm-8">
                    <textarea className="form-control" id={id} placeholder={required ? placeholder + '(必填)' : placeholder} />
                </div>
            </div>
        );
    }
}

export default TextField;