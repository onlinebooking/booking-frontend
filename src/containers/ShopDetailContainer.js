import { connect } from 'react-redux';
import ShopDetail from '../components/ShopDetail'
import { loadShops, loadShop } from '../actions';
import React from 'react';


const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        loadShop : () => {
            dispatch(loadShop(ownProps.params.shopId))
        }
    }
}


class ShopDetailContainer extends React.Component {

    componentWillMount(){
        this.props.loadShop()
    }

    componentWillReceiveProps(nextProps){
        console.log("got props", nextProps);
    }

    render(){
        if (!this.props.shop) {
            return <div>....</div>
        }
        return <ShopDetail {...this.props.shop} />
    }

}


function mapStateTopProps(state, ownProps) {
    return { shop : state.entities.shops[ownProps.params.shopId] }
}


export default connect(mapStateTopProps, mapDispatchToProps)(ShopDetailContainer);

