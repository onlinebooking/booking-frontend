import React from 'react';
import { values } from 'lodash';
import { ListGroup, ListGroupItem, Thumbnail } from 'react-bootstrap';



export default class ShopDetail extends React.Component {

    
    render(){
        return (
        <div>
            <h2>Shop: {this.props.name}</h2>
            <p><b>Domain name:</b> {this.props.domain_name}</p>
            <h4>Servizi</h4>  
            <ListGroup>
                <ListGroupItem>One</ListGroupItem>
                <ListGroupItem>Two</ListGroupItem>
                <ListGroupItem>Three</ListGroupItem>
            </ListGroup>

        </div>
        )
    }


}