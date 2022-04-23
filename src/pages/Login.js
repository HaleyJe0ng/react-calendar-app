import { useRef, useState, useEffect } from "react";
import axios from "axios";
import Calendar from "./Calendar";
const URL = "http://15.164.213.157/database/login.php";
const STORAGE_USER_CHECK = "user_key";

function Login() {
  const idRef = useRef();
  const errRef = useRef();
  const [id, setId] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    idRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [id, pwd]);

  const onIdChange = (e) => setId(e.target.value);
  const onPasswdChange = (e) => setPwd(e.target.value);

  const serverRes = (res) => {
    setSuccess(false);
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
        setErrMsg("No Server Response");
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

        console.log("Login Success");
        setId("");
        setPwd("");
        setSuccess(true);
      } else {
        serverRes(resData.status);
      }
    } catch (err) {
      if (!err?.response) {
        serverRes(err.response?.status);
      }
      errRef.current.focus();
    }
  };

  return (
    <>
      {success ? (
        <Calendar></Calendar>
      ) : (
        <section>
          <p
            ref={errRef}
            className={errMsg ? "errmsg" : "offscreen"}
            aria-live="assertive"
          >
            {errMsg}
          </p>

          <h1>Sign in</h1>
          <form onSubmit={handlesubmit}>
            <label htmlFor="uid">ID</label>
            <input
              type="text"
              ref={idRef}
              id="uid"
              autoComplete="off"
              onChange={onIdChange}
              value={id}
              required
            />

            <label htmlFor="upasswd">PASSWORD</label>
            <input
              type="password"
              id="upasswd"
              onChange={onPasswdChange}
              value={pwd}
              required
            />

            <button>Sign In</button>
          </form>
        </section>
      )}
    </>
  );
}

export default Login;
