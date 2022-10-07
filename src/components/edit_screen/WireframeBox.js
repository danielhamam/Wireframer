import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import { getFirestore } from 'redux-firestore';
import WireframeItem from './WireframeItem';
import constants from '../../config/constants';
class WireframeBox extends Component {
    constructor(props) {
        super(props);
        // this.textFieldInputRef = React.createRef();
        // this.fontSizeTextfieldRef = React.createRef();
        // this.textColorFieldRef = React.createRef();
        // this.backgroundFieldRef = React.createRef();
        // this.borderColorFieldRef = React.createRef();
        // this.borderThicknessFieldRef = React.createRef();
        // this.borderRadiusFieldRef = React.createRef();
    }
    state = {
        goHome : false,
        scale: this.props.wireframe ? this.props.wireframe.scale : 1, 
        staging_changes_items: this.props.wireframe ? global.structuredClone(this.props.wireframe.items) : [], // DEEP COPY - keeping track of original, unupdated items in case of 'Close Work'
        name: this.props.wireframe ? this.props.wireframe.name : '',
        height : this.props.wireframe ? this.props.wireframe.height : 460,
        width : this.props.wireframe ? this.props.wireframe.width : 500,
        isCurrSelection : [false,null], // returns true if an item is currently selected
        isWidthEnabled : true,
        isHeightEnabled : true,
        pending_width : 0,
        pending_height : 0,
        prompt_save : false, // modal save pop-up
        z_index_high : this.props.wireframe.bringToFrontVal ? this.props.wireframe.bringToFrontVal : 1073741823,
        z_index_low : this.props.wireframe.sendToBackVal ? this.props.wireframe.sendToBackVal : 1073741823,
        isModalOpen : false
    }

    setSave = () => {this.setState({prompt_save : true})} // If prompt_save is true, will prompt user if he/she would like to save when closing work.
    setCurrSelection = (toggleVal, itemId) => {
        this.setState({isCurrSelection : [toggleVal, itemId]})
    }

    getSelectedItem = () => {
        if (this.state.isCurrSelection[1] != null)
            return this.state.staging_changes_items.find((item) => item.id === this.state.isCurrSelection[1]);
    }

    zoomIn = (e) => {
        // let calculatedScale = this.state.scale * 1.5;
        this.state.staging_changes_items.forEach((item) => {
            console.log("before item: ", item);
            item.control_width = (parseInt(item.control_width) + constants.SCALE_FACTOR_SIZE).toString() < constants.MAX_ITEM_WIDTH_ZOOM ? (parseInt(item.control_width) + constants.SCALE_FACTOR_SIZE).toString() : "0";
            item.control_height = (parseInt(item.control_height) + constants.SCALE_FACTOR_SIZE).toString() < constants.MAX_ITEM_HEIGHT_ZOOM ? (parseInt(item.control_height) + constants.SCALE_FACTOR_SIZE).toString() : "0";
            item.control_font_size = (parseInt(item.control_font_size) + constants.SCALE_FACTOR_FONT).toString() < constants.MAX_FONT_SIZE_ZOOM ? (parseInt(item.control_font_size) + constants.SCALE_FACTOR_FONT).toString() : "0";
            // console.log("after item: ", item);
        });
        // this.setState({ scale : calculatedScale});
        this.setSave();
    }
        
    zoomOut = (e) => {
        // console.log("before item: ", item);
        this.state.staging_changes_items.forEach((item) => {
            console.log("before item: ", item);
            item.control_width = (parseInt(item.control_width) - constants.SCALE_FACTOR_SIZE).toString() > constants.MIN_ITEM_WIDTH_ZOOM ? (parseInt(item.control_width) - constants.SCALE_FACTOR_SIZE).toString() : "0";
            item.control_height = (parseInt(item.control_height) - constants.SCALE_FACTOR_SIZE).toString() > constants.MIN_ITEM_HEIGHT_ZOOM  ? (parseInt(item.control_height) - constants.SCALE_FACTOR_SIZE).toString() : "0";
            item.control_font_size = (parseInt(item.control_font_size) - constants.SCALE_FACTOR_FONT).toString() > constants.MIN_FONT_SIZE_ZOOM ? (parseInt(item.control_font_size) - constants.SCALE_FACTOR_FONT).toString() : "0";
            console.log("after item: ", item);
        });
        // console.log("after item: ", item);
        this.setSave();
    }
        
