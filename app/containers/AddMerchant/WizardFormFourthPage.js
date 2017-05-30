import React from 'react'
import { Field, reduxForm } from 'redux-form/immutable' // <--- immutable import
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import TranslateInput from './TranslateInput'
import DisplaynameInput from './DisplayNameInput'

const ImmutableForm = (props) => {
  const { handleSubmit,previousPage, submitting } = props
  return (
    <form onSubmit={handleSubmit}>
<TranslateInput>

</TranslateInput>
      <FlatButton
        label="Back"
        disabled={false}
        onTouchTap={previousPage}
        style={{marginRight: 12}}
      />
      <RaisedButton
        label='Finish'
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
