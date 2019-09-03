import { Auth } from "aws-amplify";

console.log("config", currentConfig);
// &5CuLMqFmbx#

async function signUp(username, email, password) {
  try {
    const response = await Auth.signUp({
      username,
      password,
      attributes: {
        email
      }
    });

    console.log("user signed up!", response);
  } catch (error) {
    console.error("Error trying to signup user", error);
  }
}

async function confirmSignup(username, authCode) {
  try {
    await Auth.confirmSignUp(username, authCode);
    console.log("successfully signed up!");
  } catch (error) {
    console.error("Error while trying to confirm signup", error);
  }
}

export { signUp, confirmSignup };
