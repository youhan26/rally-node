***REMOVED***
 * Created by YouHan on 2016/10/20.
***REMOVED***

/* @flow***REMOVED***
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
        placeholder: PropTypes.string
    },
    getDefaultProps (){
        return {
            placeholder: '',
            readOnly: false,
            value: ''
        };
    },
    getInitialState(){
        return {
            value: this.props.value,
            id: uuid.v1()
        }
    },
    componentWillReceiveProps: function (nextProps) {
        var editor = this._editor;
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
        if (this._editor) {
            return JSON.stringify(this._editor.getContents());
        }
    },
    setEditorContents(value){
        if (this._editor) {
            this._editor.setContents(JSON.parse(value));
        }
    },
    componentDidMount(){
        var me = this;
        if (this._editorEl) {
            me._editor = new Quill(this._editorEl, {
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
            ***REMOVED***
            me._editor.on('text-change', function (newData, oldData, source) {
                if(source === 'user'){
                    var value = me._editor.getContents();
                    me.props.onChange && me.props.onChange(me.getEditorContents());
                }
            ***REMOVED***
        }
    },
    onChange(event){
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




