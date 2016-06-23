import React from 'react';
import { ListGroup, ListGroupItem, Glyphicon } from 'react-bootstrap';
import { Link } from 'react-router';
import ShopHeader from './ShopHeader';

class ShopServiceListItem extends React.Component {

  render() {
    const { shop, service } = this.props;

    return (
      <ListGroupItem className="shop-list-item">
        <Link to={`/shops/${shop.id}/booking/${service.id}`}>
          <div className="media">
            <div className="media-left">
                {/*<img className="media-object img-rounded" src={`https://source.unsplash.com/random?a=${Math.random()*10000}`}/>*/}
                <img className="media-object img-rounded" src={service.serviceImage}/>
            </div>
            <div className="media-body">
              <h4>{service.name}</h4>
              <p>{service.description}</p>
            </div>
          </div>
        </Link>
      </ListGroupItem>
    );
  }
}

class ShopServiceList extends React.Component {

  render() {
    const { shop, services } = this.props;

    if (services.length) {
      return (
        <div className="panel panel-primary">
          <div className="panel-heading">
            Servizi
          </div>

        <ListGroup>
          {services.map(service => (
            <ShopServiceListItem
              key={service.id}
              shop={shop}
              service={service}
            />
          ))}
        </ListGroup>

        </div>

      );
    } else {
      return <div>No services for this shop.</div>;
    }
  }
}

class ShopFooter extends React.Component {
  render() {
    const { shop } = this.props;
    return (
      <div className="container-fluid shop-footer text-center">
        {shop.name}<br/>
        <small>
          {shop.address} - {shop.city}{' '}
          <Glyphicon glyph="phone-alt"/> {shop.phone}{' '}
          <Glyphicon glyph="envelope"/> {shop.mail}
        </small>
      </div>
    );
  }
}

export default class ShopDetail extends React.Component {

  render() {
    const { shop, services } = this.props;

    return (
      <div>
        <ShopHeader title={shop.name.toUpperCase()} caption={shop.description} />
        <div className="container-fluid shop-services">
          <ShopServiceList shop={shop} services={services} />
        </div>
        <ShopFooter shop={shop} />
      </div>
    );
  }
}
