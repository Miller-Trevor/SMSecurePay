import { createGlobalState } from "react-hooks-global-state";

const {setGlobalState, useGlobalState} = createGlobalState({
    loggedInUser: 'Guest',
    UserID: 0
});

export{useGlobalState, setGlobalState};
