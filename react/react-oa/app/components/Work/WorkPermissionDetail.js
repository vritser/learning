import React, { Component, PropTypes } from 'react';
// 审批详情
class WorkPermissionDetail extends Component {
    render() {
        return (
            <div className='panel panel-default' style={{
                'width': 360, 'height': 550, 'backgroundColor': '#fff', 'borderRadius': 0, 'position': 'absolute',
                'top': 0, 'left': 640, 'display': 'none'
            }}>
                <div className='panel-heading' style={{ 'backgroundColor': '#fff', 'lineHeight': 2.8, 'textAlign': 'center' }}>
                    需要您审批
                </div>
                <div className='panel-body' style={{ 'padding': 0, 'overflow': 'hidden' }}>
                    <div className="approve-head">
                        <div className="approve-user-header" style={{ 'background': '#c5cb63' }}>松伟</div>
                        <p className="username">李松伟</p>
                        <p className="status">等待我审批</p>
                    </div>
                    <div className="approve-result agree pullout"></div>

                    <div>
                        <div className="approve-formschema">
                            <div className="line component-textfield">
                                <label className="label">审批编号:</label>
                                <span>201610211649000199062</span>
                            </div>
                            <div className="line component-textareafield">
                                <label className="label">所在部门:</label>
                                <span>开发部</span>
                            </div>
                            <div className="line component-ddselectfield">
                                <label className="label">请假类型:</label>
                                <span>病假</span>
                            </div>
                            <div className="group component-dddaterangefield">
                                <div className="line component-dddatefield">
                                    <label className="label">开始时间:</label>
                                    <span>2016-10-21</span>
                                </div>
                                <div className="line component-dddatefield">
                                    <label className="label">结束时间:</label>
                                    <span>2016-10-21</span>
                                </div>
                            </div>
                            <div className="line component-numberfield">
                                <label className="label">
                                    <span>请假天数</span>
                                    <span>:</span>
                                </label>
                                <span>1</span>
                            </div>
                            <div className="line component-textareafield">
                                <label className="label">请假事由:</label>
                                <p>fff</p>
                            </div>
                        </div>
                    </div>

                    <div className="approval-tline">
                        <div className="time-node submit">
                            <div className="node-status">
                                <i className="iconfont micro-flow-icon-submit"></i>
                            </div>
                            <div className="nodebox">
                                <div className="arrow">
                                </div>
                                <div className="nodebox-inner">
                                    <div className="node-avatar" style={{ 'background': '#c5cb63' }}>松伟</div>
                                    <p className="username">我</p>
                                    <p className="result-line">
                                        <span>发起申请</span>
                                        <span className="reason">
                                        </span>
                                    </p>
                                    <div className="opreratetime">201601 16:49</div>
                                    <div className="fileField"></div>
                                </div>
                            </div>
                        </div>
                        <div className="time-node doing">
                            <div className="node-status">
                                <i className="iconfont micro-flow-icon-doing"></i>
                            </div><div className="nodebox">
                                <div className="arrow">
                                </div>
                                <div className="nodebox-inner">
                                    <div className="node-avatar" style={{ 'background': '#c5cb63' }}>松伟</div>
                                    <p className="username">我</p>
                                    <p className="result-line">
                                        <span>审批中</span>
                                        <span className="reason">
                                        </span>
                                    </p>
                                    <div className="fileField">
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="time-node next last">
                            <div className="node-status">
                                <i className="iconfont micro-flow-icon-next"></i>
                            </div>
                            <div className="nodebox">
                                <div className="arrow">
                                </div>
                                <div className="nodebox-inner">
                                    <div className="node-avatar" style={{ 'background': '#3bc2b5' }}>伟豪</div>
                                    <p className="username">席伟豪</p>
                                    <p className="result-line">
                                        <span></span>
                                        <span className="reason">
                                        </span>
                                    </p><div className="fileField">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default WorkPermissionDetail;