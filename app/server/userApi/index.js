import Api from '../api'

export const getUserList = (params) => Api.get('/getWorkerList',params)
