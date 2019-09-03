import { useState } from "react";
import Router from "next/router";
import axios from "axios";
import qs from "qs";
import { Box, Button } from "rebass";
import { Label, Input } from "@rebass/forms";
import Layout from "../components/layout";

function Login() {
  const [userData, setUserData] = useState({
    email: "",
    password: ""
  });

  function handleChange(event, key) {
    const { name, value } = event.target;
    setUserData(Object.assign({}, userData, { [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    console.log("userdata", userData);

    const { email, password } = userData;
    try {
      const response = await axios({
        url: "/api/signin",
        method: "post",
        headers: { "content-type": "application/x-www-form-urlencoded" },
        data: qs.stringify({
          email,
          password
        })
      });

      console.log("response", response.data);

      if (response.status === 200) {
        Router.push("/profile");
      }
    } catch (error) {
      console.error("error when trying to log user in", error);

      //       if (err.code === 'UserNotConfirmedException') {
      //     // The error happens if the user didn't finish the confirmation step when signing up
      //     // In this case you need to resend the code and confirm the user
      //     // About how to resend the code and confirm the user, please check the signUp part
      // } else if (err.code === 'PasswordResetRequiredException') {
      //     // The error happens when the password is reset in the Cognito console
      //     // In this case you need to call forgotPassword to reset the password
      //     // Please check the Forgot Password part.
      // } else if (err.code === 'NotAuthorizedException') {
      //     // The error happens when the incorrect password is provided
      // } else if (err.code === 'UserNotFoundException') {
      //     // The error happens when the supplied username/email does not exist in the Cognito user pool
      // } else {
      //     console.log(err);
      // }
    }
  }

  return (
    <Layout>
      <Box as="form" onSubmit={handleSubmit}>
        <Box mt={3}>
          <Label htmlFor="username">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            required
            value={userData.email}
            onChange={handleChange}
          />
        </Box>

        <Box mt={3}>
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            name="password"
            type="password"
            required
            value={userData.password}
            onChange={handleChange}
          />
        </Box>

        <Box py={2}>
          <Button type="submit">Submit</Button>
        </Box>
      </Box>
    </Layout>
  );
}

export default Login;
