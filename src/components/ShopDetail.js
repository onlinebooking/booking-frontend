import React from 'react';
import { values } from 'lodash';




export default class ShopDetail extends React.Component {

    
    render(){
        return (
        <div>
            <h3>Shop: {this.props.name}</h3>
            <p><b>Domain name:</b> {this.props.domain_name}</p>
        </div>
        )
    }


}