import { SET_GAMES_LIST }  from './../actions/GetGamesActionTypes';
export default function games (state = [],action={}) {
    switch(action.type){
        case SET_GAMES_LIST:
        return action.payload;

        default: return state;
    }
}