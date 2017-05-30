/**
 * Created by zhaodeyang on 6/04/17.
 */
import React from 'react';
import {Link} from 'react-router';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentCreate from 'material-ui/svg-icons/content/create';
import ContentAdd from 'material-ui/svg-icons/content/add';
import {pink500, grey200, grey500} from 'material-ui/styles/colors';
import PageBase from 'components/PageBase';
import { browserHistory } from 'react-router'

import moment from 'moment';
import 'moment/src/locale/zh-cn';
moment.locale('zh-cn');
let localStorage;

// If we're testing, use a local storage polyfill
if (global.process && proFcess.env.NODE_ENV === 'test') {
  localStorage = require('localStorage');
} else {
  // If not, use the browser one
  localStorage = global.window.localStorage;
}



const styles = {
  floatingActionButton: {
    margin: 0,
    top: 'auto',
    right: 20,
    bottom: 20,
    left: 'auto',
    position: 'fixed',
  },
  editButton: {
    fill: grey500
  },
  columns: {
    name: {
      width: '20%'
    },
    contact: {
      width: '18%'
    },
    area: {
      width: '18%'
    },
    time: {
      width: '18%'
    },
    area: {
      width: '18%'
    },
    status: {
      width: '18%'
    },
    edit: {
      width: '10%'
    }
  }
};
class Merchants extends React.Component {

  constructor (props) {
    super(props);
    this.state = {
      userList: []
    };
  }

  handleEdit (item) {
    localStorage.merchantID = item.ID;
    browserHistory.push('/category');
  }

  componentWillMount () {
    fetch('/request/merchants',
      {  credentials: 'same-origin'
      })
      .then(function (res) {
        if(res.status == 401){
          window.location.assign('request/login');
        }
        else {
        return res.json()
        }

      })
      .then(res => {
        this.setState({
          merchants: res
        });
      });
  }

  render() {
    const {merchants} = this.state;
    if(merchants)
    return (
      <PageBase title="我的店铺      待完善      审核中      需修改      未通过"
                navigation="Application / Merchants">

        <div>
          <Link to="/addMerchant">
            <FloatingActionButton style={styles.floatingActionButton} backgroundColor={pink500}>
              <ContentAdd />
            </FloatingActionButton>
          </Link>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHeaderColumn style={styles.columns.name}>店铺名称</TableHeaderColumn>
                <TableHeaderColumn style={styles.columns.contact}>联系方式</TableHeaderColumn>
                <TableHeaderColumn style={styles.columns.area}>城市／地区</TableHeaderColumn>
                <TableHeaderColumn style={styles.columns.time}>申请时间</TableHeaderColumn>
                <TableHeaderColumn style={styles.columns.status}>状态</TableHeaderColumn>
                <TableHeaderColumn style={styles.columns.edit}>操作</TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody>
              {merchants.map(item =>
                <TableRow key={item.ID}>
                  <TableRowColumn style={styles.columns.name}>{item.Translations[0].DisplayName}</TableRowColumn>
                  <TableRowColumn style={styles.columns.contact}>{item.Addresses[0].Phone}</TableRowColumn>
                  <TableRowColumn style={styles.columns.area}>{item.Addresses[0].Location.TownCity}</TableRowColumn>
                  <TableRowColumn style={styles.columns.time}>                        {moment(item.CreatedAt).format('ll')}
                   </TableRowColumn>
                  <TableRowColumn style={styles.columns.status}>{item.Status}</TableRowColumn>
                  <TableRowColumn style={styles.columns.edit}>
                      <FloatingActionButton zDepth={0}
                                            onClick={() => this.handleEdit(item)}
                                            mini={true}
                                            backgroundColor={grey200}
                                            iconStyle={styles.editButton}>
                        <ContentCreate  />
                      </FloatingActionButton>
                    </TableRowColumn>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </PageBase>
    );
    else
      return null
  }
};

export default Merchants;
