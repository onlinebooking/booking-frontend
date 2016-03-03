import React from 'react';
import { values } from 'lodash';
import { ListGroup, ListGroupItem, Thumbnail } from 'react-bootstrap';
import { Link } from 'react-router';


export default class ShopDetail extends React.Component {

    
    render(){
        return (
        <div>
            <h2>Shop: {this.props.shop.name}</h2>
            <p><b>Domain name:</b> {this.props.shop.domain_name}</p>
            <h4>Servizi</h4>
            <ListGroup>
                { this.props.services.map(service => {
                    return <ListGroupItem key={service.id}>
                        <Link to={`/shops/${this.props.shop.id}/booking/${service.id}`}>
                            {service.name}
                        </Link>
                        </ListGroupItem>
                    })
                }
            </ListGroup>
        </div>
        )
    }


}