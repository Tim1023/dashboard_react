/**
 * Created by zhaodeyang on 11/04/17.
 */
import React, {PropTypes} from 'react';
import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import globalStyles from '../../styles';

const LanguageContainer = (props) => {


  return (
    <div>


        <Divider/>
        {props.children}

        <div style={globalStyles.clear}/>

    </div>
  );
};



export default LanguageContainer;
