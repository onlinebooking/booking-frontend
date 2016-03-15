import React from 'react';
import { connect } from 'react-redux';
import { loadShop, loadShopServices } from '../actions';
import ShopDetail from '../components/ShopDetail';
import Spinner from '../components/Spinner';

class ShopDetailPage extends React.Component {

  componentWillMount() {
    this.props.loadShop();
    // With a valid shop we can load related services
    if (this.props.shop) {
      this.props.loadShopServices();
    }
  }

  componentWillReceiveProps(nextProps) {
    // Shop id is changed, reload shop
    if (nextProps.params.shopId != this.props.params.shopId) {
      nextProps.loadShop();
    }
    // Shop is changend, relaoad relative services
    if (nextProps.shop != this.props.shop) {
      nextProps.loadShopServices();
    }
  }

  render() {
    // We can change this bheviur to show all loading or only a part
    const {shop, isFetchingServices, services} = this.props;
    const showSpinner = !shop || (isFetchingServices && !services.length);

    if (showSpinner) {
      return <Spinner />;
    }

    return <ShopDetail shop={shop} services={services} />;
  }
}

function mapStateToProps(state, ownProps) {
  const shopId = ownProps.params.shopId;
  const shop = state.entities.shops[shopId];
  const shopServicesRes = state.shopServices[shopId];

  let isFetchingServices = null;
  let services = [];

  if (shopServicesRes) {
    isFetchingServices = shopServicesRes.isFetching;
    services = shopServicesRes.ids.map(id => state.entities.services[id]);
  }

  return {
    shop,
    isFetchingServices,
    services
  };
}

function mapDispatchToProps(dispatch, ownProps) {
  const shopId = ownProps.params.shopId;
  return {
    loadShop: () => {
        dispatch(loadShop(shopId))
    },
    loadShopServices: () => {
      dispatch(loadShopServices(shopId))
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ShopDetailPage);