    saveWork = () => {

        console.log('stage: ', this.state.staging_changes_items);
        // Set wireframes' items data
        this.props.wireframe.items = this.state.staging_changes_items; // set to staging wireframe

        // Set wireframes' data
        this.props.wireframe.name = this.state.name;
        this.props.wireframe.width = this.state.width;
        this.props.wireframe.height = this.state.height;
        this.props.wireframe.scale = this.state.scale;
        this.props.wireframe.bringToFrontVal = this.state.z_index_high;
        this.props.wireframe.sendToBackVal = this.state.z_index_low;
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
        
        // console.log('BEFORE this.state.staging_changes_wireframe: ', this.state.staging_changes_items);
        // console.log('AFTER this.state.staging_changes_wireframe: ', this.state.staging_changes_items);

        // Move it to top of list if there are multiple
        if (this.props.wireframes.length > 1) {
            let temp = this.props.wireframes[0];
            this.props.wireframes[0] = this.props.wireframes[this.props.wireframeIndex];
            this.props.wireframes[this.props.wireframeIndex] = temp;
            getFirestore().collection("accounts").doc(this.props.accountId).update({ wireframes : this.props.wireframes}); 
        }
        // Reset items staging changes to original wireframe
        this.setState({staging_changes_items : this.props.wireframe.items});
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
            z_index : 1073741823,
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
            this.setSave();
        }
    }

    handleChange_name = (e) => { this.setState({ name: e.target.value}); this.setSave(); }
    handleChange_diagram_width = (e) => { this.setState({ width: this.state.pending_width}); this.setSave(); }
    handleChange_diagram_height = (e) => { this.setState({ height: this.state.pending_height}); this.setSave(); }
    checkWidth_diagram = (e) => {
        if (e.target.value <= 5000 && e.target.value >= 1) {
            this.setState({isWidthEnabled : false});
            this.setState({pending_width : e.target.value})
        }
        else {
            this.setState({isWidthEnabled : true});
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
        let myModal = document.getElementById("my_modal");
        let modalOverlay = document.getElementById("modal_screen_overlay");
        if (myModal.style.display === "block") {
            myModal.style.animation = "fadeout .6s";
            myModal.style.visibility = "hidden";
            modalOverlay.style.display = "hidden";
            this.setState({isModalOpen : false});
        } else {
            myModal.style.visibility = "visible";
            myModal.style.animation = "fadein .6s";
            myModal.style.display = "block";
            modalOverlay.style.display = "block";
            this.setState({isModalOpen : true});
        }
    }

    deleteItem = (item) => {
        let index = this.state.staging_changes_items.indexOf(item);
        this.state.staging_changes_items.splice( index, 1 ); // removed item
        this.setState({ rerender : true}); // rerender
        // console.log('deleted item');
      }

    sendItemToBack = () => {
        // Check if selected item exists
        if (this.state.isCurrSelection[0] === true && this.state.isCurrSelection[1] != null) {
            let selectedItem = this.getSelectedItem();
            if (selectedItem != null) {
                console.log("Moving z index of ", selectedItem, " back to ", this.state.z_index_low - 1);
                selectedItem.z_index = this.state.z_index_low - 1;
                this.setState((prevState) => ({z_index_low : prevState.z_index_low - 1}));
                this.setSave();
            }
        }
    }
    bringItemToFront = () => {
        let selectedItem = this.getSelectedItem();
        // Check if selected item exists
        if (selectedItem != null && this.state.isCurrSelection[0] && this.state.isCurrSelection[1] != null) {
            selectedItem.z_index = this.state.z_index_high + 1;
            this.setState((prevState) => ({z_index_high : prevState.z_index_high + 1})); // call back function
            console.log("Moving z index of ", selectedItem, " in front to ", this.state.z_index_high + 1);
            this.setSave();
        }
    }
    updatePropertyLabels = () => {
        // Check if selected item exists
        if (this.state.isCurrSelection[0] === true && this.state.isCurrSelection[1] != null) {
            let item = this.state.isCurrSelection[1];
            // debugger;
            document.getElementById("font_size_textfield").value = item.control_font_size;
            document.getElementById("textfield_input").value = item.control_text;
            document.getElementById("text_color_field").value = item.control_text_color;
            document.getElementById("background_field").value = item.control_background; // background color
            document.getElementById("border_color_field").value = item.control_border_color; // background color
            document.getElementById("border_thickness_field").value = item.control_border_thickness;
            document.getElementById("border_radius_field").value = item.control_border_radius ;
        }
    }

    componentDidUpdate = () => {
        // Here, we are going to update the properties panel on the right side with the props of the item.

        // 1. Check if selected item exists
        if (this.state.isCurrSelection[0] === true && this.state.isCurrSelection[1] != null && !this.state.goHome) {
            let item = this.getSelectedItem();
            // console.log("Item: ", item);
            // if item is container
            if (item != null) {
                if (item.control === 'container') {
                    document.getElementById("font_size_textfield").setAttribute('disabled', '');
                    document.getElementById("textfield_input").setAttribute('disabled', '');
                    document.getElementById("text_color_field").setAttribute('disabled', '');
                    document.getElementById("font_size_textfield").value = "N/A";
                    document.getElementById("textfield_input").value =  "N/A";
                    document.getElementById("text_color_field").value =  "N/A";
                    // document.getElementById("font_size_textfield").style.backgroundColor = 'lightgray';
                    // document.getElementById("textfield_input").style.backgroundColor = 'lightgray';
                    // document.getElementById("text_color_field").style.backgroundColor = 'lightgray';
                }
                // not a container
                else {
                    document.getElementById("font_size_textfield").removeAttribute('disabled');
                    document.getElementById("textfield_input").removeAttribute('disabled');
                    document.getElementById("text_color_field").removeAttribute('disabled');
                    document.getElementById("font_size_textfield").value = item.control_font_size;
                    document.getElementById("textfield_input").value = item.control_text;
                    document.getElementById("text_color_field").value = item.control_text_color;
                }
                // do for all items
                    document.getElementById("background_field").value = item.control_background; // background color
                    document.getElementById("border_color_field").value = item.control_border_color; // background color
                    document.getElementById("border_thickness_field").value = item.control_border_thickness;
                    document.getElementById("border_radius_field").value = item.control_border_radius ;
                }
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
                            <div id="save_work" onClick={this.saveWork}> Save </div>
                            <div id="close_work" onClick={this.closeWork_check}> Close </div>
                        </div>
                        <div id="bottom_left"> 
                            <div className='left_screen_title'> <b> Please click an item to add: </b> </div>
                            <div className="container_example example_item">
                                <div className="container_box example_item_select" onClick={() => this.addNewItem('container')} > 
                                    <div id="container_text"> Container </div>
                                </div>
                            </div>
                            <div id="prompt_for_input" className='example_item'>
                                <div className="prompt_text example_item_select" onClick={() => this.addNewItem('label')} > 
                                    <div id="label_text"> Label </div>
                                </div>
                            </div>
                            <div className="button_example example_item">
                                <button className="button_submit example_item_select" onClick={() => this.addNewItem('button')}> 
                                    <div id="button_text"> Button </div>
                                </button>
                            </div>
                            <div className="textfield_example example_item">
                                <input type="input" className="textfield_input example_item_select" placeholder="Textfield" onClick={() => this.addNewItem('textfield')} />
                                {/* <p id="textfield_label" className='example_item'>Textfield</p> */}
                            </div>
                        </div>
                    </div> 
                    <div id="middle_screen" className="middle_screen"> 
                        <div id="dimension" className="dimension" style={{width: this.state.width + "px", height: this.state.height + "px", scale: parseFloat(this.state.scale).toFixed(1)}}>
                            {wireframe && items && items.map(item => (
                                <WireframeItem items={items} item={item} key={item.id} isCurrSelection={this.state.isCurrSelection} 
                                deleteItem = {this.deleteItem} duplicateItem={this.duplicateItem} zoomIn={this.zoomIn} zoomOut={this.zoomOut} 
                                width={this.state.width} height={this.state.height} setSave={this.setSave} setCurrSelection={this.setCurrSelection}
                                // Refs for property elements
                                textFieldInputRef={this.textFieldInputRef} fontSizeTextfieldRef={this.fontSizeTextfieldRef} textColorFieldRef={this.textColorFieldRef}
                                backgroundFieldRef={this.backgroundFieldRef} borderColorFieldRef={this.borderColorFieldRef} borderThicknessFieldRef={this.borderThicknessFieldRef}
                                borderRadiusFieldRef={this.borderRadiusFieldRef} scale={this.state.scale}
                                />
                            ))}
                        </div>
                    </div>
                    <div className = "right_screen">
                            <div className="labels_list"> 
                            { this.state.isCurrSelection[0] ? 
                                // Case where item is selected
                                <div className='right_screen_item_selected'>
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
                                    <div id= "zIndexItem">
                                        <input type="button" id="bring_to_front" value="Bring to Front" onClick={() => this.bringItemToFront()}/>
                                        <input type="button" id="send_to_back" value="Send to Back" onClick={() => this.sendItemToBack()}/>
                                    </div> 
                                    <div id= "name_of_wireframe" className="name_of_wireframe"> Name:
                                        <input type="input" id="name_wireframe_field" onClick={this.prevent} defaultValue={this.state.name} onChange = {(e) => this.handleChange_name(e)} />
                                    </div>
                                </div>
                                : 
                                // Case where item isn't selected
                                <>
                                    <div className='right_screen_no_item'> No item is selected </div>
                                    <div id= "name_of_wireframe" className="name_of_wireframe_no_item"> Name:
                                        <input type="input" id="name_wireframe_field" onClick={this.prevent} defaultValue={this.state.name} onChange = {(e) => this.handleChange_name(e)} />
                                    </div>
                                </>
                                }
                            </div>
                    </div> 
                    <div id="modal_screen_overlay"> </div>
                    <div id="my_modal" className="modal">
                        <div className="modal-content ">
                            <h4>Save Wireframe?</h4>
                            <span> Would you like to save your progress? </span>
                        </div>
                        <button id="yes" onClick={this.saveWork} className="modal-close" style={{marginRight: '12px'}}>Yes</button>
                        <button id="no" onClick={this.closeWork} className="modal-close">No</button>
                        <div id="last_line"> Without saving, all progress will be lost.</div>
                    </div>
                    <div id="wireframe_dimensions">
                        <div id="wireframe_dimension_left" className="font_dimension"> 
                            <button id="dimension_width_button" disabled={this.state.isWidthEnabled} onClick={this.handleChange_diagram_width} >Update Width </button>
                            <input type="input" id="dimension_width" name="width" onChange ={(e) => this.checkWidth_diagram(e)}/>
                        </div>
                        <div id="wireframe_dimension_right" className="font_dimension"> 
                            <button id="dimension_height_button" disabled={this.state.isHeightEnabled} onClick = {this.handleChange_diagram_height}>Update Height </button>
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