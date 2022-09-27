import React, { Component } from 'react';
import ClickOutHandler from 'react-onclickout'; 
import {Rnd} from 'react-rnd'; // resizable and draggable component for React.

class WireframeItem extends Component {
  state = {
    // State variables initialized to props value as start value
    // control_x_position : this.props.item.control_x_position,
    // control_y_position : this.props.item.control_y_position,

    rerender : false,
    isSelected : false,

    inner1 : Math.floor(Math.random() * 10000) + 100 + "",
    inner2 : Math.floor(Math.random() * 10000) + 100 + "",
    inner3 : Math.floor(Math.random() * 10000) + 100 + "",
    inner4 : Math.floor(Math.random() * 10000) + 100 + "",
    
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
      this.deselectItem(this.props.item.id, this.state.inner1, this.state.inner2, this.state.inner3, this.state.inner4, 'delete');
      this.deleteItem(this.props.item);
    }
    else if (e.keyCode === 68 && (e.ctrlKey || e.metaKey)) { // Ctrl + d to duplicate
      e.preventDefault();
      this.duplicateSelectedItem();
      this.deselectItem(this.props.item.id, this.state.inner1, this.state.inner2, this.state.inner3, this.state.inner4, 'duplicate');
      // this.postDuplicate();
      // this.saveProps();
    }
  }
}

deleteItem = (item) => {
  let index = this.props.items.indexOf(item);
  this.props.items.splice( index, 1 ); // removed item
  this.setState({ rerender : true}); // rerender
}

duplicateSelectedItem = () => {
  let item = this.props.item;
  const item_duplicate = {
      id : Math.floor(100000 + Math.random() * 900000),
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
      control_x_position : item.control_x_position,
      control_y_position : item.control_y_position,
      is_duplicate : true
  }
  this.props.items.push( item_duplicate ); // add duplicated item 
  return item_duplicate;
}

