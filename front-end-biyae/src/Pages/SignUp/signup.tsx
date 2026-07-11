function Signup() {
  // process the data here

  // validate data on server side.
  // ensuring everything is filled out. (nothing is empty)
  // ensure that passwords match. (this is the last time we have the password as regular text.)
  // once that's validated, everything can pretty much... be sent over, no?

  // from the form, when the enter flag is hit
  // we send it to main.py.
  // receive response: success or fail.
  // if success, redirect to login.
  // if not, give error message?
  // what should the error message be on the website? I wonder.

  return (
    <>
      <div>hello! you have reached the signup page.</div>

      <form>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email"
          />
        </div>

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
          <label htmlFor="givenname">Given Name</label>
          <input
            type="text"
            id="givenname"
            name="givenname"
            placeholder="Enter your Given Name"
          />
        </div>

        <div>
          <label htmlFor="surname">Surname</label>
          <input
            type="text"
            id="surname"
            name="surname"
            placeholder="Enter your surname"
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
        <div>
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            placeholder="Confirm your password"
          />
        </div>

        <button type="submit">Sign Up</button>
      </form>
    </>
  );
}

export default Signup;
