import { UPDATE_BLINDS, DELETE_BLINDS } from "./type";

const initialState = [
    {
        "blindsId": -1,
        "blindsIP": "sddec22-11-1.ece.iastate.edu",
        "blindsPos": -1
    },
    {
        "blindsId": -1,
        "blindsIP": "sddec22-11-2.ece.iastate.edu",
        "blindsPos": -1
    },
    {
        "blindsId": -1,
        "blindsIP": "sddec22-11-3.ece.iastate.edu",
        "blindsPos": -1
    },
    {
        "blindsId": -1,
        "blindsIP": "sddec22-11-4.ece.iastate.edu",
        "blindsPos": -1
    },
    {
        "blindsId": -1,
        "blindsIP": "sddec22-11-5.ece.iastate.edu",
        "blindsPos": -1
    },
    {
        "blindsId": -1,
        "blindsIP": "sddec22-11-6.ece.iastate.edu",
        "blindsPos": -1
    },
    {
        "blindsId": -1,
        "blindsIP": "sddec22-11-7.ece.iastate.edu",
        "blindsPos": -1
    },
    {
        "blindsId": -1,
        "blindsIP": "sddec22-11-8.ece.iastate.edu",
        "blindsPos": -1
    },
    {
        "blindsId": -1,
        "blindsIP": "sddec22-11-9.ece.iastate.edu",
        "blindsPos": -1
    },
    {
        "blindsId": -1,
        "blindsIP": "sddec22-11-10.ece.iastate.edu",
        "blindsPos": -1
    },
    {
        "blindsId": -1,
        "blindsIP": "sddec22-11-11.ece.iastate.edu",
        "blindsPos": -1
    },
    {
        "blindsId": -1,
        "blindsIP": "sddec22-11-12.ece.iastate.edu",
        "blindsPos": -1
    },
    {
        "blindsId": -1,
        "blindsIP": "sddec22-11-13.ece.iastate.edu",
        "blindsPos": -1
    },
    {
        "blindsId": -1,
        "blindsIP": "sddec22-11-14.ece.iastate.edu",
        "blindsPos": -1
    },
    {
        "blindsId": -1,
        "blindsIP": "sddec22-11-15.ece.iastate.edu",
        "blindsPos": -1
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
                    return {
                        "blindsId": -1,
                        "blindsIP": blind.blindsIP,
                        "blindsPos": -1
                    };
                }
            });  //Update current state with new data
        case DELETE_BLINDS:
            return state.map(blind => {
                const blindToUpdate = action.payload.map(temp => {
                    if (temp.blindsIP == blind.blindsIP) {
                        return {
                            "blindsId": -1,
                            "blindsIP": blind.blindsIP,
                            "blindsPos": -1
                        };
                    }
                    else {
                        return blind;
                    }
                });
                return blindToUpdate;
            });
        default:
            return state;
    }
}


// state.map(blind => {
//     const blindBeingDeleted = action.payload.find(temp => {
//         if (temp.blindsIP == blind.blindsIP) {
//             return {
//                 "blindsId": -1,
//                 "blindsIP": blind.blindsIP,
//                 "blindsPos": -1
//             }
//         }
//     })
//     console.log("Reducer");
//     console.log(blindBeingDeleted);
//     if (blindBeingDeleted) {
//         return blindBeingDeleted;
//     }
//     else {
//         return blind;
//     }
// })