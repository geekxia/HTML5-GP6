import produce from 'immer'
// immutable 也可以实现“不可变对象”

import {
  LOGIN_SUCCESS,
  GET_USER_INFO
} from '../types'

const initState = {
  token: localStorage.getItem('token'),
  user: {}
}

export default function (state=initState, {type, payload}) {
  return produce(state, (newState)=>{
    switch (type) {
      case LOGIN_SUCCESS:
        newState.token = payload
        break
      case GET_USER_INFO:
        newState.user = payload
        break
      default:
        // 初始化
        newState = state
    }
    return newState
  })
}
