import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { select } from '../../actions/action_form';

class FormField extends Component {
    render() {
        return (
            <div onClick={() => { this.props.select(this.props.fieldInfo) } } className={'wf-component wf-component-' + this.props.fieldInfo.type}>
                <div className="wf-remove icon icon-close"></div>
                <div className="wf-overlay"></div>
                <div className="wf-componentview">
                    <div className="wf-componentview-border">
                        <label className="wf-componentview-label">{this.props.fieldInfo.label}</label>
                        <span className="wf-componentview-placeholder">{this.props.fieldInfo.placeholder}</span>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(null, { select })(FormField);