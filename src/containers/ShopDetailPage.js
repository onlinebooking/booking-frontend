import React from 'react';
import { connect } from 'react-redux';
import ShopDetail from '../components/ShopDetail';
import Spinner from '../components/Spinner';
import { loadShop, loadShopServices } from '../actions/shops';
import classNames from 'classnames';

function loadData(props) {
  const { shopId } = props.params;
  props.loadShop(shopId);
  props.loadShopServices(shopId);
}

class ShopDetailPage extends React.Component {

  componentWillMount() {
    loadData(this.props);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.params.shopId !== this.props.params.shopId) {
      loadData(nextProps);
    }
  }

  render() {
    // We can change this bheviur to show all loading or only a part
    const { shop, isFetchingServices, services } = this.props;
    const showSpinner = !shop || (isFetchingServices && !services.length);

    const contentClass = classNames('content-hidden', { 'content-shown' : !showSpinner });

    return  (
      <div>
        <Spinner show={showSpinner}/>
        <div className={contentClass} >
          <ShopDetail shop={shop} services={services} />
        </div>
      </div>
    )

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

export default connect(mapStateToProps, {
  loadShop,
  loadShopServices,
})(ShopDetailPage);
