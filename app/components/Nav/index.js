/**
 * Created by zhaodeyang on 5/04/17.
 */
import React from 'react';
import MenuItem from 'material-ui/MenuItem';
import { FormattedMessage } from 'react-intl';



class Nav extends React.Component { // eslint-disable-line react/prefer-stateless-function


  render() {
    return (
      <div>
        <MenuItem>Menu Item</MenuItem>
        <MenuItem>Menu Item 2</MenuItem>
      </div>
    );
  }
}

export default Nav;
