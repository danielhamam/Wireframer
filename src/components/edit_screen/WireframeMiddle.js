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
import { ResizableBox } from 'react-resizable';
import Resizable from 're-resizable';
import DragResizeContainer from 'react-drag-resize';
import { List } from 'react-movable';
import {Rnd} from 'react-rnd';

class WireframeMiddle extends Component {
  state = {
    item : this.props.item,
    control_x_position : this.props.item.control_x_position,
    control_y_position : this.props.item.control_y_position,
    control_width: this.props.item.control_width,
    control_height : this.props.item.control_height,
    control_text : this.props.item.control_text,
    control_font_size : this.props.item.control_font_size,
    control_background : this.props.item.control_background,
    control_border_color : this.props.item.control_border_color,
    control_text_color : this.props.item.control_text_color,
    control_border_thickness : this.props.item.control_border_thickness,
    control_border_radius : this.props.item.control_border_radius,
    
    rerender : false,
    isSelected : false,
    selected_name : "",
    deselect : false,
    delete_item : false,

    top: 40, // drag bounds
    left: 40 // drag bounds

  }

checkKeyPress = (e) => {
  e.preventDefault();
  if (e.keyCode == 8 || e.key === "Delete") {
    e.preventDefault();
    this.props.deleteItem(this.props.item);
    // let index = this.props.wireframe.items.indexOf(this.props.item);
    // this.setState({delete_item : true});
    // this.props.wireframe.items.splice( index, 1 );
    // let x = this.props.wireframe.items;
    document.getElementById("font_size_textfield").value = "";
    document.getElementById("textfield_input").value = "";
    document.getElementById("text_color_field").value = "#000000";
    document.getElementById("background_field").value = "#000000";
    document.getElementById("border_color_field").value = "#000000";
    document.getElementById("border_thickness_field").value = "";
    document.getElementById("border_radius_field").value = "";
  }
  else if (e.keyCode == 68 && e.ctrlKey) {
    e.preventDefault();
    this.props.duplicateItem(this.props.item);
  }
}

checkDraggable = () => {
  
  if (this.state.isSelected) {
    return false;
  }
  else {
    return true;
  }
}

saveProps = () => {

  this.props.item.control_width = this.state.control_width;
  this.props.item.control_height = this.state.control_height; 
  this.props.item.control_text = this.state.control_text;
  this.props.item.control_font_size = this.state.control_font_size;
  this.props.item.control_background = this.state.control_background; 
  this.props.item.control_border_color = this.state.control_border_color; 
  this.props.item.control_text_color = this.state.control_text_color;
  this.props.item.control_border_thickness = this.state.control_border_thickness;
  this.props.item.control_border_radius = this.state.control_border_radius;

  let pointer = document.getElementsByClassName("react-draggable-dragged");

  if (pointer.length > 0) {

    let string = pointer[0].style.transform;
    let substring = string.substring(10); // skip past "translation("
    substring = substring.replace(")", "");
    substring = substring.replace(",", "");
    substring = substring.replace("px", " ");
    substring = substring.replace("px", " ");
    substring = substring.split(" ");

    this.state.control_x_position = substring[0];
    this.state.control_y_position = substring[2];

    this.props.item.control_x_position = this.state.control_x_position; 
    this.props.item.control_y_position = this.state.control_y_position; 

  }
}

deselectItem = (e) => {

  if (e.target.className != "middle_screen") {
    
    return;
  }

  if (this.state.isSelected) {
  this.state.control_text = document.getElementById("textfield_input").value;
  this.state.control_font_size = document.getElementById("font_size_textfield").value;
  this.state.control_text_color = document.getElementById("text_color_field").value;
  this.state.control_background = document.getElementById("background_field").value;
  this.state.control_border_color = document.getElementById("border_color_field").value;
  this.state.control_border_thickness = document.getElementById("border_thickness_field").value;
  this.state.control_border_radius = document.getElementById("border_radius_field").value;

  document.getElementById("font_size_textfield").value = "";
  document.getElementById("textfield_input").value = "";
  document.getElementById("text_color_field").value = "#000000";
  document.getElementById("background_field").value = "#000000";
  document.getElementById("border_color_field").value = "#000000";
  document.getElementById("border_thickness_field").value = "";
  document.getElementById("border_radius_field").value = "";
  }

  if (this.props.item.control == "button" && this.state.isSelected) {
    
    
    let border = document.getElementsByClassName("item_border");
    let one = document.getElementsByClassName("rectangle1_button");
    let two = document.getElementsByClassName("rectangle2_button");
    let three = document.getElementsByClassName("rectangle3_button");
    let four = document.getElementsByClassName("rectangle4_button");

    border[0].classList.remove("item_border");
    one[0].classList.remove('rectangle1_button');
    two[0].classList.remove('rectangle2_button');
    three[0].classList.remove('rectangle3_button');
    four[0].classList.remove('rectangle4_button');
  }

  else if (this.props.item.control == "label" && this.state.isSelected) {
    
    let border = document.getElementsByClassName("item_border");
    let one = document.getElementsByClassName("rectangle1_label");
    let two = document.getElementsByClassName("rectangle2_label");
    let three = document.getElementsByClassName("rectangle3_label");
    let four = document.getElementsByClassName("rectangle4_label");

    border[0].classList.remove("item_border");
    one[0].classList.remove('rectangle1_label');
    two[0].classList.remove('rectangle2_label');
    three[0].classList.remove('rectangle3_label');
    four[0].classList.remove('rectangle4_label');
  }

  else if (this.props.item.control == "textfield" && this.state.isSelected) {
    
    let border = document.getElementsByClassName("item_border");
    let one = document.getElementsByClassName("rectangle1_textfield");
    let two = document.getElementsByClassName("rectangle2_textfield");
    let three = document.getElementsByClassName("rectangle3_textfield");
    let four = document.getElementsByClassName("rectangle4_textfield");

    border[0].classList.remove("item_border");
    one[0].classList.remove('rectangle1_textfield');
    two[0].classList.remove('rectangle2_textfield');
    three[0].classList.remove('rectangle3_textfield');
    four[0].classList.remove('rectangle4_textfield');
  }

  else if (this.props.item.control == "container" && this.state.isSelected) {
    
    let border = document.getElementsByClassName("item_border");
    let one = document.getElementsByClassName("rectangle1_container");
    let two = document.getElementsByClassName("rectangle2_container");
    let three = document.getElementsByClassName("rectangle3_container");
    let four = document.getElementsByClassName("rectangle4_container");

    border[0].classList.remove("item_border");
    one[0].classList.remove('rectangle1_container');
    two[0].classList.remove('rectangle2_container');
    three[0].classList.remove('rectangle3_container');
    four[0].classList.remove('rectangle4_container');
  }

  this.setState({isSelected : false})
}

selectItem = (e) => {

  if (this.props.item.control == "button") {
    
    if (this.state.isSelected == false && document.getElementsByClassName("rectangle1_button").length <= 0 && 
    document.getElementsByClassName("rectangle1_label").length <= 0 && document.getElementsByClassName("rectangle1_textfield").length <= 0 &&
    document.getElementsByClassName("rectangle1_container").length <= 0 ) {

    // Select
    document.getElementById(e.currentTarget.id).classList.add("item_border"); 
    document.getElementById(e.currentTarget.parentElement.firstElementChild.childNodes[0].id).classList.add("rectangle1_button");
    document.getElementById(e.currentTarget.parentElement.firstElementChild.childNodes[1].id).classList.add("rectangle2_button");
    document.getElementById(e.currentTarget.nextElementSibling.childNodes[0].id).classList.add("rectangle3_button");
    document.getElementById(e.currentTarget.nextElementSibling.childNodes[1].id).classList.add("rectangle4_button");

    // Add properties
    
    document.getElementById("font_size_textfield").value = this.state.control_font_size;
    document.getElementById("textfield_input").value = this.state.control_text;
    document.getElementById("text_color_field").value = this.state.control_text_color;
    document.getElementById("background_field").value = this.state.control_background; // background color
    document.getElementById("border_color_field").value = this.state.control_border_color; // background color
    document.getElementById("border_thickness_field").value = this.state.control_border_thickness;
    document.getElementById("border_radius_field").value = this.state.control_border_radius;
    this.setState({isSelected : true});
  }
  else if (this.state.isSelected == true || this.state.delete_item) {

    // Deselect
    document.getElementById(e.currentTarget.id).classList.remove("item_border");
    document.getElementById(e.currentTarget.parentElement.firstElementChild.childNodes[0].id).classList.remove("rectangle1_button");
    document.getElementById(e.currentTarget.parentElement.firstElementChild.childNodes[1].id).classList.remove("rectangle2_button");
    document.getElementById(e.currentTarget.nextElementSibling.childNodes[0].id).classList.remove("rectangle3_button");
    document.getElementById(e.currentTarget.nextElementSibling.childNodes[1].id).classList.remove("rectangle4_button");

    // Remove properties 
    this.state.control_text = document.getElementById("textfield_input").value;
    this.state.control_font_size = document.getElementById("font_size_textfield").value;
    this.state.control_text_color = document.getElementById("text_color_field").value;
    this.state.control_background = document.getElementById("background_field").value;
    this.state.control_border_color = document.getElementById("border_color_field").value;
    this.state.control_border_thickness = document.getElementById("border_thickness_field").value;
    this.state.control_border_radius = document.getElementById("border_radius_field").value;
    document.getElementById("font_size_textfield").value = "";
    document.getElementById("textfield_input").value = "";
    document.getElementById("text_color_field").value = "#000000";
    document.getElementById("background_field").value = "#000000";
    document.getElementById("border_color_field").value = "#000000";
    document.getElementById("border_thickness_field").value = "";
    document.getElementById("border_radius_field").value = "";

    this.setState({isSelected : false});
  }
}
  
  else if (this.props.item.control == "label" ) {

    if (this.state.isSelected == false && document.getElementsByClassName("rectangle1_button").length <= 0 && 
    document.getElementsByClassName("rectangle1_label").length <= 0 && document.getElementsByClassName("rectangle1_textfield").length <= 0 &&
    document.getElementsByClassName("rectangle1_container").length <= 0 ) {
    
    // Select 
    document.getElementById(e.currentTarget.id).classList.add("item_border"); 
    document.getElementById(e.currentTarget.parentElement.firstElementChild.childNodes[0].id).classList.add("rectangle1_label");
    document.getElementById(e.currentTarget.parentElement.firstElementChild.childNodes[1].id).classList.add("rectangle2_label");
    document.getElementById(e.currentTarget.nextElementSibling.childNodes[0].id).classList.add("rectangle3_label");
    document.getElementById(e.currentTarget.nextElementSibling.childNodes[1].id).classList.add("rectangle4_label");

    // Add properties
    document.getElementById("font_size_textfield").value = this.state.control_font_size;
    document.getElementById("textfield_input").value = this.state.control_text;
    document.getElementById("text_color_field").value = this.state.control_text_color;
    document.getElementById("background_field").value = this.state.control_background; // background color
    document.getElementById("border_color_field").value = this.state.control_border_color; // background color
    document.getElementById("border_thickness_field").value = this.state.control_border_thickness;
    document.getElementById("border_radius_field").value = this.state.control_border_radius;
    this.setState({isSelected : true});
    }
    else if (this.state.isSelected == true) {

    // Deselect
    document.getElementById(e.currentTarget.id).classList.remove("item_border"); 
    document.getElementById(e.currentTarget.parentElement.firstElementChild.childNodes[0].id).classList.remove("rectangle1_label");
    document.getElementById(e.currentTarget.parentElement.firstElementChild.childNodes[1].id).classList.remove("rectangle2_label");
    document.getElementById(e.currentTarget.nextElementSibling.childNodes[0].id).classList.remove("rectangle3_label");
    document.getElementById(e.currentTarget.nextElementSibling.childNodes[1].id).classList.remove("rectangle4_label");

    // Remove properties
    this.state.control_text = document.getElementById("textfield_input").value;
    this.state.control_font_size = document.getElementById("font_size_textfield").value;
    this.state.control_text_color = document.getElementById("text_color_field").value;
    this.state.control_background = document.getElementById("background_field").value;
    this.state.control_border_color = document.getElementById("border_color_field").value;
    this.state.control_border_thickness = document.getElementById("border_thickness_field").value;
    this.state.control_border_radius = document.getElementById("border_radius_field").value;
    document.getElementById("font_size_textfield").value = "";
    document.getElementById("textfield_input").value = "";
    document.getElementById("text_color_field").value = "#000000";
    document.getElementById("background_field").value = "#000000";
    document.getElementById("border_color_field").value = "#000000";
    document.getElementById("border_thickness_field").value = "";
    document.getElementById("border_radius_field").value = "";
    this.setState({isSelected : false});
    }
  }
  else if (this.props.item.control == "textfield" ) {

    if (this.state.isSelected == false && document.getElementsByClassName("rectangle1_button").length <= 0 && 
    document.getElementsByClassName("rectangle1_label").length <= 0 && document.getElementsByClassName("rectangle1_textfield").length <= 0 &&
    document.getElementsByClassName("rectangle1_container").length <= 0 ) {

    // Select
    document.getElementById(e.currentTarget.id).classList.add("item_border"); 
    document.getElementById(e.currentTarget.parentElement.firstElementChild.childNodes[0].id).classList.add("rectangle1_textfield");
    document.getElementById(e.currentTarget.parentElement.firstElementChild.childNodes[1].id).classList.add("rectangle2_textfield");
    document.getElementById(e.currentTarget.nextElementSibling.childNodes[0].id).classList.add("rectangle3_textfield");
    document.getElementById(e.currentTarget.nextElementSibling.childNodes[1].id).classList.add("rectangle4_textfield");

    // Add Properties
    document.getElementById("font_size_textfield").value = this.state.control_font_size;
    document.getElementById("textfield_input").value = this.state.control_text;
    document.getElementById("text_color_field").value = this.state.control_text_color;
    document.getElementById("background_field").value = this.state.control_background; // background color
    document.getElementById("border_color_field").value = this.state.control_border_color; // background color
    document.getElementById("border_thickness_field").value = this.state.control_border_thickness;
    document.getElementById("border_radius_field").value = this.state.control_border_radius;

    this.setState({isSelected : true});

    }
    else if (this.state.isSelected == true) {
    
    // Deselect
    document.getElementById(e.currentTarget.id).classList.remove("item_border"); 
    document.getElementById(e.currentTarget.parentElement.firstElementChild.childNodes[0].id).classList.remove("rectangle1_textfield");
    document.getElementById(e.currentTarget.parentElement.firstElementChild.childNodes[1].id).classList.remove("rectangle2_textfield");
    document.getElementById(e.currentTarget.nextElementSibling.childNodes[0].id).classList.remove("rectangle3_textfield");
    document.getElementById(e.currentTarget.nextElementSibling.childNodes[1].id).classList.remove("rectangle4_textfield");

    // Remove Properties 
    this.state.control_text = document.getElementById("textfield_input").value;
    this.state.control_font_size = document.getElementById("font_size_textfield").value;
    this.state.control_text_color = document.getElementById("text_color_field").value;
    this.state.control_background = document.getElementById("background_field").value;
    this.state.control_border_color = document.getElementById("border_color_field").value;
    this.state.control_border_thickness = document.getElementById("border_thickness_field").value;
    this.state.control_border_radius = document.getElementById("border_radius_field").value;
    document.getElementById("font_size_textfield").value = "";
    document.getElementById("textfield_input").value = "";
    document.getElementById("text_color_field").value = "#000000";
    document.getElementById("background_field").value = "#000000";
    document.getElementById("border_color_field").value = "#000000";
    document.getElementById("border_thickness_field").value = "";
    document.getElementById("border_radius_field").value = "";

    this.setState({isSelected : false});
    }
  }
  else if (this.props.item.control == "container" ) {
    // container
    if (this.state.isSelected == false && document.getElementsByClassName("rectangle1_button").length <= 0 && 
    document.getElementsByClassName("rectangle1_label").length <= 0 && document.getElementsByClassName("rectangle1_textfield").length <= 0 &&
    document.getElementsByClassName("rectangle1_container").length <= 0 ) {

    // Select Item
    document.getElementById(e.currentTarget.id).classList.add("item_border"); 
    document.getElementById(e.currentTarget.parentElement.firstElementChild.childNodes[0].id).classList.add("rectangle1_container");
    document.getElementById(e.currentTarget.parentElement.firstElementChild.childNodes[1].id).classList.add("rectangle2_container");
    document.getElementById(e.currentTarget.nextElementSibling.childNodes[0].id).classList.add("rectangle3_container");
    document.getElementById(e.currentTarget.nextElementSibling.childNodes[1].id).classList.add("rectangle4_container");

    // Add Properties
    document.getElementById("font_size_textfield").value = this.state.control_font_size;
    document.getElementById("textfield_input").value = this.state.control_text;
    document.getElementById("text_color_field").value = this.state.control_text_color;
    document.getElementById("background_field").value = this.state.control_background; // background color
    document.getElementById("border_color_field").value = this.state.control_border_color; // background color
    document.getElementById("border_thickness_field").value = this.state.control_border_thickness;
    document.getElementById("border_radius_field").value = this.state.control_border_radius;

    this.setState({isSelected : true});
    }

    else if (this.state.isSelected == true) {

    // Deselect
    document.getElementById(e.currentTarget.id).classList.remove("item_border"); 
    document.getElementById(e.currentTarget.parentElement.firstElementChild.childNodes[0].id).classList.remove("rectangle1_container");
    document.getElementById(e.currentTarget.parentElement.firstElementChild.childNodes[1].id).classList.remove("rectangle2_container");
    document.getElementById(e.currentTarget.nextElementSibling.childNodes[0].id).classList.remove("rectangle3_container");
    document.getElementById(e.currentTarget.nextElementSibling.childNodes[1].id).classList.remove("rectangle4_container");

    // Remove properties 
    this.state.control_text = document.getElementById("textfield_input").value;
    this.state.control_font_size = document.getElementById("font_size_textfield").value;
    this.state.control_text_color = document.getElementById("text_color_field").value;
    this.state.control_background = document.getElementById("background_field").value;
    this.state.control_border_color = document.getElementById("border_color_field").value;
    this.state.control_border_thickness = document.getElementById("border_thickness_field").value;
    this.state.control_border_radius = document.getElementById("border_radius_field").value;
    document.getElementById("font_size_textfield").value = "";
    document.getElementById("textfield_input").value = "";
    document.getElementById("text_color_field").value = "#000000";
    document.getElementById("background_field").value = "#000000";
    document.getElementById("border_color_field").value = "#000000";
    document.getElementById("border_thickness_field").value = "";
    document.getElementById("border_radius_field").value = "";

    this.setState({isSelected : false});
    }
  }
  this.saveProps(); // they all access this
}

changeButton = (e) => {
  this.setState({ control_text : e.target.value});
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
      <ClickOutHandler onClickOut={this.deselectItem}>
      <Draggable disabled={this.checkDraggable()} bounds="#dimension" defaultPosition={{x: parseInt(this.state.control_x_position, 10), y: parseInt(this.state.control_y_position, 10)}}>
      <div id="movable" tabIndex="0" onKeyDown={(e) => this.checkKeyPress(e)}> 

        <div id={key2} > 
          <span id={inner1}/>
          <span id={inner2}/>
        </div>

        <div className={"prompt_text2 control_move"} style={{width: this.state.control_width + "px", height: this.state.control_height + "px", 
        fontSize: this.state.control_font_size + 'pt', backgroundColor: this.state.control_background, borderColor: this.state.control_border_color, 
        color: this.state.control_text_color, borderWidth: this.state.control_border_thickness + "px", borderRadius: this.state.control_border_radius + "px"}} 
        id={key} onClick = {this.selectItem} > {this.state.control_text} </div>

        <div id={key3}> 
          <span id={inner3}/>
          <span id={inner4}/>
        </div>

      </div>
      </Draggable>
      </ClickOutHandler> 
    )
  }
  else if (name == "textfield") {

    return (

      <ClickOutHandler onClickOut={this.deselectItem}>
      <Draggable disabled={this.checkDraggable()} bounds="#dimension" defaultPosition={{x: parseInt(this.state.control_x_position, 10), y: parseInt(this.state.control_y_position, 10)}}>

      <div id="movable" tabIndex="0" onKeyDown={(e) => this.checkKeyPress(e)} > 

        <div id={key2} > 
          <span id={inner1} />
          <span id={inner2} />
        </div>

          <input type="input" id={key} className={"textfield_input2 control_move"} placeholder="Input" 
          style={{width: this.state.control_width + "px", height: this.state.control_height + "px", 
          fontSize: this.state.control_font_size + 'pt', backgroundColor: this.state.control_background, 
          borderColor: this.state.control_border_color, color: this.state.control_text_color, borderWidth: this.state.control_border_thickness + "px",
           borderRadius: this.state.control_border_radius + "px"}}  onLoad={this.selectItem} onClick = {this.selectItem} 
           onClickOut={this.deselectItem} value={this.state.control_text} /> 

        <div id={key3}>
          <span id={inner3} />
          <span id={inner4} />
        </div>

      </div>

      </Draggable>
      </ClickOutHandler>
    )
  }
  else if (name == "button") {

    return (
      <ClickOutHandler onClickOut={this.deselectItem}>
      <Draggable disabled={this.checkDraggable()} bounds="#dimension" defaultPosition={{x: parseInt(this.state.control_x_position, 10), y: parseInt(this.state.control_y_position, 10)}}>

      <div id="movable" className="position" tabIndex="0" onKeyDown={(e) => this.checkKeyPress(e)}>  

{/* <div className="resize_element" style={{width: this.state.control_width + "px", height: this.state.control_height + "px"}} >  */}

      <div id={key2}> 
        <span id={inner1} />
        <span id={inner2} />
      </div>
        
        <button className={"button_submit2 control_move"} style={{width: this.state.control_width + "px", height: this.state.control_height + "px", 
        fontSize: this.state.control_font_size + 'pt', backgroundColor: this.state.control_background, borderColor: this.state.control_border_color, 
        color: this.state.control_text_color, borderWidth: this.state.control_border_thickness + "px", borderRadius: this.state.control_border_radius + "px"}} 
        id={key} onClick = {this.selectItem} onClickOut={this.selectItem}> {this.state.control_text} </button>

        <div id={key3}>
          <span id={inner3} />
          <span id={inner4} />
        </div>

        </div>
      </Draggable>
      </ClickOutHandler>
    )
  }
  else if (name == "container") {
    
    return (

      <ClickOutHandler onClickOut={this.deselectItem}>
      <Draggable disabled={this.checkDraggable()} bounds="#dimension" defaultPosition={{x: parseInt(this.state.control_x_position, 10), y: parseInt(this.state.control_y_position, 10)}}>
      {/* bounds={{left: -35 , top: 0, right: this.props.width - 217 , bottom: this.props.height - 30 }} */}
      <div id="movable" tabIndex="0" onKeyDown={(e) => this.checkKeyPress(e)}>
        
        <div id={key2}> 
          <span id={inner1} />
          <span id={inner2} />
        </div>

        <div className={"container_box2 control_move"} style={{width: this.state.control_width + "px", height: this.state.control_height + "px", 
        fontSize: this.state.control_font_size + 'pt', backgroundColor: this.state.control_background, borderColor: this.state.control_border_color, 
        color: this.state.control_text_color, borderWidth: this.state.control_border_thickness + "px", borderRadius: this.state.control_border_radius + "px"}} 
        id={key} onClick = {this.selectItem}> {this.state.control_text} </div>

        <div id={key3}> 
          <span id={inner3} />
          <span id={inner4} />
        </div>
      </div>

      </Draggable>
      </ClickOutHandler>
  )
  }
}

render() {

return (
  <div id="control_spawn">
    <div id="resize_element"  > 
      {this.checkControl()} 
    </div>
  </div>
        );
    }
}

export default WireframeMiddle;