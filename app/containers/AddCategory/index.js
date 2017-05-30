import React from 'react';
import {grey400} from 'material-ui/styles/colors';
import PageBase from 'components/PageBase';
import AddCategoryForm from 'components/AddCategoryForm';


import request from 'utils/request';
import { browserHistory } from 'react-router'

export default class AddCategory extends React.Component {


  handleSubmit = (values) => request('/Categories', {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer ' + localStorage.getItem('token'),
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(values),
  })
    .then(    browserHistory.push('/category'));



  render() {
    const contentStyle = {margin: '0 16px'};
    return (


        <div style={{width: '100%', maxWidth: 700, margin: 'auto'}}>

          <div style={contentStyle}>
            <AddCategoryForm onSubmit={this.handleSubmit}/>
          </div>
        </div>
    );
  };
}

