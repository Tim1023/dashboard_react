import React from 'react'
import { Field, reduxForm } from 'redux-form/immutable' // <--- immutable import
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import TranslateInput from './TranslateInput';
import {
  Checkbox,
  RadioButtonGroup,
  SelectField,
  TextField,
  Toggle,
  DatePicker
} from 'redux-form-material-ui'


const ImmutableForm = (props) => {
  const { handleSubmit, pristine, reset, submitting } = props
  const parse = value => value === undefined ? undefined : parseInt(value)
  return (
    <form onSubmit={handleSubmit}>
      <Field name="CompanyName" component={TextField} hintText="CompanyName" floatingLabelText="CompanyName"/>
      <TranslateInput/>
      <Field name="GSTNumber" component={TextField} type="number" hintText="GSTNumber" floatingLabelText="GSTNumber"/>
      <Field name="MinimumOrder" component={TextField} parse={parse} type="number" hintText="MinimumOrder" floatingLabelText="MinimumOrder"/>
      <Field name="ShippingFee" component={TextField} parse={parse} type="number" hintText="ShippingFee" floatingLabelText="ShippingFee"/>
      <Field name="AverageDeliveryTime" component={TextField} parse={parse} type="number" hintText="AverageDeliveryTime" floatingLabelText="AverageDeliveryTime"/>
      <Field name="LogoURL" component={TextField} hintText="LogoURL" floatingLabelText="LogoURL"/>
      <Field name="FoodGradeImgURL" component={TextField} hintText="FoodGradeImgURL" floatingLabelText="FoodGradeImgURL"/>
      <Field name="IncorporationImgURL" component={TextField} hintText="IncorporationImgURL" floatingLabelText="IncorporationImgURL"/>
      <Field name="Categories[0].ID" component={TextField} hintText="Categories[0].ID" floatingLabelText="Categories[0].ID"/>

      <div>
        <FlatButton
          label="Back"
          disabled={true}
          onTouchTap={this.handlePrev}
          style={{marginRight: 12}}
        />
        <RaisedButton
          label={'Next'}
          primary={true}
          type="submit"
        />
      </div>
    </form>
  )
}

export default reduxForm({
  form: 'wizard',                 // <------ same form name
  destroyOnUnmount: false,        // <------ preserve form data
  forceUnregisterOnUnmount: true,  // <------ unregister fields on unmount
})(ImmutableForm)
