import React from 'react'
import { NavBar } from '../components/NavBar';

export class App extends React.Component {

  render() {

    return (
      <div>
          <NavBar></NavBar>
          <div className="container-fluid">
            {this.props.children}
          </div>
      </div>
    );
  }
}
