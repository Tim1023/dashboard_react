import React from 'react';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {green100, green500, green700} from 'material-ui/styles/colors';
import MyButton from 'components/MyButton'

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: green500,
    primary2Color: green700,
    primary3Color: green100,
  },
}, {
  avatar: {
    borderColor: null,
  },
});

export default class Test extends React.Component {
    render(){
    return (    
     <MuiThemeProvider muiTheme={muiTheme}>
        <MyButton />
  </MuiThemeProvider>
    );
    }
}