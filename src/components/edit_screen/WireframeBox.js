import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import { getFirestore } from 'redux-firestore';
import WireframeMiddle from './WireframeMiddle';

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
    default_size : true,
    original_wireframes : this.props.accounts[this.props.accounts && this.props.accounts.map(function (account) {return account.id;}).indexOf(this.props.id)].wireframes,
    updatedList : false,
    prompt_save : false
    }

zoomIn = () => {

    let {accounts} = this.props;
    let index_acc = accounts && accounts.map(function (account) {return account.id;}).indexOf(this.props.id);
    let wireframe = accounts && accounts[index_acc].wireframes[this.props.wireframe_key];

    this.setState({ scale : this.state.scale * 2});
    let num = this.state.scale + "";
    let string = "scale(" + num + ")";

    {wireframe.items && wireframe.items.map( item => {
        document.getElementById("dimension").style.transform = string;
        // item.control_x_position = item.control_x_position * 2;
        // item.control_y_position = item.control_x_position * 2;
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
        document.getElementById("dimension").style.transform = string;
        // item.control_x_position = item.control_x_position / 2;
        // item.control_y_position = item.control_x_position / 2;
    })}
}

setSave = () => {
    this.setState({prompt_save : true});
}

deleteItem = (item) => {

    let {accounts} = this.props;
    let index_acc = accounts && accounts.map(function (account) {return account.id;}).indexOf(this.props.id);
    let wireframe = accounts && accounts[index_acc].wireframes[this.props.wireframe_key];

    let index = wireframe.items.indexOf(item);
    wireframe.items.splice( index, 1 ); // removed item
    this.setState({ rerender : true}); // rerender
}

duplicateItem = (item) => {

    let {accounts} = this.props;
    let index_acc = accounts && accounts.map(function (account) {return account.id;}).indexOf(this.props.id);
    let wireframe = accounts && accounts[index_acc].wireframes[this.props.wireframe_key];

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

    wireframe.items.push( item_duplicate ); // add duplicated item 
    this.setState({ rerender : true}); // rerender
    return item_duplicate;
    // return item_duplicate;
}
    
saveWork = (new_wireframe) => {

    const fireStore = getFirestore();
    let {accounts} = this.props;
    let index = accounts && accounts.map(function (account) {return account.id;}).indexOf(this.props.id);
    let wireframe_found = accounts && accounts[index].wireframes[this.props.wireframe_key];
    let new_name = document.getElementById("name_wireframe_field").value;
    wireframe_found.name = new_name;
    wireframe_found.width = this.state.width;
    wireframe_found.height = this.state.height;
    wireframe_found.created_time = new Date(); // so it can be on top

    let wireframes = accounts[index].wireframes;
    
    var temp = wireframes[0];
    wireframes[0] = wireframes[this.props.wireframe_key];
    wireframes[this.props.wireframe_key] = temp;

    fireStore.collection("accounts").doc(accounts[index].id).update({ wireframes : wireframes});

    this.setState({goHome : true});
}
closeWork = () => {

    const fireStore = getFirestore();

    let {accounts} = this.props;
    let index = accounts && accounts.map(function (account) {return account.id;}).indexOf(this.props.id);
        
    var temp = this.state.original_wireframes[0];
    this.state.original_wireframes[0] = this.state.original_wireframes[this.props.wireframe_key];
    this.state.original_wireframes[this.props.wireframe_key] = temp;
    
    getFirestore().collection("accounts").doc(accounts[index].id).update({ wireframes : this.state.original_wireframes}); 

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
    this.setState({prompt_save : true});
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
    this.setState({prompt_save : true});
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
    this.setState({prompt_save : true});
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
    this.setState({prompt_save : true});
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
    if (result.style.display == "block") {
        document.getElementById("my_modal").style.animation = "fadeout .6s";
        result.style.visibility = "hidden";
    } else {
        result.style.visibility = "visible";
        document.getElementById("my_modal").style.animation = "fadein .6s";
        result.style.display = "block";
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
            <div id="close_work" onClick={this.closeWork_check}> Close </div>
        </div>
        <div id="bottom_left"> 
            <div className="container_example">
                <div className="container_box" onClick={this.addContainer} > </div>
                <div id="container_text" > Container </div>
            </div>
            < br />
            <div id="prompt_for_input">
                <div className="prompt_text" onClick={this.addLabel} > Prompt for input:</div>
                <div id="label_text">Label</div>
            </div>
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
    </div> 

    <div id="middle_screen" className="middle_screen"> 
        <div id="dimension" className="dimension" style={{width: this.state.width + "px", height: this.state.height + "px"}}>
            <div id="zoomable"> 
                {wireframe.items && wireframe.items.map(item => (
                <WireframeMiddle item={item} wireframe={wireframe} deleteItem = {this.deleteItem} duplicateItem={this.duplicateItem} zoomIn={this.zoomIn} zoomOut={this.zoomOut} width={this.state.width} height={this.state.height} setSave={this.setSave}/>
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
                <input type="input" id="name_wireframe_field" onClick={this.prevent} defaultValue={wireframe.name} onChange = {(e) => this.handleChange_name(e)} />
            </div>
        </div>
    </div>

    <div id="my_modal" class="modal">
        <div class="modal-content ">
            <h4>Save Wireframe?</h4>
            <br />
            <p> Would you like to save your progress? </p>
        </div>
        <button id="yes" onClick={this.saveWork} class="modal-close waves-effect waves-white btn-flat">Yes</button>
        <button id="no" onClick={this.closeWork} class="modal-close waves-effect waves-white btn-flat">No</button>
        <div id="last_line"> Without saving, all progress will be lost.</div>
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

export default WireframeBox;