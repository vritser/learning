import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

class ComponentSetting extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        console.log('curr:', this.props.form.curr);
        if (!this.props.form.curr) {
            return null
        }
        return (
            <div className="wf-panel wf-settingpanel">
                <div className="wf-panel-tab">
                    <a data-tabname="component" className="tabitem current">控件设置</a>
                    <a data-tabname="form" className="tabitem">审批设置</a>
                </div>
                <div className="wf-form wf-widgetsettings">
                    <div className="wf-field wf-setting-label">
                        <div className="fieldname">
                            <span>标题</span>
                            <span className="fieldinfo ">最多10个字</span>
                        </div>
                        <div className="fieldblock">
                            <input
                                type="text"
                                className=""
                                onChange={e => {
                                    this.props.form.curr.label = e.target.value;
                                } }
                                value={this.props.form.curr.label} />
                        </div>
                    </div>
                    <div className="wf-field wf-setting-placeholder">
                        <div className="fieldname">
                            <span>提示文字</span>
                            <span className="fieldinfo ">最多20个字</span>
                        </div>
                        <div className="fieldblock">
                            <input type="text" className="" value={this.props.form.curr.placeholder} />
                        </div>
                    </div>
                    <div className="wf-field wf-setting-placeholder">
                        <div className="fieldname">
                            <span>单位</span>
                            <span className="fieldinfo ">最多20个字</span>
                        </div>
                        <div className="fieldblock">
                            <input type="text" className="" />
                        </div>
                    </div>
                    <div className="wf-field wf-setting-required">
                        <div className="fieldname">验证</div>
                        <label className="fieldblock">
                            <input type="checkbox" value="1" />
                            <span className="verticalmiddle">必填</span>
                        </label>
                    </div>
                </div>
            </div>
        );
    }
}
const mapStateToProps = ({form}) => ({
    form
})
export default connect(mapStateToProps)(ComponentSetting);