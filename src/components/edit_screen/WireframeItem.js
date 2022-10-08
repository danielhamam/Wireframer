import React, { Component } from 'react';
import ClickOutHandler from 'react-onclickout'; 
import {Rnd} from 'react-rnd'; // resizable and draggable component for React.

class WireframeItem extends Component {
  constructor() {
    super();
    // this.rndRef = React.createRef();
    this.state = {
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
      // top: 40, 
      // left: 40
  
    }
  }
  
  setSelected = (toggleVal) => {
    this.setState({isSelected: toggleVal});
    if (toggleVal) this.props.setCurrSelection(toggleVal, this.props.item.id); // send the item to parent
    else this.props.setCurrSelection(toggleVal, null); // no item to send to parent
  }

checkKeyPress = (e) => {
  e.preventDefault();
  console.log('WireframeItem.checkKeyPress: deleting item...')
  if (this.state.isSelected) {
    if (e.keyCode === 8 || e.key === "Delete") {
      document.getElementById("font_size_textfield").value = "";
      document.getElementById("textfield_input").value = "";
      document.getElementById("text_color_field").value = "#000000";
      document.getElementById("background_field").value = "#000000";
      document.getElementById("border_color_field").value = "#000000";
      document.getElementById("border_thickness_field").value = "";
      document.getElementById("border_radius_field").value = "";
      this.deselectItem('delete');
      this.props.deleteItem(this.props.item);
    }
    else if (e.keyCode === 68 && (e.ctrlKey || e.metaKey)) { // Ctrl + d to duplicate
      console.log('WireframeItem.checkKeyPress: duplicating item...')
      e.preventDefault();
      this.duplicateSelectedItem();
      this.deselectItem('duplicate');
      // this.postDuplicate();
      // this.saveProps();
    }
  }
}

// deleteItem = (item) => {
//   let index = this.props.items.indexOf(item);
//   this.props.items.splice( index, 1 ); // removed item
//   this.setState({ rerender : true}); // rerender
//   console.log('deleted item');
// }

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
  // return true;
  // if (this.state.isSelected) { return false; }
  // else { return true; }
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

deselectItem = (e) => {
  console.log("EVENT: ", e)
  if (this.state.isSelected && this.props.isCurrSelection[0] 
    && (e === 'delete' || e === 'duplicate' || e.target && (e.target.classList.contains('dimension') || // can only deselect when clicking within dimension 
    e.target.classList.contains('control_move')))) // check if it's another item
  {
    // console.log("WireframeItem.deselectItem - Event object: ", e);
    console.log("WireframeItem.deselectItem - Deselecting Item With ID: ", this.props.item.id);

    // Reset corner boxes CSS
    document.getElementById(this.state.inner1).classList.remove("rectangle_topleft");
    document.getElementById(this.state.inner2).classList.remove("rectangle_topright");
    document.getElementById(this.state.inner3).classList.remove("rectangle_bottomleft");
    document.getElementById(this.state.inner4).classList.remove("rectangle_bottomright");
    document.getElementById(this.props.item.id).classList.remove("select_border");

    if (e.target && !e.target.classList.contains('control_move')) {
      console.log('Selection was not another item - proceeding...');
      // Reset inputs on the right hand side
      document.getElementById("font_size_textfield").value = "";
      document.getElementById("textfield_input").value = "";
      document.getElementById("text_color_field").value = "#000000";
      document.getElementById("background_field").value = "#000000";
      document.getElementById("border_color_field").value = "#000000";
      document.getElementById("border_thickness_field").value = "";
      document.getElementById("border_radius_field").value = "";
      // Reset item selection CSS design
      this.setSelected(false);
    }
    else {
      this.setState({isSelected : false}); // tell itself that it isn't selected
    } // In this use case, we are selecting another item
  }
}

selectItem = (itemId, topLeft, topRight, bottomLeft, bottomRight) => {
    // Case 1: Item is not currently selected
    // if (this.state.isSelected === false && !this.props.isCurrSelection[0]) 
    // {
      // this.props.setSave();
      if (!this.state.isSelected) {
        console.log("WireframeItem.selectItem - Selecting Item With ID: ", itemId);
        document.getElementById(itemId).classList.add("select_border");
        // debugger;
        // Select (add borders)
        document.getElementById(topLeft).classList.add("rectangle_topleft");
        document.getElementById(topRight).classList.add("rectangle_topright");
        document.getElementById(bottomLeft).classList.add("rectangle_bottomleft");
        document.getElementById(bottomRight).classList.add("rectangle_bottomright");
  
        this.setSelected(true);
      }
  // }
}

changeButton = (e) => {
  this.setState({ control_text : e.target.value});
}

// componentDidUpdate = () => {
//   // Here, we are going to update the scale property of an item's RND container.
//   let itemRnd = document.getElementById("item-rnd-"+this.props.item.id);
//   // 1. Check if selected item exists
//   if (itemRnd != null && this.props.scale != null) {
//     let currTransformStyle = itemRnd.style.transform;
//     if (currTransformStyle != null) 
//     {
//       // Case 1: Translate/Scale already exists, modify the scale (remove then re-add)
//       if (currTransformStyle.indexOf("scale") !== -1) {
//         itemRnd.style.transform = currTransformStyle.replace(/scale.*$/i, "scale(" + this.props.scale + ")");
//       }
//       // Case 2: Translate exists but Scale doesn't exist, add scale to it
//       else if (currTransformStyle.indexOf("scale") === -1) {
//         itemRnd.style.transform  = currTransformStyle + "scale(" + this.props.scale + ")";
//       }
//     }
//   }
// }


checkControl = () => {
  // Check control, make it container_box (container), prompt_text (label), buttom_submit (button), textfield_input (textfield)

  let name = this.props.item.control;
  let key = this.props.item.id;
  // let numScale =  parseFloat(this.props.scale).toFixed(1);

  // console.log("x: ", this.props.item.control_x_position);
  // let adjustedX = this.props.item.control_x_position/numScale;
  // let adjustedY = this.props.item.control_y_position/numScale;
  // console.log("x/numscale: ", this.props.item.control_x_position/numScale);
  
    return (
      <ClickOutHandler onClickOut={(e) => this.deselectItem(e)}>
        {/* <div id="rnd_canvas" style={{scale: "scale(" + this.props.scale + ")"}}> */}
          <Rnd id={"item-rnd-"+key} onKeyDown={(e) => this.checkKeyPress(e)} enableResizing={this.checkResizable()} tabIndex="0"
            size={{width: this.props.item.control_width, height: this.props.item.control_height}}
            // style={{transform: "scale(" + this.props.scale + ")" + "translate("+parseInt(this.props.item.control_x_position, 10)+"px,"+parseInt(this.props.item.control_y_position, 10)+"px) !important;"}}
            style={{zIndex: this.props.item.z_index, position: 'absolute'}} 
            onDragStart={(e,data) => {this.selectItem(key, this.state.inner1, this.state.inner2, this.state.inner3, this.state.inner4)}}
            onDragStop={(e,d) => { this.props.item.control_x_position = (d.x); this.props.item.control_y_position = (d.y); this.props.setSave()}}
            onResize={(e, ignore1, ref, ignore2, ignore3) => {this.props.item.control_width = ref.offsetWidth; this.props.item.control_height = ref.offsetHeight; this.props.item.control_x_position = this.props.item.control_x_position; this.setState({rerender : true});}}
            default={{x: (this.props.item.control_x_position), y: (this.props.item.control_y_position)}}> 
            { name === 'button' ? 
              // Case 1: Button
              <button className={"button_submit2 control_move"}
              style={{width: "100%", height: "100%",fontSize: this.props.item.control_font_size + 'pt', backgroundColor: this.props.item.control_background, borderColor: this.props.item.control_border_color, //transform: "scale(" + this.props.scale + ")",
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
                <div className={"container_box2 control_move"}
                  style={{width: "100%", height: "100%", fontSize: this.props.item.control_font_size + 'pt', backgroundColor: this.props.item.control_background, borderColor: this.props.item.control_border_color, //transform: "scale(" + this.props.scale + ")",
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
                  style={{width: "100%", height: "100%", fontSize: this.props.item.control_font_size + 'pt', backgroundColor: this.props.item.control_background, //transform: "scale(" + this.props.scale + ")",
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
                <div id={key} className={"prompt_text2 control_move"} 
                style={{width: "100%", height: "100%", fontSize: this.props.item.control_font_size + 'pt', backgroundColor: this.props.item.control_background, borderColor: this.props.item.control_border_color, //transform: "scale(" + this.props.scale + ")",
                color: this.props.item.control_text_color, borderWidth: this.props.item.control_border_thickness + "px", borderRadius: this.props.item.control_border_radius + "px"}} 
                onClick = {() => this.selectItem(key, this.state.inner1, this.state.inner2, this.state.inner3, this.state.inner4)} > {this.props.item.control_text} 
                  <span id={this.state.inner1} />
                  <span id={this.state.inner2} />
                  <span id={this.state.inner3} />
                  <span id={this.state.inner4} />
                </div> : null
            }
          </Rnd>
        {/* </div>  */}
      </ClickOutHandler>
    )
  }

render() {
  // console.log('this.props: ', this.props)
  // console.log('width', this.props.item.control_width);
  return (
    // <div id="resize_element"> 
    <>
      {this.checkControl()}
    </> 
    // </div>
        );
    }
}

export default WireframeItem;