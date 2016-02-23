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

    render(){
        if (this.props.loading) {
            return <div>....</div>
        }
        return <ShopDetail {...this.props.shop} />
    }

}


function mapStateTopProps(state, ownProps) {
    return { shop : state.entities.shops[ownProps.params.shopId], loading : state.loading.shop }
}


export default connect(mapStateTopProps, mapDispatchToProps)(ShopDetailContainer);

