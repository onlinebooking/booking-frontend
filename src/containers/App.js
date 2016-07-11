import React from 'react'
import classNames from 'classnames';
import { connect } from 'react-redux';
import NavBar from './NavBar';
import ErrorPage from '../components/ErrorPage';
import ModalLogin from './ModalLogin';

class App extends React.Component {

  render() {
    const { options } = this.props;

    // Remove top padding when iframe mode is enabled...
    const appClass = classNames({
      'with-navbar': !options.iframe
    });

    return (
      <div className={appClass}>
        {!options.iframe && <NavBar />}
        {this.renderPageContent()}
        <ModalLogin />
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
  const options = state.options;

  return {
    error,
    options,
  };
}

export default connect(mapStateToProps)(App);
