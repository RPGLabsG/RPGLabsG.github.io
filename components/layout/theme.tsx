import * as React from "react";
import GlobalData from "../../content/global/index.json";

const ThemeContext = React.createContext(GlobalData.theme);

export const useTheme = () => React.useContext(ThemeContext);

const myGlobalVar = 'Test global var'

export const Theme = ({ children }) => {

  React.useEffect(() => {

    return;
  }, []);



  React.useEffect(() => {
    return
  }, []);

  return (
    <ThemeContext.Provider
      value={{
        myGlobalVar,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
