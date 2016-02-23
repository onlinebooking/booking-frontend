import { connect } from 'react-redux';
import ShopsList from '../components/ShopsList'
import { loadShops } from '../actions';
import React from 'react';


const mapDispatchToProps = (dispatch) => {

    return {
        loadShops : () => {
            dispatch(loadShops())
        }
    }
}


class ShopsListContainer extends React.Component {

    componentWillMount(){
        this.props.loadShops()
    }

    render(){
        return <ShopsList shops={this.props.shops} />
    }

}


function mapStateTopProps(state) {
    return { shops : state.entities.shops }
}


export default connect(mapStateTopProps, mapDispatchToProps)(ShopsListContainer);

