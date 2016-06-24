import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import Spinner from '../components/Spinner';
import { loadShop, loadShopService } from '../actions/shops';
import { setBookingService } from '../actions/booking';
import ShopHeader from '../components/ShopHeader';

function loadData(props) {
  const { shopId, serviceId } = props.params;
  props.loadShop(shopId);
  props.loadShopService(shopId, serviceId);
  props.setBookingService(serviceId);
}

class ServiceBooking extends React.Component {

  componentWillMount() {
    loadData(this.props);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.params.shopId !== this.props.params.shopId ||
        nextProps.params.serviceId !== this.props.params.serviceId) {
      loadData(nextProps);
    }
  }

  render() {
    const { shop, service } = this.props;

    if (!shop || !service) {
      return <Spinner />;
    }

    return (
      <div>
        {this.renderTopShopAndServiceInfo()}
        <div>
          {this.props.children && React.cloneElement(this.props.children, {
            shop,
            service,
          })}
        </div>
      </div>
    );
  }

  renderTopShopAndServiceInfo() {
    const { shop, service } = this.props;
    const title = (
      <Link to={`/shops/${shop.id}`} style={{ textDecoration: 'none', color: 'white' }}>
        <h1>{shop.name}</h1>
      </Link>
    );
    const caption = (
      <div>
        <div>{service.name}</div>
        <div>{service.description}</div>
      </div>
    );
    return <ShopHeader title={title} caption={caption} full={false} />
  }
}

function mapStateToProps(state, ownProps) {
  const shopId = ownProps.params.shopId;
  const serviceId = ownProps.params.serviceId;
  const shop = state.entities.shops[shopId];
  let service;

  // Is a service shop?
  if (shop) {
    service = state.entities.services[serviceId];
    if (service && Number(service.shop) !== Number(shop.id)) {
      service = null;
    }
  }

  return {
    shop,
    service,
  };
}

export default connect(mapStateToProps, {
  loadShop,
  loadShopService,
  setBookingService,
})(ServiceBooking);
