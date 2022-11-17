import { UPDATE_BLINDS } from "./type";

export const updateBlinds = (blindArray) => (dispatch) => {

    return dispatch({
        type: UPDATE_BLINDS,
        payload: blindArray,
    });
};
