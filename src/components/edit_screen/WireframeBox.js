import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import { getFirestore } from 'redux-firestore';
import WireframeMiddle from './WireframeMiddle';
import constants from '../../config/constants';
class WireframeBox extends Component {
  state = {
    goHome : false,
    old_name: "",
    rerender : false,
    wireframe_target : "",
    scale: 1, 
    height : this.props.wireframe ? this.props.wireframe.height : 460,
    width : this.props.wireframe ? this.props.wireframe.width : 500,
    width_status : true,
    height_status : true,
    pending_width : 0,
    pending_height : 0,
    default_size : true,
    // original_wireframes : this.props.wireframes,
    updatedList : false,
    prompt_save : false
    }

zoomIn = (e) => {
    this.setState({ scale : this.state.scale * 2});
    let num = this.state.scale + "";
    let string = "scale(" + num + ")";
    this.props.wireframe.items && this.props.wireframe.items.forEach(item => { document.getElementById("dimension").style.transform = string })
}
    
zoomOut = (e) => {
    let num = this.state.scale + "";
    let string = "scale(" + num + ")";
    this.props.wireframe.items && this.props.wireframe.items.forEach((item) => { document.getElementById("dimension").style.transform = string });
    this.setState({ scale : this.state.scale / 2});
}

// If prompt_save is true, will prompt user if he/she would like to save when closing work.
setSave = () => {
    this.setState({prompt_save : true});
}

setItemProps = (item, new_control_width, new_control_height, new_control_text, new_control_font_size, new_control_background, 
                new_control_border_color, new_control_text_color, new_control_border_thickness, new_control_border_radius) => 
    {
        console.log("WireframeBox.setItemProps: Saving Item Props for....", item)
        item.control_width = new_control_width;
        item.control_height = new_control_height;
        item.control_text =  new_control_text;
        item.control_font_size=  new_control_font_size;
        item.control_background = new_control_background;
        item.control_border_color=  new_control_border_color;
        item.control_text_color=  new_control_text_color;
        item.control_border_thickness=  new_control_border_thickness;
        item.control_border_radius = new_control_border_radius;
    }

deleteItem = (item) => {
    let index = this.props.wireframe.items.indexOf(item);
    this.props.wireframe.items.splice( index, 1 ); // removed item
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

    this.props.wireframe.items.push( item_duplicate ); // add duplicated item 
    this.setState({ rerender : true}); // rerender
    return item_duplicate;
}
    
saveWork = () => {

    let new_name = document.getElementById("name_wireframe_field").value;
    this.props.wireframe.name = new_name;
    this.props.wireframe.width = this.state.width;
    this.props.wireframe.height = this.state.height;
    this.props.wireframe.created_time = new Date(); // so it can be on top

    // Move it to be first on the list 
    let temp = this.props.wireframes[0];
    this.props.wireframes[0] = this.props.wireframe;
    this.props.wireframes[this.props.wireframeIndex] = temp;
    getFirestore().collection("accounts").doc(this.props.accountId).update({ wireframes : this.props.wireframes});

    this.setState({goHome : true});
}
closeWork = () => {

    // Move it to top of list
    if (this.props.wireframes.length > 1) {
        let temp = this.props.wireframes[0];
        this.props.wireframes[0] = this.props.wireframes[this.props.wireframeIndex];
        this.props.wireframes[this.props.wireframeIndex] = temp;
        getFirestore().collection("accounts").doc(this.props.accountId).update({ wireframes : this.props.wireframes}); 
    }
    this.setState({goHome : true});
}

addNewItem(itemType) {

    if (itemType !== 'container' && itemType !== 'button' && itemType !== 'label' && itemType !== 'textfield') {
        console.log("WireframeBox.addNewItem: cannot add new item as it is incorrect type...");
        return;
    }

    const new_item = {
        id : Math.floor(100000 + Math.random() * 900000),
        control : itemType,
        control_width : constants.newItemProps[itemType]['control_width'],
        control_height: constants.newItemProps[itemType]['control_height'],
        control_text : constants.newItemProps[itemType]['control_text'],
        control_font_size : constants.newItemProps[itemType]['control_font_size'],
        control_background : constants.newItemProps[itemType]['control_background'],
        control_border_color : constants.newItemProps[itemType]['control_border_color'],
        control_text_color :constants.newItemProps[itemType]['control_text_color'],
        control_border_thickness : constants.newItemProps[itemType]['control_border_thickness'],
        control_border_radius : constants.newItemProps[itemType]['control_border_radius'],
        control_x_position : constants.newItemProps[itemType]['control_x_position'],
        control_y_position : constants.newItemProps[itemType]['control_y_position']
    }
    this.props.wireframe.items.push(new_item);
    this.setState({prompt_save : true});
}

handleChange_name = (e) => { document.getElementById("name_wireframe_field").value = e.target.value; }
handleChange_textColor = (e) => { document.getElementById("text_color_field").value = e.target.value; }
handleChange_borderColor = (e) => { document.getElementById("border_color_field").value = e.target.value; }
handleChange_backgroundColor = (e) => { document.getElementById("background_field").value = e.target.value; }
handleChange_wireframeName = (e) => { document.getElementById("name_wireframe_field").defaultValue = e.target.value; }
handleChange_text = (e) => { document.getElementById("textfield_input").defaultValue = e.target.value; }
handleChange_font_size = (e) => { document.getElementById("font_size_textfield").defaultValue = e.target.value; }
handleChange_border_thickness = (e) => { document.getElementById("border_thickness_field").defaultValue = e.target.value; }
handleChange_border_radius = (e) => { document.getElementById("border_radius_field").defaultValue = e.target.value; }
handleChange_diagram_width = () => { this.setState({ width: this.state.pending_width}) }
handleChange_diagram_height = () => { this.setState({ height: this.state.pending_height}) }

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

closeWork_check = () => {

    if (this.state.prompt_save) {
        this.toggleModal();
    }
    else {
        this.closeWork();
    }
}

toggleModal = () => {
    let result = document.getElementById("my_modal");
    if (result.style.display === "block") {
        document.getElementById("my_modal").style.animation = "fadeout .6s";
        result.style.visibility = "hidden";
    } else {
        result.style.visibility = "visible";
        document.getElementById("my_modal").style.animation = "fadein .6s";
        result.style.display = "block";
    }
}

render() {

    if (this.state.goHome === true) {
        return <Redirect to={"/"} />
    }

    const wireframe = this.props.wireframe;

return (

<div className = "inner_edit_box">

    <div className = "left_screen">
        <div className = "top_left">
            <div id="zoom_buttons" > 
                <i className="material-icons medium" onClick={this.zoomIn}> zoom_in</i>
                <i className="material-icons medium" onClick={this.zoomOut}> zoom_out</i>
            </div>
            <div id="save_work" onClick={this.saveWork}> 
            Save
            </div>
            <div id="close_work" onClick={this.closeWork_check}> Close </div>
        </div>
        <div id="bottom_left"> 
            <div className="container_example">
                <div className="container_box" onClick={() => this.addNewItem('container')} > </div>
                <div id="container_text" > Container </div>
            </div>
            < br />
            <div id="prompt_for_input">
                <div className="prompt_text" onClick={() => this.addNewItem('label')} > Prompt for input:</div>
                <div id="label_text">Label</div>
            </div>
            <div className="button_example">
                <button className="button_submit" onClick={() => this.addNewItem('button')}> Submit</button>
                <div id="button_text"> Button</div>
            </div>
            < br />
            <div className="textfield_example">
                <input type="input" className="textfield_input" placeholder="Input" onClick={() => this.addNewItem('textfield')} />
                <p id="textfield_label" >Textfield</p>
            </div>
        </div>
    </div> 

    <div id="middle_screen" className="middle_screen"> 
        <div id="dimension" className="dimension" style={{width: this.state.width + "px", height: this.state.height + "px"}}>
            <div id="zoomable"> 
                {wireframe && wireframe.items && wireframe.items.map(item => (
                <WireframeMiddle item={item} key={item.id} wireframe={wireframe} setItemProps={this.setItemProps} deleteItem = {this.deleteItem} duplicateItem={this.duplicateItem} zoomIn={this.zoomIn} zoomOut={this.zoomOut} width={this.state.width} height={this.state.height} setSave={this.setSave}/>
                ))}
            </div>
        </div>
    </div>

    <div className = "right_screen">
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
                <input type="input" id="name_wireframe_field" onClick={this.prevent} defaultValue={wireframe && wireframe.name} onChange = {(e) => this.handleChange_name(e)} />
            </div>
        </div>
    </div>

    <div id="my_modal" className="modal">
        <div className="modal-content ">
            <h4>Save Wireframe?</h4>
            <br />
            <p> Would you like to save your progress? </p>
        </div>
        <button id="yes" onClick={this.saveWork} className="modal-close waves-effect waves-white btn-flat">Yes</button>
        <button id="no" onClick={this.closeWork} className="modal-close waves-effect waves-white btn-flat">No</button>
        <div id="last_line"> Without saving, all rogress will be lost.</div>
    </div>

    <div id="wireframe_dimensions">
        <div id="wireframe_dimension_left" className="font_dimension"> 
            <button id="dimension_width_button" disabled={this.state.width_status} onClick={this.handleChange_diagram_width} >Update Width </button>
            <input type="input" id="dimension_width" name="width" onChange ={(e) => this.checkWidth_diagram(e)}/>
        </div>
        <div id="wireframe_dimension_right" className="font_dimension"> 
            <button id="dimension_height_button" disabled={this.state.height_status} onClick = {this.handleChange_diagram_height}>Update Height </button>
            <input type="input" id="dimension_height" name="height" onChange ={(e) => this.checkHeight_diagram(e)}/>
        </div>
    </div> 

</div>
    

        );
    }
}

// mapStateToProps = Redux to Component (reading from the store)
const mapStateToProps = (state) => {
    return {
      auth: state.firebase.auth,
      accounts : state.firestore.ordered.accounts,
      wireframes: state.firebase.profile.wireframes
     }
  };

  export default compose(
    connect(mapStateToProps),
    firestoreConnect([
      { collection: 'accounts' },
    ]),
  )(WireframeBox);