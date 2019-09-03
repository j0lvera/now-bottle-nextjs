import { useState } from "react";
import qs from "qs";
import axios from "axios";
import { Box, Button } from "rebass";
import { Label, Input } from "@rebass/forms";
import Layout from "../components/layout";

function Signup() {
  const [userData, setUserData] = useState({
    email: "",
    password: ""
  });

  function handleChange(event) {
    const { name, value } = event.target;
    setUserData(Object.assign({}, userData, { [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    console.log("userdata", userData);
    const { email, password } = userData;

    try {
      const response = await axios({
        url: "/api/signup",
        method: "post",
        headers: { "content-type": "application/x-www-form-urlencoded" },
        data: qs.stringify({
          email,
          password
        })
      });

      console.log("response", response);
    } catch (error) {
      console.log("error trying to sign up user", error);
    }
  }

  return (
    <Layout>
      <Box as="form" onSubmit={handleSubmit}>
        <Box mt={3}>
          <Label htmlFor="email">Email</Label>
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

export default Signup;
