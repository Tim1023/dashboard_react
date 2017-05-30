import React from 'react'
import { Field, reduxForm } from 'redux-form/immutable' // <--- immutable import
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import WorkingHourInput from './WorkingHourInput';

const ImmutableForm = (props) => {
  const { handleSubmit,previousPage, submitting } = props
  return (
    <form onSubmit={handleSubmit}>

<WorkingHourInput/>
      <FlatButton
        label="Back"
        disabled={false}
        onTouchTap={previousPage}
        style={{marginRight: 12}}
      />
      <RaisedButton
        label='Next'
        disabled={submitting}
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
