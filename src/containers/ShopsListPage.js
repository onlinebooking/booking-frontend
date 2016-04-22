import React from 'react';
import { connect } from 'react-redux';
import ShopsList from '../components/ShopsList';
import { Jumbotron } from 'react-bootstrap';
import Spinner from '../components/Spinner';

class ShopsListPage extends React.Component {

  render() {
    return (
      <div>
        <Jumbotron className="text-center home-jumbo">
          <h1>Qnando Booking</h1>
          <p>La piattaforma di prenotazioni multiservizio</p>
        </Jumbotron>
        {this.renderShopList()}
      </div>
    );
  }

  renderShopList() {
    const { isFetching, shops } = this.props;

    if (isFetching && !shops.length) {
      return <Spinner />;
    }
    return <ShopsList shops={shops} />;
  }
}

function mapStateToProps(state) {
  const shops = state.homeShops.ids.map(id => state.entities.shops[id]);
  const isFetching = state.homeShops.isFetching;
  return { shops, isFetching };
}

export default connect(mapStateToProps)(ShopsListPage);
