import React from 'react';
import { connect } from 'react-redux';
import ShopDetail from '../components/ShopDetail';
import Spinner from '../components/Spinner';
import { loadShopAndServices } from '../actions/shops';
//import classNames from 'classnames';

function loadData(props) {
  const { shopDomainName } = props.params;
  props.loadShopAndServices(shopDomainName);
}

class ShopDetailPage extends React.Component {

  componentWillMount() {
    loadData(this.props);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.params.shopDomainName !== this.props.params.shopDomainName) {
      loadData(nextProps);
    }
  }

  render() {
    // We can change this bheviur to show all loading or only a part
    const { shop, isFetchingServices, services, options } = this.props;
    const showSpinner = !shop || (isFetchingServices && !services.length);

    if (showSpinner) {
      return <Spinner fullpage />;
    }

    return (
      <ShopDetail
        shop={shop}
        services={services}
        showFooter={!options.iframe || options.iframe.footer}
        showHeader={!options.iframe || options.iframe.header}
      />
    );
  }
}

function mapStateToProps(state, ownProps) {
  const shopDomainName = ownProps.params.shopDomainName;
  const shop = state.entities.shops[shopDomainName];
  const shopServicesRes = state.shopServices[shopDomainName];
  const options = state.options;

  // TODO: RESELECTIZE!
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
    options,
  };
}

export default connect(mapStateToProps, {
  loadShopAndServices,
})(ShopDetailPage);
