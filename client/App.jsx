import CarbonFootprint from "./components/CarbonFootprint.jsx";
import CarbonOptions from "./components/CarbonOptions.jsx";
import React, { useState } from "react";
import { Routes, Route, Navigate } from 'react-router-dom';
import ButtonAppBar from "./components/Nav.jsx";
import Body from "./components/Body.jsx";
import SignUp from "./components/Signup.jsx";
import SignIn from "./components/Login.jsx";
import Bodywriting from "./components/Bodywriting.jsx";
import Chart from "./components/Dashboard.jsx";
import BodyLogged from "./components/BodyLogged.jsx";
import Cookies from 'js-cookie';


const App = () => {
    // State
    const [loggedIn, setLoggedIn] = useState(Cookies.get('token'));
    const [posts, setPosts] = useState([]);

    if (loggedIn) {
        return (
            <div>
                <Routes>
                    <Route path='/' element={<ButtonAppBar loggedIn={loggedIn} setLoggedIn={setLoggedIn} />}>
                        <Route path='/' element={<BodyLogged />}>
                            <Route path='/' element={<CarbonFootprint posts={posts} setPosts={setPosts} />} /> 
                            <Route path='/*' element={<Navigate to='/' replace={true} />} />
                        </Route>
                    </Route>
                </Routes>
            </div>
        )
    }


    return (
        <div>
            <Routes>
                <Route path='/' element={<ButtonAppBar loggedIn={loggedIn}/>}>
                    <Route path='/' element={<Body />}>
                        <Route path='/' exact element={<Bodywriting />} />
                        <Route path='/Signup' element={<SignUp posts={posts} setPosts={setPosts} />} />
                        <Route path='/Login' element={<SignIn setLoggedIn={setLoggedIn}/>} />
                        <Route path='/*' element={<Navigate to='/' replace={true} />} />
                    </Route>
                </Route>
            </Routes>
        </div>
    )
}

export default App;
