import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import Spinner from '../components/Spinner';
import { loadShop, loadShopService } from '../actions/shops';
import { setBookingService } from '../actions/booking';

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
      <div className="booking-page-container">
        {this.renderTopShopAndServiceInfo()}
        <div className="booking-container">
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

    return (
      <div>
        <div className="service-description">
          <Link to={`/shops/${shop.id}`}>
            <h1>{shop.name}</h1>
          </Link>
          <p>{service.name}</p>
          <p>{service.description}</p>
        </div>
      </div>
    );
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
