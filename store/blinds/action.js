import { UPDATE_BLINDS } from "./type";

// export const updateBlinds = (blindArray) => (dispatch) => {

//     return dispatch({
//         type: UPDATE_BLINDS,
//         payload: blindArray,
//     });
// };

const updateBlinds = (blindArray) => {
    return {
        type: UPDATE_BLINDS,
        payload: blindArray
    };
}

export default updateBlinds;