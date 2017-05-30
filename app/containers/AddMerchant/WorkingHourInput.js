/**
 * Created by zhaodeyang on 10/03/17.
 */
import { Field, FieldArray } from 'redux-form/immutable'
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import ContentDeleteSweep from 'material-ui/svg-icons/content/delete-sweep';

import React from 'react';
import MenuItem from 'material-ui/MenuItem'
import { SelectField }from 'redux-form-material-ui'
import TextField from 'material-ui/TextField';

import {GridList, GridTile} from 'material-ui/GridList';
import RaisedButton from 'material-ui/RaisedButton';


const styles = {

  add: {
    width:'100%'

  }
};

const required = value => value == null ? 'Required' : undefined

const renderField = ({ name,input, label,type, meta: { touched, error }, ...custom  }) => (
  <div>
    <div>
      {label} at
      <TextField type={type}
                 errorText={touched && error}
                 {...input}
                 {...custom}
      />
      {touched && error && <span>{error}</span>}
    </div>


  </div>
);


const renderMembers = ({ fields, meta: { touched, error } }) => (
  <div>
    <span>
      <RaisedButton style={styles.add} secondary={true} fullWidth={true} onClick={() => fields.push({})}>
              <ContentAdd />
      </RaisedButton>
      {touched && error && <span>{error}</span>}
    </span>
  <GridList cellHeight={240}       cols={3}>



    {fields.map((member, index) =>


      <GridTile key={index}>


        <Field name={`${member}.Day`} component={SelectField} hintText="Day">
          <MenuItem  value={1} primaryText="Monday"/>
          <MenuItem value={2} primaryText="Tuesday"/>
          <MenuItem value={3} primaryText="Wednesday"/>
          <MenuItem value={4} primaryText="Thursday"/>
          <MenuItem value={5} primaryText="Friday"/>
          <MenuItem value={6} primaryText="Saturday"/>
          <MenuItem value={0} primaryText="Sunday"/>
        </Field>
        <Field
          name={`${member}.OpenAt`}
          type="time"
          component={renderField}
          label="Start"/>
        <Field
          name={`${member}.CloseAt`}
          type="time"
          component={renderField}
          label="End"/>
        <FloatingActionButton  mini={true} onClick={function(){
          fields.remove(index);
          index -= 1;
        }}>
          <ContentDeleteSweep />
          </FloatingActionButton>
      </GridTile>

    )}


  </GridList>

  </div>
);


const WorkingHourInput = () => (
  <div>

      <FieldArray name="OpeningHours" component={renderMembers}/>

    </div>
);
export default WorkingHourInput;
