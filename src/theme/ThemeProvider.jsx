import { createContext, useContext, useState } from 'react';
import { lightTheme, darkTheme } from './theme';

export const ThemeContextApi = createContext();

const ThemeProviderApi = ({ children }) => {
  const [theme, setTheme] = useState(darkTheme);

  const toggleTheme = () => setTheme((prev) => (prev === lightTheme ? darkTheme : lightTheme));

  return (
    <ThemeContextApi.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContextApi.Provider>
  );
};

export default ThemeProviderApi;
export const useTheme = () => useContext(ThemeContextApi);
