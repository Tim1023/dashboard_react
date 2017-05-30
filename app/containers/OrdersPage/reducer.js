/**
 * Created by zhaodeyang on 6/04/17.
 */
import { fromJS } from 'immutable';
const initialState = fromJS({
  message:{},
});

function messageList(state = initialState, action) {
  if(action.message) {
    if (state.get('message').size ==0) {

      return state
        .set('message', [action.message])
    }
    else {
      var addData = state.get('message')


      addData = [...addData,action.message]
      console.log( addData)
      var lookupObject = {};
      var newArray = [];

      addData.map(function (order) {
        lookupObject[order['ID']] =order;
      })
      console.log(lookupObject)
      for (let i in lookupObject) {
        newArray.push(lookupObject[i]);
      }
      console.log(newArray)
      return state.set('message', newArray)
    }
  }
  else {
    return state
  }
}


export default messageList;
