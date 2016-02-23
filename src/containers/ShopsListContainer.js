import { connect } from 'react-redux';
import ShopsList from '../components/ShopsList'
import { loadShops } from '../actions';


const mapDispatchToProps = (dispatch) => {

    return {
        onShopClick : () => {
            dispatch(loadShops())
        }
    }

}


function mapStateTopProps(state) {
    return { shops : state.entities.shops }
}


export default connect(mapStateTopProps, mapDispatchToProps)(ShopsList);

