import axios from '@/utils/axios'

import { CnodeParams  } from '@/types'


export function fetchCnode(params:CnodeParams) {
  return axios({url:'/api/v1/topics', method:'get', params})
}
