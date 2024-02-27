import { useState } from 'react';
import logo from '../logo.png'
import TextInput from "../components/shared/TextInput";
import { Link, useNavigate } from "react-router-dom";
import './login.css';
import PasswordInput from "../components/shared/PasswordInput";
import { makeUnauthenticatedPOSTRequest } from '../utils/ServerHelpers';
import { useCookies } from "react-cookie";
import { useContext } from "react";
import nameContext from '../contexts/usernameContext';

const LoginComponent = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [cookies, setCookie] = useCookies(["token","uname"]);
    const navigate = useNavigate();
    const { uname, setName } = useContext(nameContext);


    const login = async (e) => {
        e.preventDefault();
        const data = {
            email, password
        }
        const response = await makeUnauthenticatedPOSTRequest(
            "/auth/login",
            data
        );
        if (response && !response.err) {
            // console.log(response);
            let fname = response.firstName;
            let lname = response.lastName;
            let nm = fname.slice(0, 1) + lname.slice(0, 1);
            setCookie("uname",nm);
            setName(nm);
            console.log(uname);


            const token = response.token
            const date = new Date();
            date.setDate(date.getDate() + 30);

            setCookie("token", token, { path: "/", expires: date });
            // alert("success");
            navigate('/home');
        }
        else {
            alert("failure");
        }
    }
    return (
        <div className="w-full h-full flex flex-col items-center">
            <div className="logo p-5 border-b border-solid border-gray-300 w-full flex items-center justify-center">
                <img src={logo} width="60" height="60" className="mr-2" />
                <h1 className="text-2xl font-semibold text-center text-gray-800">Musiverse</h1>
            </div>

            <div className="inputRegion w-1/3 py-10 flex items-center justify-center flex-col">
                <div className="font-bold mb-4">
                    To continue, log in to Musiverse.
                </div>
                <TextInput
                    label="Email address or username"
                    placeholder="Email address or username"
                    className="my-6"
                    value={email}
                    setValue={setEmail}
                />
                <PasswordInput
                    label="Password"
                    placeholder="Password"
                    value={password}
                    setValue={setPassword}
                />


                <div className=" w-full flex items-center justify-end my-8">
                    <button className="font-semibold p-3 px-10 rounded-full button " onClick={login}>
                        LOG IN
                    </button>
                </div>
                <div className="w-full border border-solid border-gray-300"></div>
                <div className="my-6 font-semibold text-lg">
                    Don't have an account?
                </div>
                <div className="border border-gray-500 text-gray-500 w-full flex items-center justify-center py-4 rounded-full font-bold">
                    <Link to="/signup">SIGN UP FOR MUSIVERSE</Link>
                </div>
            </div>
        </div>


    )
};

export default LoginComponent;
