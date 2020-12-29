import React, { Component, PropTypes } from 'react';

class DateRangeField extends Component {
    render() {
        let {id, label, required, placeholder} = this.props.fieldInfo;
        let start = id.split('-')[0];
        let end = id.split('-')[1];
        return (
            <div>
                <div className='form-group'>
                    <label htmlFor={start} className="col-sm-3 control-label">
                        {required ? '*' + label[0] : label[0]}
                    </label>
                    <div className="col-sm-8">
                        <input type='date' className="form-control" id={start} placeholder={required ? placeholder + '(必填)' : placeholder} />
                    </div>
                </div>
                <div className='form-group'>
                    <label htmlFor={end} className="col-sm-3 control-label">
                        {required ? '*' + label[1] : label[1]}
                    </label>
                    <div className="col-sm-8">
                        <input type='date' className="form-control" id={end} placeholder={required ? placeholder + '(必填)' : placeholder} />
                    </div>
                </div>
            </div>
        );
    }
}

export default DateRangeField;