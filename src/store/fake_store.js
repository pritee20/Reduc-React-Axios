export const fakeStore = (state, action) => {
    return {
        default: () => {
        },
        subscribe: () => {
        },
        dispatch: () => {
            return {action};
        },
        getState: () => {
            return Object.assign({}, state);
        }
    };
};
