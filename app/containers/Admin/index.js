import React, { PropTypes } from 'react';
import Header from 'components/Header';
import LeftDrawer from 'components/LeftDrawer';
import withWidth, {LARGE, SMALL} from 'material-ui/utils/withWidth';
import request from 'utils/request';
import Data from '../../data'
let localStorage;

// If we're testing, use a local storage polyfill
if (global.process && proFcess.env.NODE_ENV === 'test') {
  localStorage = require('localStorage');
} else {
  // If not, use the browser one
  localStorage = global.window.localStorage;
}



class App extends React.Component {


  componentWillMount () {
    fetch('/request/users',
      {  credentials: 'same-origin'
      })
      .then(function (res) {
        if(res.status == 401){
          window.location.assign('request/login');
        }
        else {
          return res.json()
        }

      })
      .then(res => {
        this.setState({
          user: res
        });
      });
  }
  constructor(props) {
    super(props);
    this.state = {
      navDrawerOpen: false,
      user:{DisplayName:'',Avartar:''}
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.width !== nextProps.width) {
      this.setState({navDrawerOpen: nextProps.width === LARGE});
    }
  }

  handleChangeRequestNavDrawer() {
    this.setState({
      navDrawerOpen: !this.state.navDrawerOpen
    });
  }

  render() {
    let { navDrawerOpen,user } = this.state;
    const paddingLeftDrawerOpen = 236;

    const styles = {
      header: {
        paddingLeft: navDrawerOpen ? paddingLeftDrawerOpen : 0
      },
      container: {
        margin: '80px 20px 20px 15px',
        paddingLeft: navDrawerOpen && this.props.width !== SMALL ? paddingLeftDrawerOpen : 0
      }
    };

    return (
        <div>
          <Header styles={styles.header}
                  handleChangeRequestNavDrawer={this.handleChangeRequestNavDrawer.bind(this)}/>

          <LeftDrawer navDrawerOpen={navDrawerOpen}
                      menus={Data.menus}
                      username={user.DisplayName}
                      avatar={user.Avatar == ""|| user.Avartar == undefined? "http://www.material-ui.com/images/uxceo-128.jpg":user.Avatar}
          />

          <div style={styles.container}>
            {this.props.children}
          </div>
        </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.element,
  width: PropTypes.number
};

export default withWidth()(App);
