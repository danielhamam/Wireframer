/* 
    Purpose: ADD ALL CONSTANTS HERE FOR EASY CONFIGURATION
    Date: September 7 2022
*/

const constants = {

    // Register Screen
    passwordValidationErrMsg : 'Your password must be at least 6 characters long',
    registrationFailedErrMsg : 'Registration failed. Please check the field(s) again!',

    // Zoom out/in 
    SCALE_FACTOR_SIZE : 5, // for width/height
    SCALE_FACTOR_FONT : 1, // for font size
    MIN_FONT_SIZE_ZOOM: 4,
    MIN_ITEM_WIDTH_ZOOM: 10,
    MIN_ITEM_HEIGHT_ZOOM: 10,
    MAX_ITEM_WIDTH_ZOOM: 450,
    MAX_ITEM_HEIGHT_ZOOM: 450,
    MIN_FONT_SIZE_ZOOM: 4,
    MAX_FONT_SIZE_ZOOM: 50,

    // New Item Properties
    newItemProps : {
        'textfield' : {
            control : "textfield",
            control_width : "200",
            control_height: "25",
            control_text : "",
            control_font_size : "12",
            control_background : "#ffffff",
            control_border_color : "#000000",
            control_text_color : "",
            control_border_thickness : "0.5",
            control_border_radius : "2",
            control_x_position : 0,
            control_y_position : 0
        },
        'label' : {
            control : "label",
            control_width : "200",
            control_height: "",
            control_text : "Label",
            control_font_size : "12",
            control_background : "",
            control_border_color : "",
            control_text_color : "",
            control_border_thickness : "0",
            control_border_radius : "0",
            control_x_position : 0,
            control_y_position : 0
        },
        'button' : {
            control : "button",
            control_width : "180",
            control_height: "32",
            control_text : "Button",
            control_font_size : "16",
            control_background : "#DCDCDC",
            control_border_color : "#000000",
            control_text_color : "#000000",
            control_border_thickness : "0.5",
            control_border_radius : "4",
            control_x_position : 0,
            control_y_position : 0
        },
        'container' : {
            control : "container",
            control_width : "140",
            control_height: "80",
            control_text : "",
            control_font_size : "N/A",
            control_background : "#FFFFFF",
            control_border_color : "#000000",
            control_text_color : "N/A",
            control_border_thickness : "1",
            control_border_radius : "0",
            control_x_position : 0,
            control_y_position : 0
        }
    }
}

export default constants;