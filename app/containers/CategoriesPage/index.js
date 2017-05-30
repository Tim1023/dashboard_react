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
    width80: {
      width: '80%'
    },
    width20: {
      width: '20%'
    },

  }
};
class Categories extends React.Component {

  constructor (props) {
    super(props);
    this.state = {
      userList: []
    };
  }
  handleEdit (item) {
    localStorage.categoryID = item.ID;
    browserHistory.push('/innerProduct');
  }

  componentWillMount () {
    fetch('/request/categories?where=MerchantID='+localStorage.getItem('merchantID'),
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
        <PageBase title="分类"
                  navigation="Application / Category">

          <div>
            <Link to="/addCategory">
              <FloatingActionButton style={styles.floatingActionButton} backgroundColor={pink500}>
                <ContentAdd />
              </FloatingActionButton>
            </Link>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHeaderColumn style={styles.columns.width80}>分类名称</TableHeaderColumn>

                  <TableHeaderColumn style={styles.columns.width20}>操作</TableHeaderColumn>
                </TableRow>
              </TableHeader>
              <TableBody>
                {merchants.map(item =>
                  <TableRow key={item.ID}>
                    <TableRowColumn style={styles.columns.width80}>{item.Translations[0].DisplayName}</TableRowColumn>

                    <TableRowColumn style={styles.columns.width20}>
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

export default Categories;
