import React, { Component, PropTypes } from 'react';

class SelectField extends Component {
    render() {
        let {id, label, required, placeholder, options} = this.props.fieldInfo;
        return (
            <div className='form-group'>
                <label htmlFor={id} className="col-sm-3 control-label">
                    {required ? '*' + label : label}
                </label>
                <div className="col-sm-8">
                    <select className="form-control" id={id} placeholder={required ? placeholder + '(必填)' : placeholder}>
                        {
                            options.map(option =>
                                <option key={option} value={option}>{option}</option>
                            )
                        }
                    </select>
                </div>
            </div>
        );
    }
}

export default SelectField;