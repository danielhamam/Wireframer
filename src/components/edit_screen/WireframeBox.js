import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import { getFirestore } from 'redux-firestore';
import WireframeItem from './WireframeItem';
import constants from '../../config/constants';
class WireframeBox extends Component {
    state = {
        goHome : false,
        scale: 1, 
        staging_changes_items: this.props.wireframe ? [...this.props.wireframe.items] : [], // keeping track of original, unupdated items in case of 'Close Work'
        height : this.props.wireframe ? this.props.wireframe.height : 460,
        width : this.props.wireframe ? this.props.wireframe.width : 500,
        width_status : true,
        height_status : true,
        isCurrSelection : [false,null], // returns true if an item is currently selected
        pending_width : 0,
        pending_height : 0,
        prompt_save : false // modal save pop-up
    }

    setSave = () => {this.setState({prompt_save : true})} // If prompt_save is true, will prompt user if he/she would like to save when closing work.
    setCurrSelection = (toggleVal, itemId) => {this.setState({isCurrSelection : [toggleVal, itemId]})}

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
        
    saveWork = () => {

        // Set wireframes' items data
        this.props.wireframe.items = this.state.staging_changes_items; // set to staging wireframe

        // Set wireframes' data
        let new_name = document.getElementById("name_wireframe_field").value;
        this.props.wireframe.name = new_name;
        this.props.wireframe.width = this.state.width;
        this.props.wireframe.height = this.state.height;
        // this.props.wireframe.created_time = new Date(); // so it can be on top

        // Move it to be first on the list 
        if (this.props.wireframes.length > 1) {
            let temp = this.props.wireframes[0];
            this.props.wireframes[0] = this.props.wireframe;
            this.props.wireframes[this.props.wireframeIndex] = temp;
        }

        console.log('this.props.wireframes: ', this.props.wireframes);

        // Update wireframe
        getFirestore().collection("accounts").doc(this.props.accountId).update({ wireframes : this.props.wireframes});

        // Go back to home screen
        this.setState({goHome : true});
    }
    closeWork = () => {
        
        console.log('saving.....')
        console.log('this.props.wireframe: ', this.props.wireframe);
        console.log('this.state.staging_changes_wireframe: ', this.state.staging_changes_items);

        // Reset items staging changes to original wireframe
        this.setState({staging_changes_items : this.props.wireframe.items});

        // Move it to top of list if there are multiple
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
        this.state.staging_changes_items.push(new_item);
        this.setState({prompt_save : true});
    }

    // handleChange_name = (e) => { this.handleChange_itemProperty('name_wireframe_field', e.target.value) }
    handleChange_textColor = (e) => { this.handleChange_itemProperty('text_color_field', 'control_text_color', e.target.value) }
    handleChange_borderColor = (e) => { this.handleChange_itemProperty('border_color_field', 'control_border_color' ,e.target.value) }
    handleChange_backgroundColor = (e) => { this.handleChange_itemProperty('background_field', 'control_background' ,e.target.value) }
    handleChange_text = (e) => { this.handleChange_itemProperty('textfield_input', 'control_text', e.target.value) }
    handleChange_font_size = (e) => { this.handleChange_itemProperty('font_size_textfield', 'control_font_size', e.target.value)}
    handleChange_border_thickness = (e) => { this.handleChange_itemProperty('border_thickness_field', 'control_border_thickness' ,e.target.value) }
    handleChange_border_radius = (e) => { this.handleChange_itemProperty('border_radius_field', 'control_border_radius' ,e.target.value) }

    handleChange_itemProperty = (propertyId, propertyName, newValue) => {
        if (this.state.isCurrSelection[1] !== null) 
        {
            let selectedItem = this.state.staging_changes_items.find((item => item.id === this.state.isCurrSelection[1])); // should return the reference since type is object
            selectedItem[propertyName] = newValue;
            document.getElementById(propertyId).value = newValue;
            this.setState({staging_changes_items : this.state.staging_changes_items}); // force a rerender since this state var changed
        }
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
        const items = this.state.staging_changes_items;

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
                                {wireframe && items && items.map(item => (
                                    <WireframeItem items={items} item={item} key={item.id} isCurrSelection={this.state.isCurrSelection} 
                                    deleteItem = {this.deleteItem} duplicateItem={this.duplicateItem} zoomIn={this.zoomIn} zoomOut={this.zoomOut} 
                                    width={this.state.width} height={this.state.height} setSave={this.setSave} setCurrSelection={this.setCurrSelection}/>
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