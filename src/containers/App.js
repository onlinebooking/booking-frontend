import React from 'react'
import { connect } from 'react-redux';
import NavBar from './NavBar';
import ErrorPage from '../components/ErrorPage';

class App extends React.Component {

  render() {
    return (
      <div>
        <NavBar showAuthNav={this.props.showAuthNav} />
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
  // Hide the AuthNav when page errors occurs
  const showAuthNav = !error;

  return {
    error,
    showAuthNav,
  };
}

export default connect(mapStateToProps)(App);
