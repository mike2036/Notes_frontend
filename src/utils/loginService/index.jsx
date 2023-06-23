import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/login'

// 登录用的是post方法，登录服务返回data数据体
const login = async (credentials) => {
  const res = await axios.post(baseUrl, credentials)// credential就是body
  return res.data
}

export default login