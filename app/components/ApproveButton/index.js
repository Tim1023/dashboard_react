import React, {PropTypes, Component} from 'react';
import {connect} from 'react-redux';
import FlatButton from 'material-ui/FlatButton';
import {push as pushAction} from 'react-router-redux';
const styles = {
  hide: {
    display: 'none'

  }
};
class ApproveButton extends Component {
  handleClick = () => {

    const {push, record} = this.props;

    const updatedRecord = {...record, SubOrderStatus: 'AcceptedOrder'};
    fetch('/request/subOrders/' + record.ID, {
      method: 'PUT', body: JSON.stringify(updatedRecord), headers: {
        'Content-Type': 'application/json'
      },credentials: 'same-origin'
    })
      .then(res => res.json())
      .then(res => {console.log(res)})
      .catch((e) => {
        console.error(e);
        // showNotification('Error: SubOrder not approved', 'warning')
      });
  }

  render() {
    return <FlatButton style={this.props.record.SubOrderStatus == "InitialOrder" ? {padding: 0} : styles.hide}
                       onClick={this.handleClick}> approve</FlatButton>;
  }
}

ApproveButton.propTypes = {
  push: PropTypes.func,
  record: PropTypes.object,
  showNotification: PropTypes.func,
};

export default connect(null, {
  // showNotification: showNotificationAction,
  push: pushAction,
})(ApproveButton);
