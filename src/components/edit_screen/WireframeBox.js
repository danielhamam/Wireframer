import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import { getFirestore } from 'redux-firestore';
import WireframeMiddle from './WireframeMiddle';

class WireframeBox extends Component {
  state = {
    goHome : false,
    old_name: "",
    rerender : false,
    wireframe_target : ""
    }

zoomIn = () => {

    }
    
zoomOut = () => {
    
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
    wireframe.items.push( item_duplicate ); // add duplicated item item
    this.setState({ rerender : true}); // rerender
}
    
saveWork = (new_wireframe) => {

    const fireStore = getFirestore();
    let {accounts} = this.props;
    let index = accounts && accounts.map(function (account) {return account.id;}).indexOf(this.props.id);
    let wireframe_found = accounts && accounts[index].wireframes[this.props.wireframe_key];
    // accounts[index].wireframes[this.props.wireframe_key] = new_wireframe; // saved work

    let wireframes = accounts[index].wireframes;
    fireStore.collection("accounts").doc(accounts[index].id).update({ wireframes : wireframes});
    // fireStore.collection("accounts").doc(account.id).update({ wireframes: account.wireframes});

    // getFirestore().collection('todoLists').doc(this.props.todoList.id).update({
    //     name: event.target.value,
    //  });
    // this.props.item.control_text,
    // this.props.item.control_font_size,
    // this.props.item.control_background,
    // this.props.item.control_border_color,
    // this.props.item.control_text_color,
    // this.props.item.control_border_thickness,
    // this.props.item.control_border_radius,
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
        control_background : "",
        control_border_color : "",
        control_text_color : "",
        control_border_thickness : "",
        control_border_radius : ""
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
        control_background : "",
        control_border_color : "",
        control_text_color : "",
        control_border_thickness : "",
        control_border_radius : ""
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
        control_font_size : "",
        control_background : "",
        control_border_color : "",
        control_text_color : "",
        control_border_thickness : "",
        control_border_radius : ""
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
        control_background : "",
        control_border_color : "",
        control_text_color : "",
        control_border_thickness : "",
        control_border_radius : ""
    }

    wireframe.items.push(new_item);
    this.setState({ rerender : true});
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

render() {

    if (this.state.goHome == true) {
        return <Redirect to={"/"} />
    }

    const {accounts} = this.props;
    const index = accounts && accounts.map(function (account) {return account.id;}).indexOf(this.props.id);
    const wireframe = accounts && accounts[index].wireframes[this.props.wireframe_key];
    // this.setState({old_name : wireframe.name});

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
                      <input type="input" id="name_wireframe_field" defaultValue={wireframe.name}/>
                  </div>
              </div>
            </div>

            <div className="middle_screen">
                {wireframe.items && wireframe.items.map(item => (
                    <WireframeMiddle item={item} wireframe={wireframe} deleteItem = {this.deleteItem} duplicateItem={this.duplicateItem}/>
                ))}
            </div>

        </div>

        );
    }
}

export default WireframeBox;