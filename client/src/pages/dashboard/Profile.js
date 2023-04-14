import { useEffect, useState } from "react";
import { FormRow, Alert } from "../../components";
import { useAppContext } from "../../context/appContext";
import Wrapper from "../../assets/wrappers/DashboardFormPage";
import { emailValidator, passwordValidator } from "../../utils/validators";

const Profile = () => {
  const { user, showAlert, displayAlert, updateUser, isLoading, authFetch } =
    useAppContext();

  const [name, setName] = useState(user?.name);
  const [email, setEmail] = useState(user?.email);
  const [lastName, setLastName] = useState(user?.lastName);
  const [location, setLocation] = useState(user?.location);
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    lastName: "",
    location: "",
  });
  const [pass, setPass] = useState({
    password: "",
    newPassword: "",
    signNewPassword: "",
  });
  const [passErr, setPassErr] = useState({
    password: "",
    newPassword: "",
    signNewPassword: "",
  });
  const [isPassLoading, setIsPassLoading] = useState(false);
  const [isPassErr, setIsPassErr] = useState("");

  useEffect(() => {
    if (!isPassErr) return;
    setTimeout(() => {
      setIsPassErr("");
    }, 3000);
  }, [isPassErr]);

  const handleSubmit = (e) => {
    e.preventDefault();
    let ex = false;
    if (name.length < 4) {
      setErrors((p) => ({
        ...p,
        name: "Please enter min 4 or more characters!",
      }));
      ex = true;
    }
    if (lastName.length < 4) {
      setErrors((p) => ({
        ...p,
        lastName: "Please enter min 4 or more characters!",
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
    if (location.length < 4) {
      setErrors((p) => ({
        ...p,
        location: "Please enter min 4 or more characters!",
      }));
      ex = true;
    }
    if (ex) return;
    updateUser({ name, email, lastName, location });
  };

  function changePass(e) {
    const { name, value } = e.target;
    setPass((p) => ({ ...p, [name]: value }));
    setPassErr((p) => ({ ...p, [name]: "" }));
  }

  const handleChangePass = (e) => {
    e.preventDefault();

    let ex = false;
    if (!passwordValidator(pass.password)) {
      setPassErr((p) => ({
        ...p,
        password:
          "Password must contain at least one lowercase letter, one uppercase letter, one number, one symbol, and have a length of at least 8 characters.",
      }));
      ex = true;
    }
    if (!passwordValidator(pass.newPassword)) {
      setPassErr((p) => ({
        ...p,
        newPassword:
          "Password must contain at least one lowercase letter, one uppercase letter, one number, one symbol, and have a length of at least 8 characters.",
      }));
      ex = true;
    } else if (pass.password === pass.newPassword) {
      setPassErr((p) => ({
        ...p,
        newPassword: "Password and new password cannot be equal.",
      }));
      ex = true;
    }
    if (pass.newPassword !== pass.signNewPassword) {
      setPassErr((p) => ({
        ...p,
        signNewPassword: "Sign new password must match new password.",
      }));
      ex = true;
    }
    if (ex) return;
    changePassword({ password: pass.password, newPassword: pass.newPassword });
  };

  async function changePassword(body) {
    setIsPassLoading(true);
    try {
      const res = await authFetch.patch("/auth/changePassword", body);
      setIsPassErr({ type: "success", text: res.data.msg });
      setPass({
        password: "",
        newPassword: "",
        signNewPassword: "",
      });
    } catch (error) {
      console.log(error);
      setIsPassErr({ type: "danger", text: error.response.data.msg });
    } finally {
      setIsPassLoading(false);
    }
  }

  return (
    <Wrapper>
      <form
        className="form"
        onSubmit={handleSubmit}
        autoComplete="off"
        noValidate
      >
        <h3>profile</h3>
        {showAlert && <Alert />}
        <div className="form-center">
          <FormRow
            type="text"
            name="name"
            value={name}
            handleChange={(e) => {
              setName(e.target.value);
              setErrors((p) => ({ ...p, name: "" }));
            }}
            error={errors.name}
          />
          <FormRow
            type="text"
            labelText="last name"
            name="lastName"
            value={lastName}
            handleChange={(e) => {
              setLastName(e.target.value);
              setErrors((p) => ({ ...p, lastName: "" }));
            }}
            error={errors.lastName}
          />
          <FormRow
            type="email"
            name="email"
            value={email}
            handleChange={(e) => {
              setEmail(e.target.value);
              setErrors((p) => ({ ...p, email: "" }));
            }}
            error={errors.email}
          />
          <FormRow
            type="text"
            name="location"
            value={location}
            handleChange={(e) => {
              setLocation(e.target.value);
              setErrors((p) => ({ ...p, location: "" }));
            }}
            error={errors.location}
          />
          <button className="btn btn-block" type="submit" disabled={isLoading}>
            {isLoading ? "Please Wait..." : "save changes"}
          </button>
        </div>
      </form>

      <form
        className="form"
        onSubmit={handleChangePass}
        style={{ marginTop: "30px" }}
        autoComplete="off"
        noValidate
      >
        <h3>Change Password</h3>
        {isPassErr && <Alert type={isPassErr.type} text={isPassErr.text} />}
        <div className="form-center">
          <FormRow
            type="password"
            name="password"
            labelText="old password"
            value={pass.password}
            handleChange={changePass}
            error={passErr.password}
          />
          <FormRow
            type="password"
            labelText="new password"
            name="newPassword"
            value={pass.newPassword}
            handleChange={changePass}
            error={passErr.newPassword}
          />
          <FormRow
            type="password"
            name="signNewPassword"
            labelText="sign new password"
            value={pass.signNewPassword}
            handleChange={changePass}
            error={passErr.signNewPassword}
          />
          <button
            className="btn btn-block"
            type="submit"
            disabled={isPassLoading}
            style={{ marginTop: "16px" }}
          >
            {isPassLoading ? "Please Wait..." : "save password"}
          </button>
        </div>
      </form>
    </Wrapper>
  );
};

export default Profile;
