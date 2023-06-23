import PropTypes from 'prop-types'

const LoginForm = ({
  handleSubmit,
  username,
  handleUsernameChange,
  password,
  handlePasswordChange,
}) => {

  LoginForm.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    username: PropTypes.string.isRequired,
    handleUsernameChange: PropTypes.func.isRequired,
    password: PropTypes.string.isRequired,
    handlePasswordChange: PropTypes.func.isRequired,
  }

  return (
    <div>
      <h2>Log in</h2>
      <form onSubmit={handleSubmit}>
        <div>username
          <input
            id='username'
            type="text"
            name="Username"
            placeholder='Enter your username here'
            value={username}
            onChange={handleUsernameChange}
          ></input>
        </div>
        <div>password
          <input
            id='password'
            type="password"
            name="Password"
            value={password}
            onChange={handlePasswordChange}
          ></input>
        </div>
        <button id="login-button" type="submit">login</button>
      </form>
    </div>
  )
}

export default LoginForm