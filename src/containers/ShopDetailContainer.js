import { connect } from 'react-redux';
import ShopDetail from '../components/ShopDetail'
import { loadShops, loadShop, loadShopServices } from '../actions';
import React from 'react';


const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        loadShop : () => {
            dispatch(loadShop(ownProps.params.shopId))
        },
        loadShopServices : () => {
          dispatch(loadShopServices(ownProps.params.shopId))  
        }
    }
}


class ShopDetailContainer extends React.Component {

    componentWillMount(){
        this.props.loadShop()
    }

    componentWillReceiveProps(nextProps){
        console.log("got props", nextProps);
        if (nextProps.shop != this.props.shop) {
            console.log(1)
            this.props.loadShopServices();
        }
    }

    render(){
        if (!this.props.shop) {
            return <div>....</div>
        }
        return <ShopDetail shop={this.props.shop} services={this.props.services} />
    }

}


function mapStateTopProps(state, ownProps) {
    let props =  { 
        shop : state.entities.shops[ownProps.params.shopId],
        services : []
    }

    if ( state.shopServices[ownProps.params.shopId] ){
        props.services = state.shopServices[ownProps.params.shopId].items.map(id => state.entities.services[id]);    
    }
    

    return props
}


export default connect(mapStateTopProps, mapDispatchToProps)(ShopDetailContainer);

