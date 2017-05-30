/**
 * Created by zhaodeyang on 12/04/17.
 */
/**
 * Created by zhaodeyang on 6/04/17.
 */
import { fromJS } from 'immutable';
const initialState = fromJS({
  message:{},
});

function messageList(state = initialState, action) {
  if(action.message) {
console.log("!!!!!!!!!!")
    return state
      .set('message', [action.message])
  }
  else {
    return state
  }
}


export default messageList;
