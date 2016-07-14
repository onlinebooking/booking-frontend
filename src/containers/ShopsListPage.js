import React from 'react';
import { connect } from 'react-redux';
import ShopsList from '../components/ShopsList';
import { Jumbotron } from 'react-bootstrap';
import Spinner from '../components/Spinner';
import { loadShops } from '../actions/shops';
import { getHomeShops } from '../selectors/shops';
import classNames from 'classnames';

function loadData(props) {
  props.loadShops();
}

class ShopsListPage extends React.Component {

  componentWillMount() {
    loadData(this.props);
  }

  render() {
    const headerImageUrl = `https://images.unsplash.com/photo-1458682625221-3a45f8a844c7`;
    const headerClass = classNames('shop-header shop-header-full');

    return (
      <div>
      <div className={headerClass} style={{ backgroundImage: `url(${headerImageUrl})` }}>
        <div className="text-center shop-header-background">
          <h1>Qando</h1>
          <div>La piattaforma di prenotazioni multiservizio</div>
        </div>
      </div>
      {this.renderShopList()}
      </div>
    );
  }

  renderShopList() {
    const { isFetching, shops } = this.props;

    if (isFetching && !shops.length) {
      return <Spinner fullpage />;
    }

    return (
      <div className="container-fluid">
        <ShopsList shops={shops} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  const shops = getHomeShops(state);
  const isFetching = state.homeShops.isFetching;
  return { shops, isFetching };
}

export default connect(mapStateToProps, {
  loadShops,
})(ShopsListPage);
