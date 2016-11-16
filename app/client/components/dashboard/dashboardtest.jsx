/**
 * Created by YouHan on 2016/11/2.
 */
import React, {Component, PropTypes} from "react";

require('./../../style/dashboard.css');

class DragItem extends Component {
  constructor(props) {
    super(props);
    
    this.onDragStart = this.onDragStart.bind(this);
    this.onDragEnd = this.onDragEnd.bind(this);
  }
  
  componentDidMount() {
    if (this.ref) {
      const ref = this.ref;
      ref.addEventListener('dragstart', this.onDragStart, false);
      ref.addEventListener('dragend', this.onDragEnd, false);
    }
  }
  
  static onDragEnd(e) {
    e.target.style.opacity = 1;
  }
  
  static onDragStart(e) {
    // const transfer = e.dataTransfer;
    const target = e.target;
    target.style.opacity = 0.5;
    // this.ref.dataTransfer.setData();
  }
  
  render() {
    return (
      <div
        ref={(value) => {
          this.ref = value;
        }}
        draggable={true}
        className="section-item">
        {this.props.index}
      </div>
    );
  }
}
DragItem.propTypes = {
  index: PropTypes.string
};

class DragContainer extends Component {
  constructor(props) {
    super(props);
    
    this.onDragOver = this.onDragOver.bind(this);
    this.onDragEnter = this.onDragEnter.bind(this);
    this.onDragLeave = this.onDragLeave.bind(this);
  }
  
  componentDidMount() {
    if (this.ref) {
      const target = this.ref;
      target.addEventListener('dragover', this.onDragOver, false);
      target.addEventListener('dragenter', this.onDragEnter, false);
      target.addEventListener('dragleave', this.onDragLeave, false);
    }
  }
  
  static onDragEnter(e) {
    if (e) {
      e.preventDefault();
      e.target.classList.add('over');
    }
  }
  
  static onDragLeave(e) {
    if (e) {
      e.preventDefault();
      e.target.classList.remove('over');
    }
  }
  
  render() {
    return (
      <div
        className="section"
        ref={(value) => {
          this.ref = value;
        }}>
        {this.props.children}
      </div>
    );
  }
}
DragContainer.propTypes = {
  children: PropTypes.shape({})
};


// const Dashboard1 = () => {
//   return (
//     <div className="form">
//       <DragContainer>
//         <DragItem index="11" />
//         <DragItem index="12" />
//         <DragItem index="13" />
//       </DragContainer>
//       <DragContainer>
//         <DragItem index="21" />
//         <DragItem index="22" />
//         <DragItem index="23" />
//       </DragContainer>
//       <DragContainer>
//         <DragItem index="31" />
//         <DragItem index="32" />
//         <DragItem index="33" />
//       </DragContainer>
//     </div>
//   );
// };
