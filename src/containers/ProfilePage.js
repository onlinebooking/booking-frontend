import React, { Component } from 'react';
import UpdateUserDataForm from './UpdateUserDataForm';
import UpdateUserPasswordForm from './UpdateUserPasswordForm';
import {
  Tabs,
  Tab
} from 'react-bootstrap';

export default class ProfilePage extends Component {
  render() {
    return (
      <div className="container-fluid padding-top-20">
        <Tabs defaultActiveKey={1} animation={false} id="profile-tabs">
          <Tab eventKey={1} title="Dati Profilo">
            <div className="container-fluid padding-top-20">
              <UpdateUserDataForm />
            </div>
          </Tab>
          <Tab eventKey={2} title="Cambia Password">
            <div className="container-fluid padding-top-20">
              <UpdateUserPasswordForm />
            </div>
          </Tab>
        </Tabs>
      </div>
    );
  }
}
