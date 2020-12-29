import Field from './Field';
import FormField from './FormField';
import { connect } from 'react-redux';
import { drop } from '../../actions/action_form';
import ComponentSetting from './ComponentSetting';
import React, { Component, PropTypes } from 'react';

class FormDesign extends Component {
    constructor(props) {
        super(props);
    }
    drag(e) {
        e.dataTransfer.setData('type', 'TextField');
        e.target.style.background = 'rgba(0,0,0,0.6)';
        e.target.style.border = 'none';
    }
    dragend(e) {
        e.target.style.background = 'rgba(255,255,255,0.1)';
    }
    dragding(e) {
        e.target.style.background = 'rgba(255,255,255,0.1)';
        e.target.style.border = '1px dashed rgba(255,255,255,0.6)';
    }
    allowDrop(e) {
        e.preventDefault();
    }
    handleField(type) {
        let [label, id, placeholder] = ['', '', ''];
        switch (type) {
            case 'textfield':
                label = '单行输入框'
                placeholder = '请输入'
                return { type, label, id: label, placeholder }
            case 'textareafield':
                label = '多行输入框'
                placeholder = '请输入'
                return { type, label, id: label, placeholder }
            case 'numberfield':
                label = '数字输入框'
                placeholder = '请输入'
                return { type, label, id: label, placeholder }
            case 'ddselectfield':
                label = '单选框'
                placeholder = '请选择'
                return { type, label, id: label, placeholder }
            default:
                break;
        }
    }
    drop(e) {
        e.preventDefault();
        let type = e.dataTransfer.getData('type')
        let field = this.handleField(type);
        // 同名的控件
        let arr = this.props.fields.filter(f => f.type == type);
        if (arr.length > 0) {
            // 
            let f = arr[arr.length - 1].label;
            if (f.indexOf('(') != -1) {
                let n = f.substr(f.indexOf('(') + 1, 1);
                console.log('n:', n);
                n = parseInt(n) + 1;
                field.label = field.id = field.label + '(' + n + ')'
            } else {
                field.label = field.id = field.label + '(' + 2 + ')'
            }
        }
        this.props.drop(field);
    }
    render() {
        let {fields} = this.props;
        return (
            <div className="HolyGrail">
                <header>
                    <img src={require('../../../public/images/icon.png')} height="45px" />
                    <span className="nav-head">|设计器</span>
                </header>
                <div className="HolyGrail-body">
                    <nav className="HolyGrail-nav">
                        <Field label='单行输入框' type='textfield' />
                        <Field label='多行输入框' type='textareafield' />
                        <Field label='数字输入框' type='numberfield' />
                        <Field label='单选框' type='ddselectfield' />
                    </nav>
                    <main className="HolyGrail-content">
                        <div className="wf-formcanvas-inner">
                            <div className={`wf-formcanvas-body dropbody ${fields.length > 0 ? '' : 'empty'}`} onDrop={e => { this.drop(e) } } onDragOver={e => { this.allowDrop(e) } }>
                                {
                                    fields.length > 0 ? fields.map(f => {
                                        return <FormField key={f.id} fieldInfo={f} />;
                                    }) : null
                                }
                            </div>
                        </div>
                    </main>
                    <aside className="HolyGrail-ads">
                        <ComponentSetting />
                    </aside>
                </div>
            </div>
        );
    }
}

const mapStateToProps = ({form}) => ({
    fields: form.fields
})

export default connect(mapStateToProps, { drop })(FormDesign);