import axios from "axios";
import nookies from "nookies";
import Layout from "../components/layout";

function Profile(props) {
  console.log("props", props);
  return <Layout>User email {props.email}</Layout>;
}

Profile.getInitialProps = async ctx => {
  const { token } = nookies.get(ctx);

  const isBrowser = process.browser;
  const headers = isBrowser
    ? {}
    : {
        Cookie: `token=${token}`
      };

  try {
    const response = await axios("https://builditlater.ngrok.io/api/profile", {
      method: "get",
      headers,
      withCredentials: true
    });

    console.log("response", response.data);

    if (response.status === 200) {
      const { message } = response.data;
      console.log("message", message);
      return {
        email: message.email
      };
    }
  } catch (error) {
    console.error("error while trying to get profile", error);
    return {};
  }
};

export default Profile;
