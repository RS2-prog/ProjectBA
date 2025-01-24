import React, { createContext, useContext, useState } from 'react';

type Error = { id: number; message: string };

type ErrorContextType = {
  errors: Error[];
  addError: (message: string) => void;
  removeError: (id: number) => void;
  clearErrors: () => void;
};

const ErrorContext = createContext<ErrorContextType | undefined>(undefined);

export const ErrorProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [errors, setErrors] = useState<Error[]>([]);

  const addError = (message: string) => {
    const id = Date.now(); 
    setErrors((prev) => [...prev, { id, message }]);
  };

  const removeError = (id: number) => {
    setErrors((prev) => prev.filter((error) => error.id !== id));
  };

  const clearErrors = () => {
    setErrors([]);
  };

  return (
    <ErrorContext.Provider value={{ errors, addError, removeError, clearErrors }}>
      {children}
    </ErrorContext.Provider>
  );
};

export const useError = () => {
  const context = useContext(ErrorContext);
  if (!context) throw new Error('useError must be used within an ErrorProvider');
  return context;
};
