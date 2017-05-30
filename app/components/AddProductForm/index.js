/**
 * Created by zhaodeyang on 11/04/17.
 */
import React from 'react'
import {Field, reduxForm} from 'redux-form/immutable' // <--- immutable import
import RaisedButton from 'material-ui/RaisedButton';
import PageBase from 'components/PageBase';

import {
  Checkbox,
  RadioButtonGroup,
  SelectField,
  TextField,
  Toggle,
  DatePicker
} from 'redux-form-material-ui'


const ImmutableForm = (props) => {
  const {handleSubmit, submitting} = props
  const parse = value => value === undefined ? undefined : parseInt(value)

  return (
    <PageBase title="Add Product"
              navigation="Application / Add Product">
      <form onSubmit={handleSubmit}>


        <div>
          <Field name="Translations[0].DisplayName" component={TextField} hintText="Translations[0].DisplayName"
                 floatingLabelText="Translations[0].DisplayName"/>
        </div>
        <div>
          <Field name="Translations[0].Description" component={TextField} hintText="Translations[0].Description"
                 floatingLabelText="Translations[0].Description"/>
        </div>
        <div>
          <Field name="Translations[0].LanguageCode" component={TextField} hintText="Translations[0].LanguageCode"
                 floatingLabelText="Translations[0].LanguageCode"/>
        </div>
        <div>
          <Field name="Price" parse={parse} type="number" component={TextField} hintText="Price"
                 floatingLabelText="Price"/>
        </div>
        <div>
          <Field name="AverageCookTime" parse={parse} type="number" component={TextField} hintText="AverageCookTime"
                 floatingLabelText="AverageCookTime"/>
        </div>
        <div>
          <Field name="Ordering" parse={parse} type="number"  component={TextField} hintText="Ordering"
                 floatingLabelText="Ordering"/>
        </div>
        <div>
          <Field name="Feature" component={Checkbox} label="Feature"labelPosition="right" />
        </div>
        <div>
          <Field name="AttributeGroups[0].Multiple" component={Checkbox} label="AttributeGroups[0].Multiple" labelPosition="right"/>
        </div>
        <div>
          <Field name="AttributeGroups[0].Ordering" parse={parse} type="number"  component={TextField} hintText="AttributeGroups[0].Ordering"
                 floatingLabelText="AttributeGroups[0].Ordering"/>
        </div>
        <div>
          <Field name="AttributeGroups[0].Translations[0].DisplayName" component={TextField} hintText="AttributeGroups[0].Translations[0].DisplayName"
                 floatingLabelText="AttributeGroups[0].Translations[0].DisplayName"/>
        </div>
        <div>
          <Field name="AttributeGroups[0].Translations[0].LanguageCode" component={TextField} hintText="AttributeGroups[0].Translations[0].LanguageCode"
                 floatingLabelText="AttributeGroups[0].Translations[0].LanguageCode"/>
        </div>
        <div>
          <Field name="AttributeGroups[0].Attributes[0].Price" parse={parse} type="number"  component={TextField} hintText="AttributeGroups[0].Attributes[0].Price"
                 floatingLabelText="AttributeGroups[0].Attributes[0].Price"/>
        </div>
        <div>
          <Field name="AttributeGroups[0].Attributes[0].Translations[0].DisplayName" component={TextField} hintText="AttributeGroups[0].Attributes[0].Translations[0].DisplayName"
                 floatingLabelText="AttributeGroups[0].Attributes[0].Translations[0].DisplayName"/>
        </div>
        <div>
          <Field name="AttributeGroups[0].Attributes[0].Translations[0].DisplayName" component={TextField} hintText="AttributeGroups[0].Attributes[0].Translations[0].DisplayName"
                 floatingLabelText="AttributeGroups[0].Attributes[0].Translations[0].DisplayName"/>
        </div>
        <div>


          <RaisedButton
            label={'Submit'}
            disabled={submitting}
            primary={true}
            type="submit"
          />
        </div>
      </form>
    </PageBase>
  )
}
export default reduxForm({
  form: 'addCategory',
  initialValues: { MerchantID: window.localStorage.getItem("merchantID"),CategoryID:window.localStorage.getItem("categoryID") }

})(ImmutableForm)
