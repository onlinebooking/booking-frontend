import { connect } from 'react-redux';
import ShopsList from '../components/ShopsList'
import { loadShops } from '../actions';
import React from 'react';
import { Jumbotron } from 'react-bootstrap';



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
        return (
            <div className="">
             <Jumbotron className="text-center home-jumbo">
                <h1>Online Booking</h1>
                <p>La piattaforma di prenotazioni multiservizio</p>
            </Jumbotron>
            <ShopsList shops={this.props.shops} />
            </div>
        )
    }

}


function mapStateTopProps(state) {
    const shops = state.homeShopList.items.map(id => state.entities.shops[id]);
    return { shops }
}


export default connect(mapStateTopProps, mapDispatchToProps)(ShopsListContainer);

