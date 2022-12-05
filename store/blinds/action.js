import { UPDATE_BLINDS, DELETE_BLINDS } from "./type";

// export const updateBlinds = (blindArray) => (dispatch) => {

//     return dispatch({
//         type: UPDATE_BLINDS,
//         payload: blindArray,
//     });
// };

export const updateBlinds = (blindArray) => {
    return {
        type: UPDATE_BLINDS,
        payload: blindArray
    };
}

export const deleteBlinds = (blindArray) => {
    return {
        type: DELETE_BLINDS,
        payload: blindArray
    };
}

