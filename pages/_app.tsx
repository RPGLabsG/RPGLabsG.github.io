import React from "react";
import "../styles.css";
import { useRouter } from 'next/router'

const App = ({ Component, pageProps }) => {
  const router = useRouter();
  React.useEffect(()=>{
    router.push(window.location.href)
  },[])
  return <Component {...pageProps} />;
};

export default App;

