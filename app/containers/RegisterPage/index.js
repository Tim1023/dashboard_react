/*
 *
 * RegisterPage
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { makeSelectUsername, makeSelectPassword, makeRegisterError } from './selectors';

import { updateUsername, updatePassword } from './actions';

import { registerRequest } from '../App/actions';

import MinimalForm from '../../components/LoginForm/index';

export class RegisterPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
        <Helmet
          title="RegisterPage"
          meta={[
            { name: 'description', content: 'Description of RegisterPage' },
          ]}
        />
        <MinimalForm
          onChangeUsername={(event) => this.props.dispatch(updateUsername(event.target.value))}
          onChangePassword={(event) => this.props.dispatch(updatePassword(event.target.value))}
          onSubmit={(event) => {
            event.preventDefault();
            this.props.dispatch(registerRequest({ username: this.props.username, password: this.props.password }));
          }}
          username={this.props.username}
          password={this.props.password}
          error={this.props.registerError}
          title="Register"
        />
      </div>
    );
  }
}

RegisterPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  registerError: PropTypes.string.isRequired,
};

const mapStateToProps = createStructuredSelector({
  username: makeSelectUsername(),
  password: makeSelectPassword(),
  registerError: makeRegisterError(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterPage);
