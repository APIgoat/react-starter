import cx from "classnames";
import React, { FC, SyntheticEvent, useState } from "react";

import style from "./style.module.scss";

export const useFormInput = (initialValue: string | number) => {
  const [value, setValue] = useState(initialValue);

  const handleChange = (value: string | number) => {
    setValue(value);
  };

  return {
    value,
    onChange: handleChange,
  };
};

interface Props {
  autoComplete?: string;
  onChange?: (value: string) => void;
  onBlur?: (event: SyntheticEvent) => void;
  onKeyUp?: (event: SyntheticEvent) => void;
  placeholder?: string;
  required?: boolean;
  type?: string;
  value?: string | number;
  children?: JSX.Element;
  theme?: "dark" | "light";
  label?: string;
}

const Input: FC<Props> = ({
  autoComplete,
  onChange,
  onBlur,
  onKeyUp,
  placeholder,
  required,
  type = "text",
  value,
  children,
  theme,
  label,
}) => {
  const [localValue, setLocalValue] = useState(value);

  const handleChange = ({ target: { value } }: any) => {
    setLocalValue(value);
    onChange?.(value);
  };

  return (
    <label className={style.fieldWrapper}>
      {label && <span className="inputLabel">{label}</span>}
      <input
        className={cx(style.field, { [style.dark]: theme === "dark" })}
        type={type}
        required={required}
        autoComplete={autoComplete}
        placeholder={placeholder}
        value={localValue}
        onBlur={onBlur}
        onKeyUp={onKeyUp}
        onChange={handleChange}
      />
      {children}
    </label>
  );
};

export default Input;
