/**
 * Created by zhaodeyang on 6/04/17.
 */

import {
 RECEIVE
} from './constants';


export function receive(message) {
  return {
    type: 'RECEIVE',
    message,
  };
}
