/**
 * Created by zhaodeyang on 6/04/17.
 */
/**
 * Created by zhaodeyang on 6/04/17.
 */
import React from 'react';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import {pink500, grey200, grey500} from 'material-ui/styles/colors';
import PageBase from 'components/PageBase';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { makeSelectMessage } from './selectors';
import {GridList as MuiGridList, GridTile} from 'material-ui/GridList';
import moment from 'moment';
import 'moment/src/locale/zh-cn';
import ApproveButton from 'components/ApproveButton';
import RejectedButton from 'components/RejectedButton';
import HandledOrders from 'components/HandledOrders'
moment.locale('zh-cn');

const styles = {
  root: {
    margin: '-2px',
  },
  gridList: {
    width: '100%',
    margin: 0,
  },
  gridTile: {
    height: '100%',
    width: '100%',
    background: 'yellow'
  },
};

export class OrdersPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function


  render() {
    return (
      <PageBase title="全部订单"
                navigation="Application / Orders">

        <div>
          <PageBase title="未处理订单">
          <MuiGridList cellHeight={280} cols={4} style={styles.gridList}>
            {this.props.message.map((data,index) => (
              <GridTile
                key={index}
                title={moment(data.CreatedAt).fromNow()}
              >
                <div style={styles.gridTile}>
                  <MuiGridList cols={6} cellHeight='auto'>
                    <GridTile cols={2}>
                      <div>
                        时间:
                      </div>
                    </GridTile>
                    <GridTile cols={4}>
                      <div>
                        {moment(data.CreatedAt).format('llll')}
                      </div>
                    </GridTile>
                    <GridTile cols={2}>
                      <div>
                        状态：
                      </div>
                    </GridTile>
                    <GridTile cols={4}>
                      <div>
                        {data.SubOrderStatus}
                      </div>
                    </GridTile>
                    <GridTile cols={2}>
                      <div>
                        价格：
                      </div>
                    </GridTile>
                    <GridTile cols={4}>
                      <div>
                        ${data.SubtotalAmount / 100}
                      </div>
                    </GridTile>

                    <GridTile cols={2}>
                      <div>
                        外卖：
                      </div>
                    </GridTile>
                    <GridTile cols={4}>
                      <div>
                        {data.ShippingType}
                      </div>
                    </GridTile>
                    <GridTile cols={2}>
                      <div>
                        菜品：
                      </div>
                    </GridTile>
                    <GridTile cols={4}>
                      <div>
                        {data.Snapshot.Products.map(item=>item.Translations[0].DisplayName)}
                      </div>
                    </GridTile>
                    <GridTile cols={2}>
                      <div>
                        留言：
                      </div>
                    </GridTile>
                    <GridTile cols={4}>
                      <div>
                        {data.MessageToMerchant ? data.MessageToMerchant : '无'}
                      </div>
                    </GridTile>
                    <GridTile cols={3}>
                      <ApproveButton record={data}/>
                    </GridTile>
                    <GridTile cols={3}>
                      <RejectedButton  record={data}/>
                    </GridTile>
                  </MuiGridList>
                </div>
              </GridTile>
            ))}
          </MuiGridList>
    </PageBase>
        </div>
        <div>

         <HandledOrders/>
        </div>
      </PageBase>
    );
  };
}
const mapStateToProps = createStructuredSelector({
  message: makeSelectMessage(),
});

export default connect(mapStateToProps)(OrdersPage);
