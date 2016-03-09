import React from 'react';
import { connect } from 'react-redux';
import { loadShops } from '../actions';
import ShopsList from '../components/ShopsList';
import { Jumbotron } from 'react-bootstrap';
import Spinner from '../components/Spinner';

class ShopsListPage extends React.Component {

  componentWillMount() {
    this.props.loadShops();
  }

  render() {
    return (
      <div>
        <Jumbotron className="text-center home-jumbo">
          <h1>Online Booking</h1>
          <p>La piattaforma di prenotazioni multiservizio</p>
        </Jumbotron>
        {this.renderShopList()}
      </div>
    );
  }

  renderShopList() {
    if (this.props.isFetching && !this.props.shops.length) {
      return <Spinner />;
    }
    return <ShopsList shops={this.props.shops} />;
  }
}

function mapStateToProps(state) {
  const shops = state.homeShops.ids.map(id => state.entities.shops[id]);
  const isFetching = state.homeShops.isFetching;
  return { shops, isFetching };
}

export default connect(mapStateToProps, {
  loadShops
})(ShopsListPage);
