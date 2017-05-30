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
    <PageBase title="Add Category"
              navigation="Application / Add Category">
      <form onSubmit={handleSubmit}>

        <div>
          <Field name="Ordering" parse={parse} component={TextField} hintText="Ordering"
                 floatingLabelText="Ordering"/>
        </div>
        <div>
          <Field name="Translations[0].LanguageCode" component={TextField} hintText="Translations[0].LanguageCode"
                 floatingLabelText="Translations[0].LanguageCode"/>
        </div>
        <div>
          <Field name="Translations[0].DisplayName" component={TextField} hintText="Translations[0].DisplayName"
                 floatingLabelText="Translations[0].DisplayName"/>
        </div>
        <div>
          <Field name="Translations[0].ImageURL" component={TextField} hintText="Translations[0].ImageURL"
                 floatingLabelText="Translations[0].ImageURL"/>
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
  initialValues: { MerchantID: window.localStorage.getItem("merchantID"),OwnerType:'Merchant' }

})(ImmutableForm)
