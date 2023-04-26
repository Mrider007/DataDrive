import './App.css';

import SignUp from "./component/SignUp";
import { Routes, Route } from "react-router-dom";
import Login from "./component/Login";
import CreateFolder from "./component/CreateFolder";
import Body from './screen/Body'
import AuthProvider from './context/AuthContext';
import Navbar1 from './component/Navbar1';
import { FirestoreProvider } from './context/dbContext';
// import { FileProvider } from './context/fileContext';










function App() {


  return (
    <div className='App'>
      <Navbar1/>
      <AuthProvider>
        <FirestoreProvider>
        {/* <FileProvider> */}
      <Routes>
        <Route path="/" element= {<Login/>}/>
        <Route path="/signup" element= {<SignUp/>}/>
        <Route path="/home" element= {<CreateFolder/>}/>
        <Route path="/data" element= {<Body/>}/>
        <Route path="*" element= {<h1>404 page not found </h1>}/>
      </Routes>

        {/* </FileProvider> */}
        </FirestoreProvider>
      </AuthProvider>


    </div>

  );
}

export default App;
