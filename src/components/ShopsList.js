import React from 'react';
import { values } from 'lodash';
import { Link } from 'react-router';
import { ListGroup, ListGroupItem, Image } from 'react-bootstrap';

class ShopsListItem extends React.Component {

    render(){
        return <Link to={`/shops/${this.props.id}`}>
                <ListGroupItem>
                    <div>
                        <div className="pull-left">
                            <h4>{this.props.name}</h4>
                            <p>Maybe Some description here.</p>
                        </div>
                        <Image className="pull-right responsive" src="http://placehold.it/150x100" />    
                        <div className="clearfix"></div>
                    </div>
                    
                </ListGroupItem>
            </Link>
    }
}


export default class ShopsList extends React.Component {

    render(){
        const shops = values(this.props.shops);
        return (
            <div>
            {/*<h3>Shops</h3>*/}
            <ListGroup>
                { shops.map((shop) => {
                    return <ShopsListItem {...shop} key={shop.id} onShopClick={this.props.onShopClick} />
                    })
                }
            </ListGroup>
            </div>
        )
    }

}