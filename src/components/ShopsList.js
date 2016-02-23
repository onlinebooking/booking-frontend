import React from 'react';
import { values } from 'lodash';
import { Link } from 'react-router'

class ShopsListItem extends React.Component {

    render(){
        return <li className="list-group-item"><Link to={`/shops/${this.props.id}`}>{this.props.name}</Link> </li>
    }
}


export default class ShopsList extends React.Component {

    render(){
        const shops = values(this.props.shops);
        return (
            <div>
            <h3>Choose a shop</h3>
            <ul className="list-group">
                { shops.map((shop) => {
                    return <ShopsListItem {...shop} key={shop.id} onShopClick={this.props.onShopClick} />
                    })
                }
            </ul>
            </div>
        )
    }

}