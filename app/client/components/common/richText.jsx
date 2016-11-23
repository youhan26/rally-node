/**
 * Created by YouHan on 2016/10/20.
 */
import React, {PropTypes, Component} from "react";
import Quill from "quill";
import uuid from "uuid";

require('./../../node_modules/quill/dist/quill.snow.css');

const Delta = Quill.import('delta');


/**
 * feature:
 * onChange : func,
 * value : string,
 * readOnly : bool,
 * placeholder : string
 */

export default class RichText extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      value: this.props.value,
      id: uuid.v1()
    };
    this.placeholder = this.props.placeholder;
  }
  
  componentWillReceiveProps(nextProps) {
    const editor = this.quillEditor;
    if (editor) {
      if ('value' in nextProps) {
        if (nextProps.value !== this.getEditorContents()) {
          this.setEditorContents(nextProps.value);
        }
      }
      if ('readOnly' in nextProps) {
        if (nextProps.readOnly !== this.props.readOnly) {
          editor.enable(!nextProps.readOnly);
        }
      }
    }
  }
  
  getEditorContents() {
    const editor = this.quillEditor;
    if (editor && editor.getContents) {
      return JSON.stringify(editor.getContents());
    }
    return null;
  }
  
  setEditorContents(value) {
    if (this.quillEditor && value) {
      this.quillEditor.setContents(JSON.parse(value));
    }
  }
  
  getQuill() {
    const me = this;
    let toolbar2 = [
      ['bold', 'italic', 'underline', 'strike'],
      [{list: 'ordered'}, {list: 'bullet'}],
      [{script: 'sub'}, {script: 'super'}],
      [{header: [1, 2, 3, 4, 5, 6, false]}],
      [{color: []}, {background: []}],
      [{font: []}],
      [{align: []}],
      ['image']
    ];
    if (this.props.disabled) {
      toolbar2 = null;
    }
    const quill = new Quill(this.editorEl, {
      modules: {
        toolbar: toolbar2
      },
      placeholder: me.placeholder,
      theme: 'snow',
      readOnly: me.props.readOnly,
      strict: true
    });
    if (this.props.disabled) {
      quill.enable(false);
    } else {
      const toolbar = quill.getModule('toolbar');
      toolbar.addHandler('image', () => {
        let fileInput = this.container.querySelector('input.ql-image[type=file]');
        if (fileInput == null) {
          fileInput = document.createElement('input');
          fileInput.setAttribute('type', 'file');
          fileInput.setAttribute('accept', 'image/png, image/gif, image/jpeg, image/bmp');
          fileInput.classList.add('ql-image');
          fileInput.addEventListener('change', () => {
            if (fileInput.files != null && fileInput.files[0] != null) {
              const reader = new FileReader();
              reader.onload = (e) => {
                const range = quill.getSelection(true);
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
    }
    return quill;
  }
  
  componentDidMount() {
    const me = this;
    if (this.editorEl) {
      me.quillEditor = me.getQuill();
      me.quillEditor.on('text-change', (newData, oldData, source) => {
        if (source === 'user') {
          me.props.onChange(me.getEditorContents());
        }
      });
    }
  }
  
  static onChange(event) {
    event.preventDefault();
    event.stopPropagation();
  }
  
  render() {
    return (
      <div
        {...this.props}
        id={this.state.id}
        onChange={this.onChange}
        ref={(el) => {
          this.editorEl = el;
        }} />
    );
  }
}

RichText.propTypes = {
  placeholder: PropTypes.string,
  value: PropTypes.string,
  readOnly: PropTypes.bool,
  disabled: PropTypes.bool
};

RichText.defaultProps = {
  placeholder: '',
  readOnly: false,
  value: '',
  disabled: false,
  onChange: () => {
  }
};
