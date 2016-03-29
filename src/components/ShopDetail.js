import React from 'react';
import { ListGroup, ListGroupItem, Thumbnail } from 'react-bootstrap';
import { Link } from 'react-router';

class ShopServiceListItem {

  render() {
    const { shop, service } = this.props;

    return (
      <ListGroupItem>
        <Link to={`/shops/${shop.id}/booking/${service.id}`}>
          {service.name}
        </Link>
      </ListGroupItem>
    );
  }
}

class ShopServiceList {

  render() {
    const { shop, services } = this.props;

    if (services.length) {
      return (
        <ListGroup>
          {services.map(service => (
            <ShopServiceListItem
              key={service.id}
              shop={shop}
              service={service}
            />
          ))}
        </ListGroup>
      );
    } else {
      return <div>No services for this shop.</div>;
    }
  }
}

class ShopDetailTop {

  render() {
    const { shop } = this.props;

    return (
      <div>
        <h2>Shop: {shop.name}</h2>
        <p><b>Domain name:</b> {shop.domainName}</p>
      </div>
    );
  }
}

export default class ShopDetail extends React.Component {

  render() {
    const { shop, services } = this.props;

    return (
      <div>
        <ShopDetailTop shop={shop} />
        <h4>Servizi</h4>
        <ShopServiceList shop={shop} services={services} />
      </div>
    );
  }
}
