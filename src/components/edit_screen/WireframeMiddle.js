import React, { Component } from 'react';
import Draggable from 'react-draggable';
import { SelectableGroup , createSelectable } from 'react-selectable';
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import { getFirestore } from 'redux-firestore';
import ReactDOM from 'react-dom';
import onClickOutside from 'react-onclickoutside';
import onOutsideClick from 'react-onclickoutside';
import OutsideClickHandler from 'react-outside-click-handler';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import ClickOutHandler from 'react-onclickout';

class WireframeMiddle extends Component {
  state = {
    item : this.props.item,
    rerender : false,
    isSelected : false,
    selected_name : "",
    deselectAll : false,
  }

selectItem = (e) => {
  // Make 4 rectangles in corners pop up
  // e.preventDefault();

  if (this.state.deselectAll) {
    document.getElementById(e.currentTarget.id).style.border  = "";
    document.getElementById(e.currentTarget.parentElement.firstElementChild.id).classList.remove("rectangle1_button");
    document.getElementById(e.currentTarget.parentElement.lastElementChild.id).classList.remove("rectangle2_button");
    document.getElementById(e.currentTarget.nextElementSibling.firstElementChild.id).classList.remove("rectangle3_button");
    document.getElementById(e.currentTarget.nextElementSibling.lastElementChild.id).classList.remove("rectangle4_button");
    this.setState({deselectAll : false});
  }

  if (this.props.item.control == "button") {
    
    if (this.state.isSelected == false) {

    // Select
    document.getElementById(e.currentTarget.id).style.border  = "1px solid #000000";
    document.getElementById(e.currentTarget.parentElement.firstElementChild.id).classList.add("rectangle1_button");
    document.getElementById(e.currentTarget.parentElement.lastElementChild.id).classList.add("rectangle2_button");
    document.getElementById(e.currentTarget.nextElementSibling.firstElementChild.id).classList.add("rectangle3_button");
    document.getElementById(e.currentTarget.nextElementSibling.lastElementChild.id).classList.add("rectangle4_button");

    // Add properties
    document.getElementById("font_size_textfield").value = this.state.item.control_font_size;
    document.getElementById("textfield_input").value = this.state.item.control_text;
    document.getElementById("background_field").value = this.state.item.control_background;
    document.getElementById(e.currentTarget.id).style.color = this.state.item.control_background;
    this.setState({isSelected : true});
  }
  else if (this.state.isSelected == true) {

    // Deselect
    document.getElementById(e.currentTarget.id).style.border  = "";
    document.getElementById(e.currentTarget.parentElement.firstElementChild.id).classList.remove("rectangle1_button");
    document.getElementById(e.currentTarget.parentElement.lastElementChild.id).classList.remove("rectangle2_button");
    document.getElementById(e.currentTarget.nextElementSibling.firstElementChild.id).classList.remove("rectangle3_button");
    document.getElementById(e.currentTarget.nextElementSibling.lastElementChild.id).classList.remove("rectangle4_button");

    // Remove properties 
    document.getElementById("font_size_textfield").value = "";

    this.setState({isSelected : false});
  }
}
  
  else if (this.props.item.control == "label" ) {

    if (this.state.isSelected == false) {
    document.getElementById(e.currentTarget.id).style.border  = "1px solid #000000";
    document.getElementById(e.currentTarget.parentElement.firstElementChild.id).classList.add("rectangle1_label");
    document.getElementById(e.currentTarget.parentElement.lastElementChild.id).classList.add("rectangle2_label");
    document.getElementById(e.currentTarget.nextElementSibling.firstElementChild.id).classList.add("rectangle3_label");
    document.getElementById(e.currentTarget.nextElementSibling.lastElementChild.id).classList.add("rectangle4_label");
    this.setState({isSelected : true});
    }
    else if (this.state.isSelected == true) {
    document.getElementById(e.currentTarget.id).style.border  = "";
    document.getElementById(e.currentTarget.parentElement.firstElementChild.id).classList.remove("rectangle1_label");
    document.getElementById(e.currentTarget.parentElement.lastElementChild.id).classList.remove("rectangle2_label");
    document.getElementById(e.currentTarget.nextElementSibling.firstElementChild.id).classList.remove("rectangle3_label");
    document.getElementById(e.currentTarget.nextElementSibling.lastElementChild.id).classList.remove("rectangle4_label");
    this.setState({isSelected : false});
    }
  }
  else if (this.props.item.control == "textfield" ) {

    if (this.state.isSelected == false) {

    document.getElementById(e.currentTarget.id).style.border  = "1px solid #000000";
    document.getElementById(e.currentTarget.parentElement.firstElementChild.id).classList.add("rectangle1_textfield");
    document.getElementById(e.currentTarget.parentElement.lastElementChild.id).classList.add("rectangle2_textfield");
    document.getElementById(e.currentTarget.nextElementSibling.firstElementChild.id).classList.add("rectangle3_textfield");
    document.getElementById(e.currentTarget.nextElementSibling.lastElementChild.id).classList.add("rectangle4_textfield");
    this.setState({isSelected : true});

    }
    else if (this.state.isSelected == true) {
    document.getElementById(e.currentTarget.id).style.border  = "";
    document.getElementById(e.currentTarget.parentElement.firstElementChild.id).classList.remove("rectangle1_textfield");
    document.getElementById(e.currentTarget.parentElement.lastElementChild.id).classList.remove("rectangle2_textfield");
    document.getElementById(e.currentTarget.nextElementSibling.firstElementChild.id).classList.remove("rectangle3_textfield");
    document.getElementById(e.currentTarget.nextElementSibling.lastElementChild.id).classList.remove("rectangle4_textfield");
    this.setState({isSelected : false});
    }
  }
  else if (this.props.item.control == "container" ) {
    // container
    if (this.state.isSelected == false) {

    document.getElementById(e.currentTarget.id).style.border  = "1px solid #000000";
    document.getElementById(e.currentTarget.parentElement.firstElementChild.id).classList.add("rectangle1_container");
    document.getElementById(e.currentTarget.parentElement.lastElementChild.id).classList.add("rectangle2_container");
    document.getElementById(e.currentTarget.nextElementSibling.firstElementChild.id).classList.add("rectangle3_container");
    document.getElementById(e.currentTarget.nextElementSibling.lastElementChild.id).classList.add("rectangle4_container");
    this.setState({isSelected : true});
    }

    else if (this.state.isSelected == true) {

    document.getElementById(e.currentTarget.id).style.border  = "";
    document.getElementById(e.currentTarget.parentElement.firstElementChild.id).classList.add("rectangle1_container");
    document.getElementById(e.currentTarget.parentElement.lastElementChild.id).classList.add("rectangle2_container");
    document.getElementById(e.currentTarget.nextElementSibling.firstElementChild.id).classList.add("rectangle3_container");
    document.getElementById(e.currentTarget.nextElementSibling.lastElementChild.id).classList.add("rectangle4_container");
    this.setState({isSelected : false});
    }
  }
}


deselectItem = (e) => {
  this.setState({deselectAll : true});
}

checkControl = () => {
  // Check control, make it container_box (container), prompt_text (label), buttom_submit (button), textfield_input (textfield)
  // const node = this.useRef();
  let name = this.state.item.control;

  let generating = Math.floor(Math.random() * 10000) + 100; 
  let generating2 = Math.floor(Math.random() * 10000) + 100; 
  let generating3 = Math.floor(Math.random() * 10000) + 100;
  let generating4 = Math.floor(Math.random() * 10000) + 100; 
  let generating5 = Math.floor(Math.random() * 10000) + 100; 
  let generating6 = Math.floor(Math.random() * 10000) + 100; 
  let generating7 = Math.floor(Math.random() * 10000) + 100; 
  
  let key = generating + "";
  let key2 = generating2 + "";
  let key3 = generating3 + "";
  let inner1 = generating4 + "";
  let inner2 = generating5 + "";
  let inner3 = generating6 + "";
  let inner4 = generating7 + "";

  if (name == "label") {

    return (
      <Draggable>
      <div id="movable"> 
        {/* <div id={"visible_label1"}>  */}
        <div id={key2} > 
          <span id={inner1}/>
          <span id={inner2}/>
        </div>
        <div className={"prompt_text2 control_move"} id={key} onClick = {this.selectItem} > Prompt for input: </div>
        <div id={key3}> 
          <span id={inner3}/>
          <span id={inner4}/>
        </div>
      </div>
      </Draggable>
    )
  }
  else if (name == "textfield") {

    return (
      <Draggable>
      {/* <ClickOutHandler onClickOut={this.deselectItem} />  */}
      <div id="movable" > 
        <div id={key2} > 
          <span id={inner1} />
          <span id={inner2} />
        </div>
          <input type="input" id={key} className={"textfield_input control_move"} placeholder="Input" onLoad={this.selectItem} onClick = {this.selectItem} onClickOut={this.deselectItem}/>
        <div id={key3}>
          <span id={inner3} />
          <span id={inner4} />
        </div>
      </div>
      {/* </ClickOutHandler> */}
      </Draggable>
    )
  }
  else if (name == "button") {

    return (
      <Draggable>
      <div id="movable">  
      <ClickOutHandler onClickOut={this.deselectAll} >
      <div id={key2}> 
        <span id={inner1} />
        <span id={inner2} />
      </div>
        <button className={"button_submit control_move"} id={key} onClick = {this.selectItem} > Submit </button>
        <div id={key3}>
          <span id={inner3} />
          <span id={inner4} />
        </div>
        </ClickOutHandler>
      </div>
    </Draggable>
    )
  }
  else {
    // it is a container
    return (
      <Draggable>
      <div id="movable" >
        <div id={key2}> 
          <span id={inner1} />
          <span id={inner2} />
        </div>
        <div className={"container_box control_move"} id={key} onClick = {this.selectItem}> </div>
        <div id={key3}> 
          <span id={inner3} />
          <span id={inner4} />
        </div>
      </div>
      </Draggable>
  )
  }
}

render() {

return (
  <div >
    <div id="movable" > 
      {this.checkControl()} 
    </div>
  </div>
        );
    }
}

export default WireframeMiddle;