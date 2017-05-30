/**
 * Created by zhaodeyang on 6/04/17.
 */
import React from 'react';
import { Field, reduxForm } from 'redux-form/immutable' // <--- immutable import
import {pink500, grey200, grey500} from 'material-ui/styles/colors';
import PageBase from 'components/PageBase';
import { fromJS } from 'immutable';
import {Tabs, Tab} from 'material-ui/Tabs';
import {
  Checkbox,
  RadioButtonGroup,
  SelectField,
  TextField,
  Toggle,
  DatePicker
} from 'redux-form-material-ui'
import { connect } from 'react-redux';




class TranslateInput extends React.Component {

  constructor (props) {
    super(props);
    this.state = {
      userList: []
    };
  }

  componentWillMount () {
    fetch('/Lang')
      .then(res => res.json())
      .then(res => {
        this.setState({
          languages: res
        });
      });

  }

  render() {
    const {languages} = this.state;
    // console.log(languages)
    var children = React.Children.map(
      this.props.children,
      function(child) {
        // console.log(child)
        return <div>{child}</div>;
      }
    );
    if(languages) {
      const languageTabs  = []
      languages.map(function (item,index) {
        languageTabs.push(
          <Tab label={item.Name} key={item.ID}>
            <div>
            <Field name={`Translations[${index}].DisplayName`} component={TextField} hintText={`Translations[${index}].DisplayName`}
                   floatingLabelText={`Translations[${index}].DisplayName`}/>
              </div>
            <div>
            <Field name={`Translations[${index}].Description`} component={TextField} hintText={`Translations[${index}].Description`}
                   floatingLabelText={`Translations[${index}].Description`}/>
              </div>

            {children}

          </Tab>
        )
      })

      var languageCodes = []
      languages.map(function (item,index) {
        var key =`Translations[${index}].LanguageCode`
        var obj = {
          [key]:item.Code
        }
        languageCodes.push(obj)
      })
      languageCodes= languageCodes.reduce(function(result, item) {
        var key = Object.keys(item)[0];
        result[key] = item[key];
        return result;
      }, {});

      return (
          <div>
            <Tabs>
              {languageTabs}
              </Tabs>
          </div>
      );
    }
    else
      return null
  }
};

export default connect(
  (state) => ({
    initialValues: fromJS(state.getIn(['message[0]', 'data'])),   // { name: 'foo', description: 'bar', active: true }
  }))(reduxForm({
  form: 'wizard',                 // <------ same form name
  destroyOnUnmount: false,        // <------ preserve form data
  forceUnregisterOnUnmount: true,  // <------ unregister fields on unmount
})(TranslateInput));

