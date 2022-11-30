import { UPDATE_BLINDS } from "./type";

const initialState = [
    {
        "blindsId": 1,
        "blindsIP": "sddec22-11-1.ece.iastate.edu",
        "blindsPos": 1
    },
    {
        "blindsId": 2,
        "blindsIP": "sddec22-11-2.ece.iastate.edu",
        "blindsPos": 1
    },
    {
        "blindsId": 3,
        "blindsIP": "sddec22-11-3.ece.iastate.edu",
        "blindsPos": 2
    },
    {
        "blindsId": 4,
        "blindsIP": "sddec22-11-4.ece.iastate.edu",
        "blindsPos": 3
    },
    {
        "blindsId": 5,
        "blindsIP": "sddec22-11-5.ece.iastate.edu",
        "blindsPos": 5
    },
    {
        "blindsId": 6,
        "blindsIP": "sddec22-11-6.ece.iastate.edu",
        "blindsPos": 0
    },
    {
        "blindsId": 7,
        "blindsIP": "sddec22-11-7.ece.iastate.edu",
        "blindsPos": 0
    },
    {
        "blindsId": 8,
        "blindsIP": "sddec22-11-8.ece.iastate.edu",
        "blindsPos": 0
    },
    {
        "blindsId": 9,
        "blindsIP": "sddec22-11-9.ece.iastate.edu",
        "blindsPos": 0
    },
    {
        "blindsId": 10,
        "blindsIP": "sddec22-11-10.ece.iastate.edu",
        "blindsPos": 0
    },
    {
        "blindsId": 11,
        "blindsIP": "sddec22-11-11.ece.iastate.edu",
        "blindsPos": 0
    },
    {
        "blindsId": 12,
        "blindsIP": "sddec22-11-12.ece.iastate.edu",
        "blindsPos": 0
    },
    {
        "blindsId": 13,
        "blindsIP": "sddec22-11-13.ece.iastate.edu",
        "blindsPos": 0
    },
    {
        "blindsId": 14,
        "blindsIP": "sddec22-11-14.ece.iastate.edu",
        "blindsPos": 0
    },
    {
        "blindsId": 15,
        "blindsIP": "sddec22-11-15.ece.iastate.edu",
        "blindsPos": 0
    }];

// Creating my reducer
export default function reducer(state = initialState, action) {
    switch (action.type) {
        case UPDATE_BLINDS:
            return state.map(blind => {
                const blindBeingUpdated = action.payload.find(temp => {
                    if (temp.blindsIP == blind.blindsIP) {
                        return temp;
                    }
                })
                if (blindBeingUpdated && blindBeingUpdated.blindsPos != blind.blindsPos) {
                    return blindBeingUpdated;
                }
                else {
                    return blind;
                }
            });  //Update current state with new data
        default:
            return state;
    }
}
