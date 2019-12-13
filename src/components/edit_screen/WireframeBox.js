import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import { getFirestore } from 'redux-firestore';
import WireframeMiddle from './WireframeMiddle';
import DragResizeContainer from 'react-drag-resize';
import Draggable from 'react-draggable';

class WireframeBox extends Component {
  state = {
    goHome : false,
    old_name: "",
    rerender : false,
    wireframe_target : "",
    scale: 1, 
    height : 460, // default
    width : 500, // default
    width_status : true,
    height_status : true,
    pending_width : 0,
    pending_height : 0,
    default_size : true
    }

zoomIn = () => {

    let {accounts} = this.props;
    let index_acc = accounts && accounts.map(function (account) {return account.id;}).indexOf(this.props.id);
    let wireframe = accounts && accounts[index_acc].wireframes[this.props.wireframe_key];

    this.setState({ scale : this.state.scale * 2});
    let num = this.state.scale + "";
    let string = "scale(" + num + ")";

    {wireframe.items && wireframe.items.map( item => {
        document.getElementById("zoomable").style.transform = string;
    })}

}
    
zoomOut = () => {

    let {accounts} = this.props;
    let index_acc = accounts && accounts.map(function (account) {return account.id;}).indexOf(this.props.id);
    let wireframe = accounts && accounts[index_acc].wireframes[this.props.wireframe_key];

    this.setState({ scale : this.state.scale / 2});
    let num = this.state.scale + "";
    let string = "scale(" + num + ")";

    {wireframe.items && wireframe.items.map( item => {
        document.getElementById("zoomable").style.transform = string;
    })}
}

deleteItem = (item) => {

    let {accounts} = this.props;
    let index_acc = accounts && accounts.map(function (account) {return account.id;}).indexOf(this.props.id);
    let wireframe = accounts && accounts[index_acc].wireframes[this.props.wireframe_key];

    let index = wireframe.items.indexOf(item);
    wireframe.items.splice( index, 1 ); // removed item
    let x = wireframe.items;
    this.setState({ rerender : true}); // rerender
}

duplicateItem = (item) => {

    let {accounts} = this.props;
    let index_acc = accounts && accounts.map(function (account) {return account.id;}).indexOf(this.props.id);
    let wireframe = accounts && accounts[index_acc].wireframes[this.props.wireframe_key];

    let item_duplicate = item;
    let control_x = parseInt(item.control_x_position, 10) + 100;
    let control_y = parseInt(item.control_y_position, 10) + 100;

    item_duplicate.control_x_position = control_x.toString();
    item_duplicate.control_y_position = control_y.toString();

    wireframe.items.push( item_duplicate ); // add duplicated item 
    this.setState({ rerender : true}); // rerender
}
    
saveWork = (new_wireframe) => {

    const fireStore = getFirestore();
    let {accounts} = this.props;
    let index = accounts && accounts.map(function (account) {return account.id;}).indexOf(this.props.id);
    let wireframe_found = accounts && accounts[index].wireframes[this.props.wireframe_key];
    let new_name = document.getElementById("name_wireframe_field").value;
    wireframe_found.name = new_name;
    // accounts[index].wireframes[this.props.wireframe_key] = new_wireframe; // saved work
    wireframe_found.width = this.state.width;
    wireframe_found.height = this.state.height;

    let wireframes = accounts[index].wireframes;
    fireStore.collection("accounts").doc(accounts[index].id).update({ wireframes : wireframes});

    this.setState({goHome : true});
}
closeWork = () => {
    this.setState({goHome : true});
}

addTextfield = () => {
    let fireStore = getFirestore();
    let {accounts} = this.props;
    let index = accounts && accounts.map(function (account) {return account.id;}).indexOf(this.props.id);
    let wireframe = accounts && accounts[index].wireframes[this.props.wireframe_key];
    let wireframes = accounts[index].wireframes;

    const new_item = {
        control : "textfield",
        control_width : "",
        control_height: "",
        control_text : "",
        control_font_size : "",
        control_background : "#ffffff",
        control_border_color : "",
        control_text_color : "",
        control_border_thickness : "",
        control_border_radius : "",
        control_x_position : 0,
        control_y_position : 0
    }

    wireframe.items.push(new_item);
    this.setState({ rerender : true});
}

addLabel = () => {

    let fireStore = getFirestore();
    let {accounts} = this.props;
    let index = accounts && accounts.map(function (account) {return account.id;}).indexOf(this.props.id);
    let wireframe = accounts && accounts[index].wireframes[this.props.wireframe_key];
    let wireframes = accounts[index].wireframes;

    const new_item = {
        control : "label",
        control_width : "",
        control_height: "",
        control_text : "Prompt for input",
        control_font_size : "",
        control_background : "#ffffff",
        control_border_color : "",
        control_text_color : "",
        control_border_thickness : "",
        control_border_radius : "",
        control_x_position : 0,
        control_y_position : 0
    }

    wireframe.items.push(new_item);
    this.setState({ rerender : true});
    // fireStore.collection("todoLists").doc(accounts[index].id).update({ 'wireframes' : wireframes});

}

addButton = () => {
    let fireStore = getFirestore();
    let {accounts} = this.props;
    let index = accounts && accounts.map(function (account) {return account.id;}).indexOf(this.props.id);
    let wireframe = accounts && accounts[index].wireframes[this.props.wireframe_key];
    let wireframes = accounts[index].wireframes;

    const new_item = {
        control : "button",
        control_width : "",
        control_height: "",
        control_text : "Submit",
        control_font_size : "16",
        control_background : "#DCDCDC",
        control_border_color : "#000000",
        control_text_color : "#000000",
        control_border_thickness : "",
        control_border_radius : "",
        control_x_position : 0,
        control_y_position : 0
    }

    wireframe.items.push(new_item);
    this.setState({ rerender : true});
}

addContainer = () => {

    let fireStore = getFirestore();
    let {accounts} = this.props;
    let index = accounts && accounts.map(function (account) {return account.id;}).indexOf(this.props.id);
    let wireframe = accounts && accounts[index].wireframes[this.props.wireframe_key];
    let wireframes = accounts[index].wireframes;

    const new_item = {
        control : "container",
        control_width : "140",
        control_height: "80",
        control_text : "",
        control_font_size : "",
        control_background : "#FFFFFF",
        control_border_color : "#000000",
        control_text_color : "",
        control_border_thickness : "1",
        control_border_radius : "0",
        control_x_position : 0,
        control_y_position : 0
    }

    wireframe.items.push(new_item);
    this.setState({ rerender : true});
}

handleChange_name = (e) => {
    document.getElementById("name_wireframe_field").value = e.target.value;
    e.stopPropagation();
    e.preventDefault();
}

handleChange_textColor = (e) => {
    document.getElementById("text_color_field").value = e.target.value;
}

handleChange_borderColor = (e) => {
    document.getElementById("border_color_field").value = e.target.value;
}
 
handleChange_backgroundColor = (e) => {
    document.getElementById("background_field").value = e.target.value;
}

handleChange_wireframeName = (e) => {
    document.getElementById("name_wireframe_field").defaultValue = e.target.value;
}

handleChange_text = (e) => {
    document.getElementById("textfield_input").defaultValue = e.target.value;
}

handleChange_font_size = (e) => {
    document.getElementById("font_size_textfield").defaultValue = e.target.value;
}

handleChange_border_thickness = (e) => {
    document.getElementById("border_thickness_field").defaultValue = e.target.value;
}

handleChange_border_radius = (e) => {
    document.getElementById("border_radius_field").defaultValue = e.target.value;
}

handleChange_diagram_width = () => {
        this.setState({ width: this.state.pending_width})
}

handleChange_diagram_height = () => {
        this.setState({ height: this.state.pending_height})
    }

checkWidth_diagram = (e) => {
    if (e.target.value <= 5000 && e.target.value >= 1) {
        this.setState({width_status : false});
        this.setState({pending_width : e.target.value})
    }
    else {
        this.setState({width_status : true});
    }
}

checkHeight_diagram = (e) => {
    if (e.target.value <= 5000 && e.target.value >= 1) {
        this.setState({height_status : false});
        this.setState({pending_height : e.target.value})
    }
    else {
        this.setState({height_status : true});
    }
}

render() {

    if (this.state.goHome == true) {
        return <Redirect to={"/"} />
    }

    const {accounts} = this.props;
    const index = accounts && accounts.map(function (account) {return account.id;}).indexOf(this.props.id);
    const wireframe = accounts && accounts[index].wireframes[this.props.wireframe_key];

    if (this.state.default_size) {
        this.state.width =  wireframe.width;
        this.state.height =  wireframe.height;
        this.state.default_size = false;
    }

return (

        <div className = "inner_edit_box">

              <div className = "left_screen">
                  <div className = "top_left">
                      <div id="zoom_buttons" > 
                          <i class="material-icons medium" onClick={this.zoomIn}> zoom_in</i>
                          <i class="material-icons medium" onClick={this.zoomOut}> zoom_out</i>
                      </div>
                      <div id="save_work" onClick={this.saveWork}> 
                        Save
                      </div>
                      <div id="close_work" onClick={this.closeWork}>
                      Close
                      </div>
                  </div>
                  <div className="container_example">
                    <div className="container_box" onClick={this.addContainer} > </div>
                    <div id="container_text" > Container </div>
                  </div>
                  < br />
                  <div id="prompt_for_input">
                    <div className="prompt_text" onClick={this.addLabel} > Prompt for input:</div>
                  </div>
                  <div id="label_text"> Label</div>
                  < br />
                  <div className="button_example">
                    <button className="button_submit" onClick={this.addButton}> Submit</button>
                    <div id="button_text"> Button</div>
                  </div>
                  < br />
                  <div className="textfield_example">
                    <input type="input" className="textfield_input" placeholder="Input" onClick={this.addTextfield} />
                    <p id="textfield_label" >Textfield</p>
                  </div>
              </div> 

              <div className = "right_screen">
              < br />
              <div className="labels_list"> 
                  <div className="properties_example">
                      <p id="properties_label" >Properties</p>
                      <input type="input" id="textfield_input" onChange={(e) => this.handleChange_text(e)}/>
                  </div>
                  <div id="font_size_label"> Font Size: 
                      <input type="input" id="font_size_textfield" onChange={(e) => this.handleChange_font_size(e)}/>
                  </div>
                  <div id="text_color_label"> Text Color: 
                      <input type="color" id="text_color_field" onChange = {(e) => this.handleChange_textColor(e)} />
                  </div>
                  <div id="background_label"> Background: 
                      <input type="color" id="background_field" onChange={(e) => this.handleChange_backgroundColor(e)}/>
                  </div>
                  <div id="border_color_label"> Border Color: 
                      <input type="color" id="border_color_field" onChange = {(e) => this.handleChange_borderColor(e)} />
                  </div>
                  <div id="border_thickness_label"> Border Thickness:
                      <input type="input" id="border_thickness_field" onChange = {(e) => this.handleChange_border_thickness(e)} />
                  </div>
                  <div id= "border_radius_label"> Border Radius:
                      <input type="input" id="border_radius_field" onChange = {(e) => this.handleChange_border_radius(e)} />
                  </div>
                  <div id= "name_of_wireframe"> Name:
                      <input type="input" id="name_wireframe_field" onClick={this.prevent} defaultValue={wireframe.name} onChange = {(e) => this.handleChange_name(e)} />
                  </div>
              </div>
            </div>

            <div id="middle_screen" className="middle_screen"> 
                <div id="dimension" className="dimension" style={{width: this.state.width + "px", height: this.state.height + "px"}}>
                    <div id="zoomable"> 
                {wireframe.items && wireframe.items.map(item => (
                    <WireframeMiddle item={item} wireframe={wireframe} deleteItem = {this.deleteItem} duplicateItem={this.duplicateItem} zoomIn={this.zoomIn} zoomOut={this.zoomOut} width={this.state.width} height={this.state.height}/>
                ))}
                    </div>
                </div>
            </div>


        <div id="wireframe_dimensions">
            <div id="wireframe_dimension_left" className="font_dimension"> 
                <button id="dimension_width_button" disabled={this.state.width_status} onClick={this.handleChange_diagram_width} >Update Width </button>
                <input type="input" id="dimension_width" name="width" onChange ={(e) => this.checkWidth_diagram(e)}/>
            </div>
            <div id="wireframe_dimension_right" className="font_dimension" > 
            <button id="dimension_height_button" disabled={this.state.height_status} onClick = {this.handleChange_diagram_height}>Update Height </button>
                <input type="input" id="dimension_height" name="height" onChange ={(e) => this.checkHeight_diagram(e)}/>
            </div>
        </div> 

        </div>
    

        );
    }
}

export default WireframeBox;