import { useState } from "react";

const FormRow = ({ type, name, value, handleChange, labelText, error }) => {
  const [isShowPass, setIsShowPass] = useState(!false);

  return (
    <div className="form-row" style={{ position: "relative" }}>
      <label htmlFor={name} className="form-label">
        {labelText || name}
      </label>
      <input
        type={isShowPass ? "text" : type}
        value={value}
        name={name}
        onChange={handleChange}
        className="form-input"
      />
      {type === "password" && (
        <i
          class={`input-password-eye  ${
            isShowPass ? "ri-eye-off-line" : "ri-eye-line"
          }`}
          onClick={() => setIsShowPass((p) => !p)}
        />
      )}
      {error && <p className="input-error-text">{error}</p>}
    </div>
  );
};

export default FormRow;
