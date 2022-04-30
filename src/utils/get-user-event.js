import axios from "axios";
import dayjs from "dayjs";
const URL = "http://15.164.213.157/";

export async function getUserEvent(method, user_key, month) {
  let url = "";
  const year = dayjs(new Date(dayjs().year(), month)).format("YYYY");
  const mth = dayjs(new Date(dayjs().year(), month)).format("MM");
  let formdata = new FormData();
  formdata.append("uno", user_key);
  formdata.append("year", year);
  formdata.append("month", mth);
  console.log(mth);

  const serverRes = (res) => {
    switch (res) {
      case 400: {
        console.log("No User Key");
        return;
      }
      case 401: {
        console.log("No User Key");
        return;
      }
      case 500: {
        console.log("No data");
        return;
      }
      default: {
        console.log("No data");
        return;
      }
    }
  };

  switch (method) {
    case "POST": {
      url = "get-schedule.php";
      break;
    }
    case "UPDATE": {
      url = "update-schedule.php";
      break;
    }
    case "DELETE": {
      url = "delete-schedule.php";
      break;
    }
    default: {
      serverRes(500);
      break;
    }
  }

  try {
    axios.default.withCredentials = true;

    const response = await axios({
      method: method,
      url: `${URL}${url}`,
      data: formdata,
    });

    const resData = response?.data;

    console.log(resData);
    return resData.results ? resData.results : [];
  } catch (err) {
    if (!err?.response) {
      serverRes(err.response?.status);

      return [];
    }
  }
}
