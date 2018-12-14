import actionType from './actionType';

export function showAddUserModal() {
    return {
        type: actionType.SHOW_ADD_USER_MODAL
    };
}

export function showEditUserModal() {
    return {
        type: actionType.SHOW_EDIT_USER_MODAL
    };
}

export function hideAddUserModal() {
    return {
        type: actionType.HIDE_ADD_USER_MODAL
    };
}

export function hideEditUserModal() {
    return {
        type: actionType.HIDE_EDIT_USER_MODAL
    };
}