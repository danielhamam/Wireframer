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
      }

    zoomIn = () => {

    }
    
    zoomOut = () => {
    
    }
    
    saveWork = () => {
    
    }
    
    closeWork = () => {
      this.setState({goHome : true});
    }

render() {

    if (this.state.goHome == true) {
        return <Redirect to={"/"} />
    }

    const {accounts} = this.props;
    const index = accounts && accounts.map(function (account) {return account.id;}).indexOf(this.props.id);
    const wireframe = accounts && accounts[index].wireframes[this.props.wireframe_key];
    let wireframe_new = wireframe;
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
                    <div className="container_box"> </div>
                    <div id="container_text"> Container </div>
                  </div>
                  < br />
                  <div id="prompt_for_input">
                    <div className="prompt_text"> Prompt for input:</div>
                  </div>
                  <div id="label_text"> Label</div>
                  < br />
                  <div className="button_example">
                    <button className="button_submit"> Submit</button>
                    <div id="button_text"> Button</div>
                  </div>
                  < br />
                  <div className="textfield_example">
                    <input type="input" className="textfield_input" placeholder="Input"/>
                    <p id="textfield_label" >Textfield</p>
                  </div>
              </div> 

              <div className = "right_screen">
              < br />
              <div className="labels_list"> 
                  <div className="properties_example">
                      <p id="properties_label" >Properties</p>
                      <input type="input" className="textfield_input"/>
                  </div>
                  <div id="font_size_label"> Font Size: 
                      <input type="input" id="font_size_textfield"/>
                  </div>
                  <div id="background_label"> Background: 
                      <input type="color" id="background_field" value="#000000" />
                  </div>
                  <div id="border_color_label"> Border Color: 
                      <input type="color" id="border_color_field" value="#ff0000" />
                  </div>
                  <div id="border_thickness_label"> Border Thickness:
                      <input type="input" id="border_thickness_field"/>
                  </div>
                  <div id= "border_radius_label"> Border Radius:
                      <input type="input" id="border_radius_field"/>
                  </div>
                  <div id= "name_of_wireframe"> Name:
                      <input type="input" id="name_wireframe_field" defaultValue={wireframe.name}/>
                  </div>
              </div>
            </div>

            <div className="middle_screen">
                {wireframe.items && wireframe.items.map(item => (
                    <WireframeMiddle item={item}/>
                ))}
            </div>

        </div>

        );
    }
}

export default WireframeBox;