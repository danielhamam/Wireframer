// THIS FILE KNOWS HOW TO MAKE ALL THE ACTION
// OBJECTS THAT WE WILL USE. ACTIONS ARE SIMPLE
// LITTLE PACKAGES THAT REPRESENT SOME EVENT
// THAT WILL BE DISPATCHED TO THE STORE, WHICH
// WILL TRIGGER THE EXECUTION OF A CORRESPONDING
// REDUCER, WHICH ADVANCES STATE

// THESE ARE ALL THE TYPE OF ACTIONS WE'LL BE CREATING
export const REGISTER_STARTED = 'REGISTER_STARTED';
export const REGISTER_SUCCEEDED = 'REGISTER_SUCCEEDED';
export const REGISTER_ERRORED = 'REGISTER_ERRORED';
export const LOGIN_SUCCEEDED = 'LOGIN_SUCCESS';
export const LOGIN_ERRORED = 'LOGIN_ERROR';

// THESE CREATORS MAKE ACTIONS ASSOCIATED WITH USER ACCOUNTS

/*********************************************************************
* PURPOSE: When called, returns object with required information
* WHERE IS IT USED?: Used in userActions functions / mapDispatchtoProps
************************************************************************/

export const registerStarted = () => {
    return { 
        type: REGISTER_STARTED
    }
};

export const registerSucceeded = (newUser) => {
    return { 
        type: REGISTER_SUCCEEDED,
        user: newUser
    }
};
export function registerErrored(error) { 
    console.log("Registering register errored function, attaching error: ", error);
    return { 
        type: REGISTER_ERRORED, 
        error : error
    }
};
export function loginSucceeded() {
    return { 
        type: LOGIN_SUCCEEDED 
    }
};
export function loginErrored(error) {
    return { 
        type: LOGIN_ERRORED, 
        error : error
    }
};
export function logoutSucceeded() {
    return { type: LOGIN_SUCCEEDED }
};

// THESE CREATORS MAKE ACTIONS FOR ASYNCHRONOUS WIREFRAME UPDATES
export function createWireFrame(wireframe) {
    return {
        type: 'CREATE_WIREFRAME',
        wireframe
    }
}
export function createWireFrameError(error) {
    return {
        type: 'CREATE_WIREFRAME_ERROR',
        error
    }
}