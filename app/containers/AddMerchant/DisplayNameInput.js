/**
 * Created by zhaodeyang on 13/03/17.
 */
import React from 'react';

import { Field } from 'redux-form/immutable';
import {GridList, GridTile} from 'material-ui/GridList';
import {  TextField} from 'redux-form-material-ui'

const styles = {


  hide: {
    display: 'none'
  }
};
const renderTextField = ({ input, label,meta: { touched, error }, ...custom }) => (
  <TextField hintText={label}
             floatingLabelText={label}
             errorText={touched && error}
             {...input}
             {...custom}
             multiLine={true}

  />

);
const renderHide = ({ input,value, label,meta: { touched, error }, ...custom }) => (
<TextField defaultValue= {value}
       {...input}

/>

);

const DisplayNameInput = () => (
  <div>
    <GridList  cols={2} cellHeight='auto'>
      <GridTile>
        <Field name="Translations[0].DisplayName" component={renderTextField} label="中文展示名" />
      </GridTile>
      <GridTile>
        <Field name="Translations[0].Description" component={renderTextField} label="中文简介"/>
      </GridTile>
    </GridList>
    <GridList  cols={2} cellHeight='auto'>

    <GridTile>
        <Field name="Translations[1].DisplayName" component={renderTextField} label="英文展示名"/>
      </GridTile>
      <GridTile>
        <Field name="Translations[1].Description" component={renderTextField} label="英文简介"/>

      </GridTile>
    </GridList>
    <GridList  cols={2} cellHeight='auto'>

    <GridTile>
        {/*<Field name="Translation[2].LanguageCode" value="kr" component={renderHide}  />*/}
        <Field name="Translations[2].DisplayName" component={renderTextField} label="韩文展示名"/>
      </GridTile>
      <GridTile>
        <Field name="Translations[2].Description" component={renderTextField} label="韩文简介"/>

      </GridTile>
    </GridList>
  </div>

);
export default DisplayNameInput;
