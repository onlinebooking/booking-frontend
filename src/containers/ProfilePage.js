import React from 'react';
import { connect } from 'react-redux';

class ProfilePage extends React.Component {

  render() {
    const { user } = this.props;

    if (! user) {
      return <div>No user, sorry</div>;
    }

    return (
      <div>
        My email is <b>{user.email}</b> and this is my profile! Cool...
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.auth.user,
  };
}

export default connect(mapStateToProps)(ProfilePage);
