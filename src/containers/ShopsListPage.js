import React from 'react';
import { connect } from 'react-redux';
import ShopsList from '../components/ShopsList';
import { Jumbotron } from 'react-bootstrap';
import Spinner from '../components/Spinner';
import { loadShops } from '../actions/shops';

function loadData(props) {
  props.loadShops();
}

class ShopsListPage extends React.Component {

  componentWillMount() {
    loadData(this.props);
  }

  render() {
    return (
      <div>
        <Jumbotron className="text-center home-jumbo">
          <h1>Qando</h1>
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

export default connect(mapStateToProps, {
  loadShops,
})(ShopsListPage);
