import React from 'react'
import { NavBar } from '../components/NavBar';

export class App extends React.Component {

  render() {

    return (
      <div>
          <NavBar></NavBar>  
          ahah 
          <div>
            {this.props.children}
          </div>
      </div>
    
    );
  }
}
