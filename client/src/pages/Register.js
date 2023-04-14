import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Wrapper from "../assets/wrappers/RegisterPage";
import { Logo, FormRow, Alert } from "../components";
import { useAppContext } from "../context/appContext";
import { emailValidator, passwordValidator } from "../utils/validators";

const initialState = {
  name: "",
  email: "",
  password: "",
  isMember: true,
};

const Register = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState(initialState);
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
  });
  const { user, isLoading, showAlert, displayAlert, setupUser } =
    useAppContext();

  const toggleMember = () => {
    setValues({ ...values, isMember: !values.isMember });
  };

  const handleChange = (e) => {
    setErrors((p) => ({ ...p, [e.target.name]: "" }));
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const { name, email, password, isMember } = values;
    let ex = false;
    if (!isMember && name.length < 4) {
      setErrors((p) => ({
        ...p,
        name: "Please enter min 4 or more characters!",
      }));
      ex = true;
    }
    if (!emailValidator(email)) {
      setErrors((p) => ({
        ...p,
        email: "Please enter valid email address! For example : user@gmail.com",
      }));
      ex = true;
    }
    if (!passwordValidator(password)) {
      setErrors((p) => ({
        ...p,
        password:
          "Password must contain at least one lowercase letter, one uppercase letter, one number, one symbol, and have a length of at least 8 characters.",
      }));
      ex = true;
    }
    if (ex) return;

    const currentUser = { name, email, password };
    if (isMember) {
      setupUser({
        currentUser,
        endPoint: "login",
        alertText: "Login Successful! Redirecting...",
      });
    } else {
      setupUser({
        currentUser,
        endPoint: "register",
        alertText: "User Created! Redirecting...",
      });
    }
  };

  useEffect(() => {
    if (user) {
      setTimeout(() => {
        navigate("/");
      }, 3000);
    }
  }, [user, navigate]);

  return (
    <Wrapper className="full-page">
      <form className="form" onSubmit={onSubmit} noValidate autoComplete="off" >
        <Logo />
        <h3>{values.isMember ? "Login" : "Register"}</h3>
        {showAlert && <Alert />}
        {/* name input */}
        {!values.isMember && (
          <FormRow
            type="text"
            name="name"
            value={values.name}
            handleChange={handleChange}
            error={errors.name}
          />
        )}

        {/* email input */}
        <FormRow
          type="email"
          name="email"
          value={values.email}
          handleChange={handleChange}
          error={errors.email}
        />
        {/* password input */}
        <FormRow
          type="password"
          name="password"
          value={values.password}
          handleChange={handleChange}
          error={errors.password}
        />
        <button type="submit" className="btn btn-block" disabled={isLoading}>
          submit
        </button>
        {/* <button
          type='button'
          className='btn btn-block btn-hipster'
          disabled={isLoading}
          onClick={() => {
            setupUser({
              currentUser: { email: 'testUser@test.com', password: 'secret' },
              endPoint: 'login',
              alertText: 'Login Successful! Redirecting...',
            });
          }}
        >
          {isLoading ? 'loading...' : 'demo app'}
        </button> */}
        <p>
          {values.isMember ? "Not a member yet?" : "Already a member?"}
          <button type="button" onClick={toggleMember} className="member-btn">
            {values.isMember ? "Register" : "Login"}
          </button>
        </p>
      </form>
    </Wrapper>
  );
};
export default Register;
