import { React, useEffect, useState } from 'react'
import Authentication from './components/Authentication/Authentication'
import Body from './components/Content/Body/Body';
import ClassMenu from "./components/Content/ClassMenu/ClassMenu"
import Banner from './components/Banner/Banner'

function App() {
  const [token, setToken] = useState(() => {
    const saved = localStorage.getItem('token');
    const initialValue = JSON.parse(saved);
    return initialValue || "";
  });
  // const [token, setToken] = useState("");

  // const [token, setToken] = useState("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTk2ODU4NzE0MTllMzA1ZmViYjNmZTAiLCJpYXQiOjE2Mzc3NDY1NzN9.jSE0TQ2KKFd3DxnoWcUplFWjojzYArDiVEmMNUa5lOM");

  useEffect(() => {
    console.log("updated ",token)
    localStorage.setItem('token', JSON.stringify(token));
  }, [token])

  return (
    <div className="App">
      <Banner/>
      {(token === "" || token === undefined || token === null) ? 
      <Authentication setToken={setToken} /> : <Body token={token} setToken={setToken}/>}
    </div>
  );
}

export default App;
