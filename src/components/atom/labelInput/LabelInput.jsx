// labelInput.jsx
import React, { useState } from "react";
import s from "./labelInput.module.scss";
import { Eye, Eye_slash } from "../iconsHerocoins/icons";

export default function LabelInput({
  text,
  type,
  name,
  value,
  onChange,
  placeholder,
}) {
  const [showPassword, setShowPassword] = useState(false);

  const handleInput = (e) => {
    onChange(e);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <label htmlFor={name}>{text}</label>
      <div className={s.inputContainer}>
        <input
          type={showPassword ? "text" : "password"}
          id={name}
          name={name}
          value={value}
          onChange={handleInput}
          placeholder={placeholder}
        />
        {type === "password" && (
          <div className={s.eyesContainer}>
            {showPassword ? (
              <Eye heigth={"24px"} className={s.eyesIcon} onClick={togglePasswordVisibility} />
            ) : (
              <Eye_slash heigth={"24px"} className={s.eyesIcon} onClick={togglePasswordVisibility} />
            )}
          </div>
        )}
      </div>
    </>
  );
}








/* import React, { useState } from "react";
import s from "./labelInput.module.scss";
import { Eye, Eye_slash } from "../iconsHerocoins/icons";
import { Icon } from "semantic-ui-react";

export default function LabelInput({
  text,
  type,
  name,
  value,
  onChange,
  placeholder,
  icon,
}) {
  const [showPassword, setShowPassword] = useState(false);

  const handleInput = (e) => {
    // Si el tipo es "number", eliminar caracteres no numéricos
    if (type === "number") {
      onChange({
        ...e,
        target: { ...e.target, value: e.target.value.replace(/[^0-9]/g, "") },
      });
    } else if (type === "password") {
      onChange(e);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  let icons = {
    Eye: <Eye heigth={"24px"} />,
    Eye_slash: <Eye_slash heigth={"24px"} />,
  };

  return (
    <>
      <label htmlFor={name}>{text}</label>
      {type === "password" ? (
        <div className={s.inputContainer}>
          <input
            type={showPassword ? "text" : "password"}
            id={name}
            name={name}
            value={value}
            onChange={handleInput}
            placeholder={placeholder}
          />
          {showPassword ? (
            <Eye
              heigth={"24px"}
              className={s.eyes}
              onClick={togglePasswordVisibility}
            />
          ) : (
            <Eye_slash
              className={s.eyes}
              heigth={"24px"}
              onClick={togglePasswordVisibility}
            />
          )}
        </div>
      ) : (
        <input
          type={type}
          id={name}
          name={name}
          value={value}
          onChange={handleInput}
        >
          {showPassword ? (
            <Eye heigth={"24px"} onClick={togglePasswordVisibility} />
          ) : (
            <Eye_slash heigth={"24px"} onClick={togglePasswordVisibility} />
          )}
        </input>
      )}
    </>
  );
} */
