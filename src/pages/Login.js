import { useRef, useState, useEffect, useContext } from "react";
import axios from "axios";
import GlobalContext from "./../context/GlobalContext";
const URL = "http://15.164.213.157/login.php";

function Login() {
  const { userKey, setUserKey, STORAGE_USER_CHECK } = useContext(GlobalContext);
  const idRef = useRef();
  const errRef = useRef();
  const [id, setId] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    idRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [id, pwd]);

  const onIdChange = (e) => setId(e.target.value);
  const onPasswdChange = (e) => setPwd(e.target.value);

  const serverRes = (res) => {
    switch (res) {
      case 400: {
        setErrMsg("Missing ID or Password");
        return;
      }
      case 401: {
        setErrMsg("Unauthorized");
        return;
      }
      case 500: {
        setErrMsg("Login Failed");
        return;
      }
      default: {
        setErrMsg("Login Failed");
        return;
      }
    }
  };

  const handlesubmit = async (e) => {
    e.preventDefault();

    let formdata = new FormData();
    formdata.append("uid", id);
    formdata.append("upasswd", pwd);

    try {
      axios.default.withCredentials = true;
      const response = await axios({
        method: "post",
        url: URL,
        data: formdata,
      });

      const resData = response?.data;

      if (resData.status === "success") {
        sessionStorage.setItem(
          STORAGE_USER_CHECK,
          JSON.stringify({ uno: resData.uno, uid: resData.uid })
        );
        setUserKey(sessionStorage.getItem(STORAGE_USER_CHECK));

        console.log("Login Success");
        setId("");
        setPwd("");
      } else {
        serverRes(resData.status);
      }
    } catch (err) {
      if (!err?.response) {
        serverRes(err.response?.status);
        console.log(err.response?.status);
      }
      errRef.current.focus();
    }
  };

  return (
    <>
      {!userKey && (
        <section className="section-default section-login">
          <div className="login-area">
            <h1 className="login-title">Calendar</h1>

            <div className="login-form-area">
              <form className="login-form" onSubmit={handlesubmit}>
                <div className="form-row-area">
                  <label className="login-label" htmlFor="uid">
                    ID
                  </label>
                  <input
                    className="login-input"
                    type="text"
                    ref={idRef}
                    id="uid"
                    autoComplete="off"
                    onChange={onIdChange}
                    value={id}
                    required
                  />
                </div>
                <div className="form-row-area">
                  <label className="login-label" htmlFor="upasswd">
                    PASSWORD
                  </label>
                  <input
                    className="login-input"
                    type="password"
                    id="upasswd"
                    onChange={onPasswdChange}
                    value={pwd}
                    required
                  />
                </div>
                <span
                  ref={errRef}
                  className={errMsg ? "errmsg" : "offscreen"}
                  aria-live="assertive"
                >
                  {errMsg}
                </span>
                <button className="login-btn">Sign In</button>
              </form>
            </div>
          </div>
        </section>
      )}
    </>
  );
}

export default Login;
