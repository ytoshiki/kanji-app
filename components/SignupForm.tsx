import React, { useState } from 'react';
import { useMutation, gql } from "@apollo/client";
import { Alert, Collapse, Fade, IconButton, Slide } from '@mui/material';
import { setTokenOnBrowser } from '../utils/setTokenOnBrowser';
import { GET_USER } from '../components/Navigation';

const SIGNUP = gql`
  mutation Signup($username: String!, $password: String!) {
    signup(credentials: {username: $username, password: $password}) {
      token,
      username,
      avatar
      userErrors {
        message
      }
    }
}`
const SignupForm = () => {

  const [signedUpSuccess, setSignedUpSuccess] = useState(false);

  const [form, setForm] = useState({
    username: "",
    password: ""
  })

  const [signup, {data, loading, error}] = useMutation(SIGNUP, {
    variables: {
      username: form.username.trim(),
      password: form.password.trim()
    },
    refetchQueries: [{
      query: GET_USER
    }]
  });
  

  const [formError, setFormError] = useState("");

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormError("");
    setSignedUpSuccess(false);
    
    const { username, password } = form;

    if (!username || !password) {
      return setFormError("Either username or password is missing");
    };

    if (password.length < 6) return setFormError("At least 6 characters are required for password")
    

    const response: any = await signup();

    const {data} = response;

    if (data.signup.userErrors.length) {
      return setFormError(data.signup.userErrors[0].message);
    }

    if (data.signup.token) {
      setSignedUpSuccess(true);
      setTokenOnBrowser(data.signup.token);
    }
  }

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <form onSubmit={submitHandler}>
        <div>
          <label>username</label>
          <input type="text" value={form.username} onChange={(e) => {
            setForm({
              ...form,
              username: e.target.value
            })
          }}/>
        </div>
        <div>
          <label>password</label>
          <input type="text" value={form.password} onChange={(e) => {
            setForm({
              ...form,
              password: e.target.value
            })
          }}/>
        </div>
        {
          <Collapse in={!!formError}>
            <Alert severity="error">
              {formError}
            </Alert>
          </Collapse>
        }
        <button>Signup</button>
      </form>
      {
        <Collapse in={signedUpSuccess} >
          <Alert severity="success">
            You've successfully signed up!
          </Alert>
        </Collapse>
      }
    </div>
  )
}

export default SignupForm
