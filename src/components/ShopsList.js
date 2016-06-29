import React from 'react';
import { Link } from 'react-router';
import { ListGroup, ListGroupItem, Image } from 'react-bootstrap';

class ShopsListItem extends React.Component {

  render() {
    const { name, description } = this.props;
    const { imageUrl } = this.props['booking_frontend_data'];

    return (
      <ListGroupItem className="shop-list-item">
        <Link to={`/shops/${this.props.id}`}>
          <div className="media">
            <div className="media-body">
              <h4>{name}</h4>
              <p>{description}</p>
            </div>
            <div className="media-right">
              <img className="media-object img-rounded"
                   src={imageUrl || 'http://placehold.it/150x100'} />
            </div>
          </div>
        </Link>
      </ListGroupItem>
    );
  }
}

export default class ShopsList extends React.Component {

  render() {
    const { shops } = this.props;
    return (
      <div className="shops-list">
      <div className="panel panel-primary">
        <div className="panel-heading">
          Shops
        </div>
        <ListGroup>
          {shops.map(shop => (
            <ShopsListItem {...shop} key={shop.id} />
          ))}
        </ListGroup>
      </div>
      </div>
    );
  }
}
