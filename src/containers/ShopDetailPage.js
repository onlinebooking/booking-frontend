import React from 'react';
import { connect } from 'react-redux';
import ShopDetail from '../components/ShopDetail';
import Spinner from '../components/Spinner';

class ShopDetailPage extends React.Component {

  render() {
    // We can change this bheviur to show all loading or only a part
    const { shop, isFetchingServices, services } = this.props;
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
    services,
  };
}

export default connect(mapStateToProps)(ShopDetailPage);
