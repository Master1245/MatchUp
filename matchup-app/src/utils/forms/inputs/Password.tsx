import React, { ChangeEvent } from 'react';
import Field from '../field';
import { StrongPassword } from '../validates/StrongPassword';

interface PasswordFieldProps {
  value: string;
  onChange: (value: string) => void;
}

const PasswordField: React.FC<PasswordFieldProps> = ({ value, onChange }) => {
  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    onChange(newValue);
  };

  const passwordError = StrongPassword(value);

  return (
    <Field label="Password" value={value} onChange={handlePasswordChange} error={passwordError}>
      <input type="password" value={value} onChange={handlePasswordChange} />
      asasdasdas
    </Field>
  );
};

export default PasswordField;
