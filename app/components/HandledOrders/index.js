/**
 * Created by zhaodeyang on 6/04/17.
 */
import React from 'react';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
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
    width15: {
      width: '15%'
    },
    width10: {
      width: '10%'
    },
    width20: {
      width: '20%'
    },
    width5: {
      width: '5%'
    },
  }
};
class HandledOrders extends React.Component {

  constructor (props) {
    super(props);
    this.state = {
      userList: []
    };
  }

  componentWillMount () {
    fetch('/request/SubOrders?where=merchantID='+localStorage.getItem('merchantID'),
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
          subOrders: res
        });
      });
  }
  render() {
    const {subOrders} = this.state;
    if (subOrders) {
      console.log(subOrders)
      return (
        <PageBase title="已处理订单">
          <div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHeaderColumn style={styles.columns.width15}>时间</TableHeaderColumn>
                  <TableHeaderColumn style={styles.columns.width10}>状态</TableHeaderColumn>
                  <TableHeaderColumn style={styles.columns.width5}>价格</TableHeaderColumn>
                  <TableHeaderColumn style={styles.columns.width10}>外卖</TableHeaderColumn>
                  <TableHeaderColumn style={styles.columns.width20}>菜品</TableHeaderColumn>
                  <TableHeaderColumn style={styles.columns.width20}>留言</TableHeaderColumn>
                </TableRow>
              </TableHeader>
              <TableBody>
                {subOrders.map(data =>
                  <TableRow key={data.ID}>
                    <TableRowColumn style={styles.columns.width15}>{moment(data.CreatedAt).format('lll')}</TableRowColumn>
                    <TableRowColumn style={styles.columns.width10}>{data.SubOrderStatus}</TableRowColumn>
                    <TableRowColumn style={styles.columns.width5}>${data.SubtotalAmount / 100}</TableRowColumn>
                    <TableRowColumn style={styles.columns.width10}>{data.ShippingType}</TableRowColumn>
                    <TableRowColumn style={styles.columns.width20}> {data.Snapshot.Products.map(item=>item.Translations[0].DisplayName)}</TableRowColumn>
                    <TableRowColumn style={styles.columns.width20}>{data.MessageToMerchant ? data.MessageToMerchant : '无'}</TableRowColumn>


                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </PageBase>
      );
    }
    else
      return null
  }
};

export default HandledOrders;