checkDraggable = () => {
  if (this.state.isSelected) { return false; }
  else { return true; }
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

deselectItem = (itemId, topLeft, topRight, bottomLeft, bottomRight, e) => {
  if (this.state.isSelected && this.props.isCurrSelection[0] 
    && (e === 'delete' || e === 'duplicate' || e.target.classList.contains('dimension'))) // can only deselect when clicking within dimension 
  {
    // console.log("WireframeItem.deselectItem - Event object: ", e);
    console.log("WireframeItem.deselectItem - Deselecting Item With ID: ", itemId);

    // Reset corner boxes CSS
    document.getElementById(topLeft).classList.remove("rectangle_topleft");
    document.getElementById(topRight).classList.remove("rectangle_topright");
    document.getElementById(bottomLeft).classList.remove("rectangle_bottomleft");
    document.getElementById(bottomRight).classList.remove("rectangle_bottomright");

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

      this.setSelected(true);

      // Add properties
      // document.getElementById("font_size_textfield").value = this.props.item.control_font_size;
      // document.getElementById("textfield_input").value = this.props.item.control_text;
      // document.getElementById("text_color_field").value = this.props.item.control_text_color;
      // document.getElementById("background_field").value = this.props.item.control_background; // background color
      // document.getElementById("border_color_field").value = this.props.item.control_border_color; // background color
      // document.getElementById("border_thickness_field").value = this.props.item.control_border_thickness;
      // document.getElementById("border_radius_field").value = this.props.item.control_border_radius;
      // console.log('this.props: ', this.props);
  }
}

changeButton = (e) => {
  this.setState({ control_text : e.target.value});
}

checkControl = () => {
  // Check control, make it container_box (container), prompt_text (label), buttom_submit (button), textfield_input (textfield)

  let name = this.props.item.control;
  let key = this.props.item.id;

    return (
      <ClickOutHandler onClickOut={(e) => this.deselectItem(key, this.state.inner1, this.state.inner2, this.state.inner3, this.state.inner4, e)}>
        <div className="position movable" tabIndex="0" onKeyDown={(e) => this.checkKeyPress(e)} style={{zIndex: this.props.item.z_index, position: 'relative'}}>  
          <Rnd enableResizing={this.checkResizable()} disableDragging={this.checkDraggable()} size={{width: this.props.item.control_width, height:this.props.item.control_height}} 
          onDragStop={(e,d) => {this.props.item.control_x_position = d.x; this.props.item.control_y_position = d.y}}
          onResize={(e, ignore1, ref, ignore2, ignore3) => {this.props.item.control_width = ref.offsetWidth; this.props.item.control_height = ref.offsetHeight; this.setState({rerender : true})}}
          default={{x: parseInt(this.props.item.control_x_position, 10), y: parseInt(this.props.item.control_y_position, 10)}}> 
            { name === 'button' ? 
              // Case 1: Button
              <button className={"button_submit2 control_move"} style={{width: this.props.item.control_width + "px", height: this.props.item.control_height + "px", transform: "scale(" + this.props.scale + ")",
              fontSize: this.props.item.control_font_size + 'pt', backgroundColor: this.props.item.control_background, borderColor: this.props.item.control_border_color,
              color: this.props.item.control_text_color, borderWidth: this.props.item.control_border_thickness + "px", borderRadius: this.props.item.control_border_radius + "px"}} 
              id={key} onClick = {() => this.selectItem(key, this.state.inner1, this.state.inner2, this.state.inner3, this.state.inner4)} > 
                {this.props.item.control_text} 
                <span id={this.state.inner1} />
                <span id={this.state.inner2} />
                <span id={this.state.inner3} />
                <span id={this.state.inner4} />
              </button> : 
              // Case 2: Container
              name === 'container' ? 
                <div className={"container_box2 control_move"} style={{width: this.props.item.control_width + "px", height: this.props.item.control_height + "px", transform: "scale(" + this.props.scale + ")",
                  fontSize: this.props.item.control_font_size + 'pt', backgroundColor: this.props.item.control_background, borderColor: this.props.item.control_border_color,
                  color: this.props.item.control_text_color, borderWidth: this.props.item.control_border_thickness + "px", borderRadius: this.props.item.control_border_radius + "px"}} 
                  id={key} onClick = {() => this.selectItem(key, this.state.inner1, this.state.inner2, this.state.inner3, this.state.inner4)}> {this.props.item.control_text} 
                  <span id={this.state.inner1} />
                  <span id={this.state.inner2} />
                  <span id={this.state.inner3} />
                  <span id={this.state.inner4} />
                </div> :
              // Case 3: Textfield
              name === 'textfield' ? 
                <div>
                  <input type="input" id={key} className={"textfield_input2 control_move"} placeholder="Input" 
                  style={{width: this.props.item.control_width + "px", height: this.props.item.control_height + "px", 
                  fontSize: this.props.item.control_font_size + 'pt', backgroundColor: this.props.item.control_background, transform: "scale(" + this.props.scale + ")",
                  borderColor: this.props.item.control_border_color, color: this.props.item.control_text_color, borderWidth: this.props.item.control_border_thickness + "px",
                  borderRadius: this.props.item.control_border_radius + "px"}} onClick = {() => this.selectItem(key, this.state.inner1, this.state.inner2, this.state.inner3, this.state.inner4)} defaultValue={this.props.item.control_text} /> 
                  <div>
                    <span id={this.state.inner1} />
                    <span id={this.state.inner2} />
                    <span id={this.state.inner3} />
                    <span id={this.state.inner4} />
                  </div>
                </div> :
              // Case 4: Label
              name === 'label' ? 
                <div className={"prompt_text2 control_move"} style={{width: this.props.item.control_width + "px", height: this.props.item.control_height + "px", transform: "scale(" + this.props.scale + ")",
                fontSize: this.props.item.control_font_size + 'pt', backgroundColor: this.props.item.control_background, borderColor: this.props.item.control_border_color,
                color: this.props.item.control_text_color, borderWidth: this.props.item.control_border_thickness + "px", borderRadius: this.props.item.control_border_radius + "px"}} 
                id={key} onClick = {() => this.selectItem(key, this.state.inner1, this.state.inner2, this.state.inner3, this.state.inner4)} > {this.props.item.control_text} 
                  <span id={this.state.inner1} />
                  <span id={this.state.inner2} />
                  <span id={this.state.inner3} />
                  <span id={this.state.inner4} />
                </div> : null
            }
          </Rnd>
      </div>  
      </ClickOutHandler>
    )
  }

render() {
  // console.log('this.props: ', this.props)
  // console.log('width', this.props.item.control_width);
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