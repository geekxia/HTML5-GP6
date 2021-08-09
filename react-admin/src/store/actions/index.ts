import {
  GET_USER_INFO,
  LOGIN_SUCCESS
} from '../types'

type Action = {
  type: string,
  payload?: any
}

// 用于获取用户信息
export function getUserInfo(token) {
  return dispatch => {
    setTimeout(()=>{
      const user = {
        roleName: 'editor',
        nickName: '打工人'
      }
      dispatch({type: GET_USER_INFO, payload: user})
    }, 1000)
  }
}

// 用户登录
export function login(params) {
  return dispatch=>{
    // axios login
    setTimeout(() => {
      const token = 'from api token'
      // 拿到了token
      // 用token当作入参，再调接口获取用户信息
      dispatch({type: LOGIN_SUCCESS, payload: token })
      localStorage.setItem('token', token)
      dispatch(getUserInfo(token))
    }, 1000)
  }
}
