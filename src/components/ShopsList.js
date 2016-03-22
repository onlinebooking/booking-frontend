import React from 'react';
import { values } from 'lodash';
import { Link } from 'react-router';
import { ListGroup, ListGroupItem, Image } from 'react-bootstrap';

class ShopsListItem extends React.Component {

  render() {
    const { name } = this.props;
    return (
      <Link to={`/shops/${this.props.id}`}>
        <ListGroupItem>
          <div>
            <div className="pull-left">
              <h4>{name}</h4>
              <p>Maybe Some description here.</p>
            </div>
            <Image className="pull-right responsive" src="http://placehold.it/150x100" />
            <div className="clearfix"></div>
          </div>
        </ListGroupItem>
      </Link>
    );
  }
}

export default class ShopsList extends React.Component {

  render() {
    const { shops } = this.props;
    return (
      <div>
        <ListGroup>
          {shops.map((shop) => {
            return <ShopsListItem {...shop} key={shop.id} />;
          })}
        </ListGroup>
      </div>
    );
  }
}
