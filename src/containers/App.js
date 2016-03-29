import React from 'react'
import { connect } from 'react-redux';
import { NavBar } from '../components/NavBar';
import ErrorPage from '../components/ErrorPage';

export default class App extends React.Component {

  render() {
    return (
      <div>
          <NavBar></NavBar>
          {this.renderPageContent()}
      </div>
    );
  }

  renderPageContent() {
    const { error } = this.props;

    if (error) {
      return <ErrorPage error={error} />;
    } else {
      return (
        <div className="container-fluid">
          {this.props.children}
        </div>
      );
    }
  }
}

function mapStateToProps(state) {
  const error = state.pageError.error;
  return { error };
}

export default connect(mapStateToProps)(App);
