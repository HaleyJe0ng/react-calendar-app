import axios from "axios";
const URL = "http://15.164.213.157/";

export async function deleteUserEvent(sno) {
  let url = "delete-schedule.php";
  let formdata = new FormData();
  formdata.append("sno", sno);

  console.log("sno", sno);

  const serverRes = (res) => {
    switch (res) {
      case 400: {
        console.log("No Schedule Key");
        return;
      }
      case 401: {
        console.log("No Schedule Key");
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

  try {
    axios.default.withCredentials = true;

    const response = await axios({
      method: "POST",
      url: `${URL}${url}`,
      data: formdata,
    });

    const resData = response?.data;

    console.log("delete schedule", resData);

    return resData.results ? resData.results : [];
  } catch (err) {
    if (!err?.response) {
      serverRes(err.response?.status);

      return [];
    }
  }
}
