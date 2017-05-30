import React from 'react'
import { Field, reduxForm } from 'redux-form/immutable' // <--- immutable import
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import {
  Checkbox,
  RadioButtonGroup,
  SelectField,
  TextField,
  Toggle,
  DatePicker
} from 'redux-form-material-ui'


const ImmutableForm = (props) => {
  const { handleSubmit,previousPage, submitting } = props
  return (
    <form onSubmit={handleSubmit}>
      <Field name="Addresses[0].ContactPerson" component={TextField} hintText="Addresses[0].ContactPerson" floatingLabelText="Addresses[0].ContactPerson"/>
      <Field name="Addresses[0].Phone" component={TextField} hintText="Addresses[0].Phone" floatingLabelText="Addresses[0].Phone"/>
      <Field name="Addresses[0].LocationID" component={TextField} hintText="Addresses[0].LocationID" floatingLabelText="Addresses[0].LocationID"/>


      <FlatButton
        label="Back"
        disabled={false}
        onTouchTap={previousPage}
        style={{marginRight: 12}}
      />
      <RaisedButton
        label={'Next'}
        primary={true}
        type="submit"
      />
    </form>
  )
}
export default reduxForm({
  form: 'wizard',                 // <------ same form name
  destroyOnUnmount: false,        // <------ preserve form data
  forceUnregisterOnUnmount: true,  // <------ unregister fields on unmount
})(ImmutableForm)
