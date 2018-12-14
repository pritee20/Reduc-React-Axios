import axios from 'axios';
import { SET_GAMES_LIST } from './GetGamesActionTypes';
export function setGamesList (payload) {
    return {
        type: SET_GAMES_LIST,
        payload
    }

}
export function getGamesList() {
    return (dispatch)=> {
        axios.get('https://jsonplaceholder.typicode.com/posts').then((response) => {
            console.log('getgamelist',response.data);
            dispatch(setGamesList(response.data));
        });
    };
}