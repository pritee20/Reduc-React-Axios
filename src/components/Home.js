import React,{Component} from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import GameList from './GameList';
import {getGamesList} from './../actions/GetGamesAction';
class Home extends Component {
    constructor(props) {
        super(props);
    }
    componentDidMount () {
        this.props.getGamesList();
    }
    render() {
        return (
            <div>Home Page
                <GameList games={this.props.games}/>
            </div>
        )
    }
}
Home.propTypes = {
        games:React.PropTypes.array,
        getGamesList: React.PropTypes.func
};
function mapStateToProps (state) {
    return {
        games:state.games
    };
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({getGamesList}, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(Home);