import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import { getFirestore } from 'redux-firestore';

class WireframeMiddle extends Component {
  state = {
    item : this.props.item,
    rerender : false,
  }

selectItem = (e) => {
  // Make 4 rectangles in corners pop up
  document.getElementById(e.target.id).style.border  = "1.5px solid #000000";
}

deselectItem = (e) => {
  document.getElementById(e.target.id).style.border  = "";
}

checkControl = () => {
  // Check control, make it container_box (container), prompt_text (label), buttom_submit (button), textfield_input (textfield)
  let name = this.state.item.control;
  if (name == "label") {
    let generating = Math.floor(Math.random() * 10000) + 100; 
    let key = generating + "";
    return (<div className={"prompt_text2 control_move"} id={key} onClick = {this.selectItem}> Prompt for input:</div>)
  }
  else if (name == "textfield") {
    let generating = Math.floor(Math.random() * 10000) + 100; 
    let key = generating + "";
    return (<input type="input" id={key} className={"textfield_input control_move"} placeholder="Input" onClick = {this.selectItem}/>)
  }
  else if (name == "button") {
    let generating = Math.floor(Math.random() * 10000) + 100; 
    let key = generating + "";
    return (<button className={"button_submit control_move"} id={key} onClick = {this.selectItem}> Submit</button>)
  }
  else {
    // it is a container
    let generating = Math.floor(Math.random() * 10000) + 100; 
    let key = generating + "";
    return (<div className={"container_box control_move"} id={key} onClick = {this.selectItem}> </div>)
  }
}

render() {

return (
    <div style={this.state.item.selected_border}>
      {this.checkControl()} 
    </div>
        );
    }
}

export default WireframeMiddle;