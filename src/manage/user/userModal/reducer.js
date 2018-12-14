import actionType from './actionType';

const initialState = {showAddUserModal: false, showEditUserModal: false};

export default function (state = initialState, action) {

    switch (action.type) {

        case actionType.HIDE_ADD_USER_MODAL:
        {
            return (Object.assign({}, state, {
                showAddUserModal: false
            }));
        }


        case actionType.SHOW_ADD_USER_MODAL:
        {
            return (Object.assign({}, state, {
                showAddUserModal: true
            }));

        }

        case actionType.HIDE_EDIT_USER_MODAL:
        {
            return (Object.assign({}, state, {
                showEditUserModal: false
            }));

        }

        case actionType.SHOW_EDIT_USER_MODAL:
        {
            return (Object.assign({}, state, {
                showEditUserModal: true
            }));

        }
        default:
        {
            return state;
        }
    }

}