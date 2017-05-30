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
import moment from 'moment';
import 'moment/src/locale/zh-cn';
moment.locale('zh-cn');



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

  componentWillMount () {
    fetch('/request/products?where=CategoryID='+localStorage.getItem('categoryID'),
      {  credentials: 'same-origin'
      })
      .then(res => res.json())
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
        <PageBase title="Products"
                  navigation="Application / Products">

          <div>
            <Link to="/addProduct">
              <FloatingActionButton style={styles.floatingActionButton} backgroundColor={pink500}>
                <ContentAdd />
              </FloatingActionButton>
            </Link>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHeaderColumn style={styles.columns.name}>产品名称</TableHeaderColumn>
                  <TableHeaderColumn style={styles.columns.contact}>价格</TableHeaderColumn>
                  <TableHeaderColumn style={styles.columns.area}>所属分类</TableHeaderColumn>
                  <TableHeaderColumn style={styles.columns.time}>评价</TableHeaderColumn>
                  <TableHeaderColumn style={styles.columns.status}>月销售</TableHeaderColumn>
                  <TableHeaderColumn style={styles.columns.edit}>操作</TableHeaderColumn>
                </TableRow>
              </TableHeader>
              <TableBody>
                {merchants.map(item =>
                  <TableRow key={item.ID}>
                    <TableRowColumn style={styles.columns.name}>{item.Translations[0].DisplayName}</TableRowColumn>
                    <TableRowColumn style={styles.columns.contact}>{item.Price}</TableRowColumn>
                    <TableRowColumn style={styles.columns.area}>{item.CategoryID}</TableRowColumn>
                    <TableRowColumn style={styles.columns.time}>{item.Thumb}</TableRowColumn>
                    <TableRowColumn style={styles.columns.status}>{item.MonthlySales}</TableRowColumn>
                    <TableRowColumn style={styles.columns.edit}>
                      <Link className="button" to="/order">
                        <FloatingActionButton zDepth={0}
                                              mini={true}
                                              backgroundColor={grey200}
                                              iconStyle={styles.editButton}>
                          <ContentCreate  />
                        </FloatingActionButton>
                      </Link>
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
