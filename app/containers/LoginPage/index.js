import React, { PropTypes } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import Checkbox from 'material-ui/Checkbox';
import {grey500, white} from 'material-ui/styles/colors';
import PersonAdd from 'material-ui/svg-icons/social/person-add';
import Help from 'material-ui/svg-icons/action/help';
import TextField from 'material-ui/TextField';
import LoginForm from 'components/LoginForm'
import {Link} from 'react-router';
import ThemeDefault from '../../theme-default';
import { loginRequest, changeUsername, changePassword } from '../App/actions';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { makeSelectUsername, makeSelectPassword, makeLoginError } from './selectors';


  const styles = {
    loginContainer: {
      minWidth: 320,
      maxWidth: 400,
      height: 'auto',
      position: 'absolute',
      top: '20%',
      left: 0,
      right: 0,
      margin: 'auto'
    },
    paper: {
      padding: 20,
      overflow: 'auto'
    },
    buttonsDiv: {
      textAlign: 'center',
      padding: 10
    },
    flatButton: {
      color: grey500
    },
    checkRemember: {
      style: {
        float: 'left',
        maxWidth: 180,
        paddingTop: 5
      },
      labelStyle: {
        color: grey500
      },
      iconStyle: {
        color: grey500,
        borderColor: grey500,
        fill: grey500
      }
    },
    loginBtn: {
      float: 'right'
    },
    btn: {
      background: '#4f81e9',
      color: white,
      padding: 7,
      borderRadius: 2,
      margin: 2,
      fontSize: 13
    },
    btnFacebook: {
      background: '#4f81e9'
    },
    btnGoogle: {
      background: '#e14441'
    },
    btnSpan: {
      marginLeft: 5
    },
  };
  export  class LoginPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

    // login = (values) => alert(`It's a map thanks to immutables with redux-form: ${values}`);

    render() {

      return (
        <MuiThemeProvider muiTheme={ThemeDefault}>
          <div>
            <div style={styles.loginContainer}>

              <Paper style={styles.paper}>

                <LoginForm  onChangeUsername={(event) => this.props.dispatch(changeUsername(event.target.value))}
                            onChangePassword={(event) => this.props.dispatch(changePassword(event.target.value))}
                            onSubmit={(event) => {
                              event.preventDefault();
                              this.props.dispatch(loginRequest({ username: this.props.username, password: this.props.password }));
                            }}
                            username={this.props.username}
                            password={this.props.password}
                            title="Login"
                            error={this.props.loginError}/>

              </Paper>

              <div style={styles.buttonsDiv}>
                <FlatButton
                  label="Register"
                  href="/Register"
                  style={styles.flatButton}
                  icon={<PersonAdd />}
                />

                <FlatButton
                  label="Forgot Password?"
                  href="/"
                  style={styles.flatButton}
                  icon={<Help />}
                />
              </div>

              <div style={styles.buttonsDiv}>
                <Link to="/" style={{...styles.btn, ...styles.btnFacebook}}>
                  <i className="fa fa-facebook fa-lg"/>
                  <span style={styles.btnSpan}>Log in with Facebook</span>
                </Link>
                <Link to="/" style={{...styles.btn, ...styles.btnGoogle}}>
                  <i className="fa fa-google-plus fa-lg"/>
                  <span style={styles.btnSpan}>Log in with Google</span>
                </Link>
              </div>
            </div>
          </div>
        </MuiThemeProvider>
      );
    }

};

LoginPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  loginError: PropTypes.string.isRequired,
};

const mapStateToProps = createStructuredSelector({
  username: makeSelectUsername(),
  password: makeSelectPassword(),
  loginError: makeLoginError(),
});


function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
