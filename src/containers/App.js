import React from 'react'
import classNames from 'classnames';
import { connect } from 'react-redux';
import NavBar from './NavBar';
import ErrorPage from '../components/ErrorPage';

class App extends React.Component {

  render() {
    const { options } = this.props;

    // Remove top padding when iframe mode is enabled...
    const appClass = classNames({
      'with-navbar': !options.iframe
    });

    return (
      <div className={appClass}>
        {!options.iframe && <NavBar showAuthNav={this.props.showAuthNav} />}
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
        <div>
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

  const options = state.options;

  return {
    error,
    options,
    showAuthNav,
  };
}

export default connect(mapStateToProps)(App);
