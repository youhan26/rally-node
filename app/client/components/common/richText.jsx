/**
 * Created by YouHan on 2016/10/20.
 */

'use strict';

require('./../../node_modules/quill/dist/quill.snow.css');

import React, {PropTypes} from "react";
import Quill from "quill";
import uuid from "uuid";
const Delta = Quill.import('delta');


/**
 * feature:
 * onChange : func,
 * value : string,
 * readOnly : bool,
 * placeholder : string
 */
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
        const quill = new Quill(this._editorEl, {
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
        });
        var toolbar = quill.getModule('toolbar');
        toolbar.addHandler('image', function () {
            let fileInput = this.container.querySelector('input.ql-image[type=file]');
            if (fileInput == null) {
                fileInput = document.createElement('input');
                fileInput.setAttribute('type', 'file');
                fileInput.setAttribute('accept', 'image/png, image/gif, image/jpeg, image/bmp, image/x-icon, image/x-quicktime');
                fileInput.classList.add('ql-image');
                fileInput.addEventListener('change', () => {
                    if (fileInput.files != null && fileInput.files[0] != null) {
                        let reader = new FileReader();
                        reader.onload = (e) => {
                            let range = quill.getSelection(true);
                            quill.updateContents(new Delta()
                                    .retain(range.index)
                                    .delete(range.length)
                                    .insert({image: e.target.result})
                                , 'user');
                            fileInput.value = "";
                        };
                        reader.readAsDataURL(fileInput.files[0]);
                    }
                });
                this.container.appendChild(fileInput);
            }
            fileInput.click();
        });
        return quill;
    },
    componentDidMount(){
        const me = this;
        if (this._editorEl) {
            me._editor = me.getQuill();
            me._editor.on('text-change', function (newData, oldData, source) {
                if (source === 'user') {
                    me.props.onChange(me.getEditorContents());
                }
            });
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
});


export default RichText;