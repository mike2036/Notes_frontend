import './App.css'
import { Note, Notification, Footer } from './components'
import { useState, useEffect } from 'react'
import { noteService, loginService } from './utils'

const App = () => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)


  // 获取所有笔记
  useEffect(() => {
    noteService
      .getAll()
      .then(initialNotes => {
        setNotes(initialNotes)
      })
  }, [])

  // 读取浏览器的localStorage，看是否有已保存的用户
  useEffect(() => {
    const loggedUserJson = window.localStorage.getItem('loggedNoteAppUser')
    if (loggedUserJson) {
      const user = JSON.parse(loggedUserJson)
      setUser(user)
      noteService.setToken(user.token)
    }
  }, [])

  // 新增一条笔记
  const addNote = async (e) => {
    e.preventDefault()
    // 将用户输入的内容存到一条新的笔记
    const noteObject = {
      content: newNote,
      date: new Date(),
      important: Math.random() < 0.5,
    }

    // 调接口将新笔记传给服务器
    const returnedNote = await noteService.create(noteObject)
    setNotes(notes.concat(returnedNote)) // concat方法创建一个新数组
    setNewNote('')
  }

  // 受控组件
  const handleNoteChange = (e) => {
    setNewNote(e.target.value)
  }

  // 是否显示全部，还是只显示important
  const notesToShow = showAll
    ? notes
    : notes.filter(note => note.important)

  // 定义important切换
  const toggleImportanceOf = async (id) => {
    const note = notes.find(n => n.id === id)

    const changedNote = { ...note, important: !note.important } // 展开运算符
    // 创建了一个新对象，并复制了note对象所有的属性。但是这种复制属于浅拷贝，意味着只拷
    // 贝了一层，新对象的值与旧对象的值相等。如果旧对象的值本身是对象，那么新对象中的复制
    // 值将引用旧对象中的相同对象

    // 在数据库中更改这条note

    console.log('importance changed, note.id:', note.id)
    try {
      const returnedNote = await noteService.update(id, changedNote)
      setNotes(notes.map(note => note.id !== id ? note : returnedNote))

    } catch (err) {
      setErrorMessage(`Note '${note.content}' was already deleted from server.`)
      setTimeout(() => { setErrorMessage(null) }, 5000)
      setNotes(notes.map(note => note.id !== id))
    }

  }

  // 处理登录
  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      // user保存的是res.data，是一个对象
      const user = await loginService({ username, password })
      console.log('user:', user)
      console.log('JSON user:', JSON.stringify(user))

      // 用localStorage接口存储数据到浏览器
      window.localStorage.setItem(
        'loggedNoteAppUser', JSON.stringify(user)
      )

      setUser(user) // user对象的结构为{name, token, username}
      setUsername('')
      setPassword('')
      noteService.setToken(user.token)
    } catch (exception) {
      setErrorMessage('invalid username or password, please try again.')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  // 登录表单
  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>username
        <input
          type="text"
          name="Username"
          placeholder='Enter your username here'
          value={username}
          onChange={({ target }) => setUsername(target.value)}
        ></input>
      </div>
      <div>password
        <input
          type="password"
          name="Password"
          value={password}
          onChange={({ target }) => {
            console.log(target.value)
            setPassword(target.value)
          }}
        ></input>
      </div>
      <button type="submit">login</button>
    </form>
  )

  // 新建笔记表单
  const newNoteForm = () => (
    //  添加新的笔记 
    < form onSubmit={addNote} >
      <input value={newNote} onChange={handleNoteChange} />
      <button type="submit">save</button>
    </form >
  )

  return (
    <div>
      <h1>Notes app</h1>
      <Notification message={errorMessage} />

      {/* 如果第一条语句为false，第二条语句根本就不会被执行 */}
      {user === null
        ? loginForm()
        : <div>
          <p>current user: {user.name}</p>
          {newNoteForm()}
        </div>
      }

      {/* 按钮，切换是否显示全部 */}
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all'}
        </button>
      </div>

      {/* 展示notes  */}
      <ul>
        {notesToShow.map(note =>
          <Note
            key={note.id}
            note={note}
            toggleImportance={() => {
              console.log('note.id:', note.id)
              toggleImportanceOf(note.id)
            }}
          />
        )}
      </ul>


      <Footer />
    </div>
  )
}

export default App
