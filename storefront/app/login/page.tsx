import Container from "../Container";

const page = () => {
  return (
    <div className="flex h-screen items-center justify-center bg-gradient-to-tr from-gray-900 to-gray-600">
      <div className="login-box">
        <form>
          <div className="user-box">
            <input type="text" name="" required={true} />
            <label>Username</label>
          </div>
          <div className="user-box">
            <input type="password" name="" required={true} />
            <label>Password</label>
          </div>
          <center>
            <a className="login-button">
              Login
            </a>
          </center>
        </form>
      </div>
    </div>
  );
};

export default page;
