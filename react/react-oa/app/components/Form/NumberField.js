import React, { Component } from 'react';

class NumberField extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        let {id, label, placeholder, required} = this.props.fieldInfo;
        return (
            <div className='form-group'>
                <label htmlFor={id} className="col-sm-3 control-label">
                    {required ? '*' + label : label}
                </label>
                <div className="col-sm-8">
                    <input type="number" className="form-control" id={id} placeholder={required ? placeholder + '(必填)' : placeholder} />
                </div>
            </div>
        );
    }
}

export default NumberField;