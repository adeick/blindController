import { UPDATE_BLINDS } from "./type";

const initialState = {
    tlaBlinds: [60, 50, 40, 60, 60, 60, 60, 60, 60, 60, 60, 60, 60, 60, 60],
};

// Creating my reducer
export default function reducer(state = initialState, action) {
    switch (action.type) {
        case UPDATE_BLINDS:
            return { ...state, tlaBlinds: action.payload };
        default:
            return state;
    }
}
