import React, { Component } from 'react';
import ClickOutHandler from 'react-onclickout'; 
import {Rnd} from 'react-rnd'; // resizable and draggable component for React.

class WireframeItem extends Component {
  state = {
    // State variables initialized to props value as start value
    control_x_position : this.props.item.control_x_position,
    control_y_position : this.props.item.control_y_position,

    rerender : false,
    isSelected : false,
    
    // drag bounds
    top: 40, 
    left: 40

  }
  
  setSelected = (toggleVal) => {
    this.setState({isSelected: toggleVal});
    if (toggleVal) this.props.setCurrSelection(toggleVal, this.props.item.id); // send the item to parent
    else this.props.setCurrSelection(toggleVal, null); // no item to send to parent
  }

checkKeyPress = (e) => {
  e.preventDefault();
  if (this.state.isSelected) {
    if (e.keyCode === 8 || e.key === "Delete") {
      document.getElementById("font_size_textfield").value = "";
      document.getElementById("textfield_input").value = "";
      document.getElementById("text_color_field").value = "#000000";
      document.getElementById("background_field").value = "#000000";
      document.getElementById("border_color_field").value = "#000000";
      document.getElementById("border_thickness_field").value = "";
      document.getElementById("border_radius_field").value = "";
      this.deselectItem(e);
      this.deleteItem(this.props.item);
    }
    else if (e.keyCode === 68 && e.ctrlKey) { // Ctrl + d to duplicate
      e.preventDefault();
      this.props.duplicateItem(this.props.item);
      this.postDuplicate();
      this.saveProps();
    }
  }
}

postDuplicate = () => {

  if (this.state.isSelected) {
    this.setState({control_text : document.getElementById("textfield_input").value});
    this.setState({control_font_size : document.getElementById("font_size_textfield").value});
    this.setState({control_text_color : document.getElementById("text_color_field").value});
    this.setState({control_background : document.getElementById("background_field").value});
    this.setState({control_border_color : document.getElementById("border_color_field").value});
    this.setState({control_border_thickness : document.getElementById("border_thickness_field").value});
    this.setState({control_border_radius : document.getElementById("border_radius_field").value});
  
    document.getElementById("font_size_textfield").value = "";
    document.getElementById("textfield_input").value = "";
    document.getElementById("text_color_field").value = "#000000";
    document.getElementById("background_field").value = "#000000";
    document.getElementById("border_color_field").value = "#000000";
    document.getElementById("border_thickness_field").value = "";
    document.getElementById("border_radius_field").value = "";
    }
  
    if (this.props.item.control === "button" && this.state.isSelected) {
      
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
  
    else if (this.props.item.control === "label" && this.state.isSelected) {
      
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
  
    else if (this.props.item.control === "textfield" && this.state.isSelected) {
      
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
  
    else if (this.props.item.control === "container" && this.state.isSelected) {
      
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
    this.saveProps();
  }

checkDraggable = () => {
  
  if (this.state.isSelected) {
    return false;
  }
  else {
    return true;
  }
}

checkResizable = () => {

if (!this.state.isSelected) {
  const returnable = {
    bottom: false,
    bottomLeft: false,
    bottomRight: false,
    left: false,
    right: false,
    top: false,
    topLeft: false,
    topRight: false
    } 
  return returnable;
  }
else {
    const returnable2 = {
      bottom: false,
      bottomLeft: true,
      bottomRight: true,
      left: false,
      right: false,
      top: false,
      topLeft: true,
      topRight: true
      } 
  return returnable2;
  }
}

savePositionProps = () => {

  // Set the Item Position Properties
  console.log("WireframeItem.saveProps: Updated props for item: ", this.props.item)
  this.props.item.control_x_position = this.state.control_x_position;
  this.props.item.control_y_position = this.state.control_y_position;
}

deselectItem = (itemId, topLeft, topRight, bottomLeft, bottomRight, e) => {
  // if (e.target.className !== "middle_screen" && e.target.className !== "dimension") {return;}
  if (this.state.isSelected && this.props.isCurrSelection[0] 
    && e.target.classList.contains('dimension')) // can only deselect when clicking within dimension 
  {
    // console.log("WireframeItem.deselectItem - Event object: ", e);
    console.log("WireframeItem.deselectItem - Deselecting Item With ID: ", itemId);

    // Reset corner boxes CSS
    document.getElementById(topLeft).classList.remove("rectangle_topleft");
    document.getElementById(topRight).classList.remove("rectangle_topright");
    document.getElementById(bottomLeft).classList.remove("rectangle_bottomleft");
    document.getElementById(bottomRight).classList.remove("rectangle_bottomright");

    // Make all of the properties link back to item
    this.savePositionProps();

    // Reset inputs on the right hand side
    document.getElementById("font_size_textfield").value = "";
    document.getElementById("textfield_input").value = "";
    document.getElementById("text_color_field").value = "#000000";
    document.getElementById("background_field").value = "#000000";
    document.getElementById("border_color_field").value = "#000000";
    document.getElementById("border_thickness_field").value = "";
    document.getElementById("border_radius_field").value = "";

    // Reset item selection CSS design
    document.getElementById(itemId).classList.remove("select_border");
    this.setSelected(false);
  }
}

selectItem = (itemId, topLeft, topRight, bottomLeft, bottomRight) => {
    // Case 1: Item is not currently selected
    if (this.state.isSelected === false && !this.props.isCurrSelection[0]) 
    {
      console.log("WireframeItem.selectItem - Selecting Item With ID: ", itemId);
      document.getElementById(itemId).classList.add("select_border");
      // debugger;
      // Select (add borders)
      document.getElementById(topLeft).classList.add("rectangle_topleft");
      document.getElementById(topRight).classList.add("rectangle_topright");
      document.getElementById(bottomLeft).classList.add("rectangle_bottomleft");
      document.getElementById(bottomRight).classList.add("rectangle_bottomright");

      // Add properties
      document.getElementById("font_size_textfield").value = this.props.item.control_font_size;
      document.getElementById("textfield_input").value = this.props.item.control_text;
      document.getElementById("text_color_field").value = this.props.item.control_text_color;
      document.getElementById("background_field").value = this.props.item.control_background; // background color
      document.getElementById("border_color_field").value = this.props.item.control_border_color; // background color
      document.getElementById("border_thickness_field").value = this.props.item.control_border_thickness;
      document.getElementById("border_radius_field").value = this.props.item.control_border_radius;
      this.setSelected(true);
  }
}

changeButton = (e) => {
  this.setState({ control_text : e.target.value});
}

deleteItem = (item) => {
  let index = this.props.items.indexOf(item);
  this.props.items.splice( index, 1 ); // removed item
  this.setState({ rerender : true}); // rerender
}

duplicateItem = (item) => {

  let control_x = parseInt(item.control_x_position, 10) + 100;
  let control_y = parseInt(item.control_y_position, 10) + 100;

  const item_duplicate = {
      control : item.control,
      control_width : item.control_width,
      control_height: item.control_height,
      control_text: item.control_text,
      control_font_size : item.control_font_size,
      control_background : item.control_background,
      control_border_color : item.control_border_color,
      control_text_color : item.control_text_color,
      control_border_thickness : item.control_border_thickness,
      control_border_radius : item.control_border_radius,
      control_x_position : control_x.toString(),
      control_y_position : control_y.toString(),
      is_duplicate : true
  }

  this.props.items.push( item_duplicate ); // add duplicated item 
  this.setState({ rerender : true}); // rerender
  return item_duplicate;
}

checkControl = () => {
  // Check control, make it container_box (container), prompt_text (label), buttom_submit (button), textfield_input (textfield)

  let name = this.props.item.control;
  let key = this.props.item.id;
  let inner1 = Math.floor(Math.random() * 10000) + 100 + "";
  let inner2 = Math.floor(Math.random() * 10000) + 100 + "";
  let inner3 = Math.floor(Math.random() * 10000) + 100 + "";
  let inner4 = Math.floor(Math.random() * 10000) + 100 + "";

    return (
      <ClickOutHandler onClickOut={(e) => this.deselectItem(key, inner1, inner2, inner3, inner4, e)}>
        <div className="position movable" tabIndex="0" onKeyDown={(e) => this.checkKeyPress(e)}>  
          <Rnd enableResizing={this.checkResizable()} disableDragging={this.checkDraggable()} size={{width: this.props.item.control_width, height:this.props.item.control_height}} 
          onDragStop={(e,d) =>{this.setState({control_x_position : d.x, control_y_position: d.y})}}
          onResizeStop={(ref) => {this.setState({control_width: ref.offsetWidth, control_height: ref.offsetHeight}); }}
          default={{x: parseInt(this.props.item.control_x_position, 10), y: parseInt(this.props.item.control_y_position, 10)}}> 
            { name === 'button' ? 
              // Case 1: Button
              <button className={"button_submit2 control_move"} style={{width: this.props.item.control_width + "px", height: this.props.item.control_height + "px", 
              fontSize: this.props.item.control_font_size + 'pt', backgroundColor: this.props.item.control_background, borderColor: this.props.item.control_border_color, 
              color: this.props.item.control_text_color, borderWidth: this.props.item.control_border_thickness + "px", borderRadius: this.props.item.control_border_radius + "px"}} 
              id={key} onClick = {() => this.selectItem(key, inner1, inner2, inner3, inner4)} > 
                {this.props.item.control_text} 
                <span id={inner1} />
                <span id={inner2} />
                <span id={inner3} />
                <span id={inner4} />
              </button> : 
              // Case 2: Container
              name === 'container' ? 
                <div className={"container_box2 control_move"} style={{width: this.props.item.control_width + "px", height: this.props.item.control_height + "px", 
                  fontSize: this.props.item.control_font_size + 'pt', backgroundColor: this.props.item.control_background, borderColor: this.props.item.control_border_color, 
                  color: this.props.item.control_text_color, borderWidth: this.props.item.control_border_thickness + "px", borderRadius: this.props.item.control_border_radius + "px"}} 
                  id={key} onClick = {() => this.selectItem(key, inner1, inner2, inner3, inner4)}> {this.props.item.control_text} 
                  <span id={inner1} />
                  <span id={inner2} />
                  <span id={inner3} />
                  <span id={inner4} />
                </div> :
              // Case 3: Textfield
              name === 'textfield' ? 
                <div>
                  <input type="input" id={key} className={"textfield_input2 control_move"} placeholder="Input" 
                  style={{width: this.props.item.control_width + "px", height: this.props.item.control_height + "px", 
                  fontSize: this.props.item.control_font_size + 'pt', backgroundColor: this.props.item.control_background, 
                  borderColor: this.props.item.control_border_color, color: this.props.item.control_text_color, borderWidth: this.props.item.control_border_thickness + "px",
                  borderRadius: this.props.item.control_border_radius + "px"}} onClick = {() => this.selectItem(key, inner1, inner2, inner3, inner4)} defaultValue={this.props.item.control_text} /> 
                  <div>
                    <span id={inner1} />
                    <span id={inner2} />
                    <span id={inner3} />
                    <span id={inner4} />
                  </div>
                </div> :
              // Case 4: Label
              name === 'label' ? 
                <div className={"prompt_text2 control_move"} style={{width: this.props.item.control_width + "px", height: this.props.item.control_height + "px", 
                fontSize: this.props.item.control_font_size + 'pt', backgroundColor: this.props.item.control_background, borderColor: this.props.item.control_border_color, 
                color: this.props.item.control_text_color, borderWidth: this.props.item.control_border_thickness + "px", borderRadius: this.state.this.props.item.control_border_radius + "px"}} 
                id={key} onClick = {() => this.selectItem(key, inner1, inner2, inner3, inner4)} > {this.props.item.control_text} 
                  <span id={inner1} />
                  <span id={inner2} />
                  <span id={inner3} />
                  <span id={inner4} />
                </div> : null
            }
          </Rnd>
      </div>  
      </ClickOutHandler>
    )
  }

render() {
  // console.log('this.props: ', this.props)
  console.log('button text color', this.props.item.control_text_color);
  return (
    <div id="control_spawn">
      <div id="resize_element"> 
        {this.checkControl()} 
      </div>
    </div>
        );
    }
}

export default WireframeItem;