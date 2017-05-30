import React from 'react';
import {grey400} from 'material-ui/styles/colors';
import PageBase from 'components/PageBase';
import AddProductForm from 'components/AddProductForm';


import request from 'utils/request';
import { browserHistory } from 'react-router'

export default class AddProduct extends React.Component {


  handleSubmit = (values) => request('/Products', {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer ' + localStorage.getItem('token'),
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(values),
  })
    .then(    browserHistory.push('/product'));



  render() {
    const contentStyle = {margin: '0 16px'};
    return (


        <div style={{width: '100%', maxWidth: 700, margin: 'auto'}}>

          <div style={contentStyle}>
            <AddProductForm onSubmit={this.handleSubmit}/>
          </div>
        </div>
    );
  };
}

