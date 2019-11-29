import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import { getFirestore } from 'redux-firestore';

class EditScreen extends Component {
  state = {
    goHome : false,
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

        return (

        <div className="edit_box">
          
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
                    <div id="container_box"> </div>
                    <div id="container_text"> Container </div>
                  </div>
                  < br />
                  <div className="prompt_for_input">
                    <div id="prompt_text"> Prompt for input:</div>
                    <div id="label_text"> Label</div>
                  </div>
                  < br />
                  <div className="button_example">
                    <button id="button_submit"> Submit</button>
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
                      <input type="input" className="textfield_input" defaultValue="Submit"/>
                  </div>
                  <div id="font_size_label"> Font Size: 
                      <input type="input" id="font_size_textfield"/>
                  </div>
                  <div id="background_label"> Background: 
                      <input type="color" id="background_field" value="#000000"/ >
                  </div>
                  <div id="border_color_label"> Border Color: 
                      <input type="color" id="border_color_field" value="#ff0000"/ >
                  </div>
                  <div id="border_thickness_label"> Border Thickness:
                      <input type="input" id="border_thickness_field"/>
                  </div>
                  <div id= "border_radius_label"> Border Radius:
                      <input type="input" id="border_radius_field"/>
                  </div>
              </div>

            </div>

          </div>
        </div>
        );
    }
}


const mapStateToProps = (state, ownProps) => {
    const { id } = ownProps.match.params;
    const { accounts } = state.firestore.data;
    const account = accounts ? accounts[id] : null;
    // accounts.id = id;
  
    return {
    //   todoList,
      auth: state.firebase.auth,
    };
  };
  
  export default compose(
    connect(mapStateToProps),
    firestoreConnect([
      { collection: 'accounts' },
    ]),
  )(EditScreen);
