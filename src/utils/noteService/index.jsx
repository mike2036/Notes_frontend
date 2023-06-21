import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/notes'

// 定义 setToken 方法
let token = null
const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

// 获取全部notes
const getAll = async () => {
  const res = await axios.get(baseUrl)
  return res.data
}

// 新增note
const create = async (newObject) => {
  const config = {
    headers: { Authorization: token }
  }
  const res = await axios.post(baseUrl, newObject, config)
  return res.data
}

// 更新note
const update = async (id, newObject) => { // 千万不要忘记给每个异步操作加 await
  const res = await axios.put(`${baseUrl}/${id}`, newObject)

  return res.data
}

const note = {
  getAll,
  create,
  update,
  setToken,
}

export default note

