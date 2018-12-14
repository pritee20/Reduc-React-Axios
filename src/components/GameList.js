import React, { Component } from 'react';

const GameList = (props) => {
    const messg = (<p>No content yet loaded</p>);
    const gamesListMap = (
        props.games.map(listofgames => {
            return(
                <li key={listofgames.id}>Title:{listofgames.title}</li>
            )
        })
    );
    return (
        <div>{props.games.length === 0 ? messg : gamesListMap }</div>
    )
}
GameList.propTypes = {
    games: React.PropTypes.array
}

export default GameList;