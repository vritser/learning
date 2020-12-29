import React, { Component, PropTypes } from 'react';
import NumberField from '../Form/NumberField';
import TextareaField from '../Form/TextareaField';
import SelectField from '../Form/SelectField';
import DateRangeField from '../Form/DateRangeField';
import PermissionField from '../Form/PermissionField';
import { connect } from 'react-redux';
import { closeWorkItemDetail, submit } from '../../actions/action_work';
// 
class WorkItemDetail extends Component {
    constructor(props) {
        super(props);

        this.state = {
            com: null,
        }

    }
    componentWillMount() {
        fetch(`http://localhost:3000/works/${this.props.workType}.json`)
            .then(res => res.json())
            .then(data => {
                this.setState({
                    com: data
                })
            })
    }
    handleFormComponent(component) {
        switch (component.componentName) {
            case 'NumberField':
                return <NumberField key={component.props.id} fieldInfo={component.props} />
            case 'TextareaField':
                return <TextareaField key={component.props.id} fieldInfo={component.props} />
            case 'SelectField':
                return <SelectField key={component.props.id} fieldInfo={component.props} />
            case 'DateRangeField':
                return <DateRangeField key={component.props.id} fieldInfo={component.props} />
            default:
                break;
        }
    }
    render() {
        let work = {};
        let els = [];
        if (!this.state.com) {
            return null;
        }
        return (
            <div className='panel panel-default' style={{ 'width': 689, 'height': 550, 'borderRadius': 0, }}>
                <div className='panel-heading' style={{ 'backgroundColor': '#f5f9ff' }}>
                    <h6 onClick={() => { this.props.closeWorkItemDetail() } }>
                        {'<—'} {this.state.com.title}
                    </h6>
                </div>
                <div className='panel-body' style={{ 'paddingTop': 20, 'minHeight': 500, 'overflow': 'auto', 'backgroundColor': '#f5f9ff' }}>
                    <form className='form-horizontal' >
                        {
                            this.state.com.items.map(item => {
                                let {id} = item.props;
                                if (id.indexOf('-') != 0) {
                                    id.split('-').map(i => {
                                        els.push(i)
                                    })
                                } else {
                                    els.push(id);
                                }

                                return this.handleFormComponent(item);
                            })
                        }
                        <PermissionField />
                        <div className='form-gorup'>
                            <button type='button' onClick={() => {
                                els.map(el => {
                                    work[el] = document.getElementById(el).value;
                                })
                                this.props.submit({ work, approvers: this.props.approvers, user: this.props.user });
                                console.log('formData:', this.props.user);
                            } } className='btn btn-primary btn-lg' style={{}}>提交</button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

const mapStateToProps = ({work, user}) => ({
    approvers: work.choosed,
    user
})

export default connect(mapStateToProps, { closeWorkItemDetail, submit })(WorkItemDetail);