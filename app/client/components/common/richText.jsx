***REMOVED***
 * Created by YouHan on 2016/10/20.
***REMOVED***

'use strict';

require('./../../node_modules/quill/dist/quill.snow.css');

import React, {PropTypes} from "react";
import Quill from "quill";
import uuid from "uuid";

***REMOVED***
 * feature:
 * onChange : func,
 * value : string,
 * readOnly : bool,
 * placeholder : string
***REMOVED***
const RichText = React.createClass({
    propTypes: {
        onChange: PropTypes.func,
        placeholder: PropTypes.string,
        value: PropTypes.string,
        readOnly: PropTypes.bool
    },
    getDefaultProps (){
        return {
            placeholder: '',
            readOnly: false,
            value: '',
            onChange: () => {
            }
        };
    },
    getInitialState(){
        return {
            value: this.props.value,
            id: uuid.v1()
        }
    },
    componentWillReceiveProps: function (nextProps) {
        const editor = this._editor;
        if (editor) {
            if ('value' in nextProps) {
                if (nextProps.value != this.getEditorContents()) {
                    this.setEditorContents(nextProps.value);
                }
            }
            if ('readOnly' in nextProps) {
                if (nextProps.readOnly != this.props.readOnly) {
                    editor.enable(!nextProps.readOnly);
                }
            }
        }
    },
    getEditorContents(){
        const editor = this._editor;
        if (editor && editor.getContents) {
            return JSON.stringify(editor.getContents());
        }
    },
    setEditorContents(value){
        if (this._editor && value) {
            this._editor.setContents(JSON.parse(value));
        }
    },
    getQuill (){
        const me = this;
        return new Quill(this._editorEl, {
            modules: {
                toolbar: [
                    ['bold', 'italic', 'underline', 'strike'],
                    [{'list': 'ordered'}, {'list': 'bullet'}],
                    [{'script': 'sub'}, {'script': 'super'}],
                    [{'header': [1, 2, 3, 4, 5, 6, false]}],
                    [{'color': []}, {'background': []}],
                    [{'font': []}],
                    [{'align': []}],
                    ['image']
                ]
            },
            placeholder: me.props.placeholder,
            theme: 'snow',
            readOnly: me.props.readOnly,
            strict: true
        })
    },
    componentDidMount(){
        const me = this;
        if (this._editorEl) {
            me._editor = me.getQuill();
            me._editor.on('text-change', function (newData, oldData, source) {
                if (source === 'user') {
                    me.props.onChange(me.getEditorContents());
                }
            ***REMOVED***
        }
    },
    onChange(event: Event){
        event.preventDefault();
        event.stopPropagation();
    },
    render(){
        return <div ref={(el) =>{
            this._editorEl = el;
        }} {...this.props} id={this.state.id} onChange={this.onChange}>
        </div>;
    }
***REMOVED***


export default RichText;