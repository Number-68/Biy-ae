function Login() {
  return (
    <>
      <div>hello, this is the login page.</div>
      <form>
        <div>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            placeholder="Enter your username"
          />
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Enter your password"
          />
        </div>

        <button type="submit">Enter</button>
      </form>
    </>
  );
}

export default Login;
