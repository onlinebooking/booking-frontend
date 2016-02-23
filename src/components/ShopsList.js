import React from 'react';
import { values } from 'lodash';


class ShopsListItem extends React.Component {

    render(){
        return <li onClick={() => { this.props.onShopClick() }}>{this.props.name}</li>
    }

}


export default class ShopsList extends React.Component {

    render(){
        const shops = values(this.props.shops);
        console.log("s", shops)
        return <ul>
        { shops.map((shop) => {
            return <ShopsListItem {...shop} key={shop.id} onShopClick={this.props.onShopClick} />
            })
        }
        </ul>
    }


}