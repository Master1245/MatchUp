import React, { ChangeEvent, ReactNode } from 'react';

interface FieldProps {
  label: string;
  value: string;
  onChange: any;
  error?: any;
  children: ReactNode | ReactNode[];
}

const Field: React.FC<FieldProps> = ({ label, value, onChange, error, children }) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  return (
    <div className="field">
      {label && <label>{label}</label>}
      {React.cloneElement(children as React.ReactElement<any>, {
        value,
        onChange: handleChange,
      })}
      {error && <div>{error}</div>}
    </div>
  );
};

export default Field;
