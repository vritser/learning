import React, { Component, PropTypes } from 'react';

class Field extends Component {
    constructor(props) {
        super(props);

    }
    drag(e) {
        e.dataTransfer.setData('type', this.props.type);
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
    render() {
        let {label, type} = this.props;
        return (
            <div className="wf-widgetsitem"
                draggable="true"
                onDragStart={e => { this.drag(e) } }
                onDrag={e => { this.dragding(e) } }
                onDragEnd={e => { this.dragend(e) } }
                >
                <label>{label}</label>
                <i className={"widgeticon " + type}></i>
            </div>
        );
    }
}

export default Field;