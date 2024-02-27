import logo from '../logo.png'
import "./login.css";
import {useCookies} from "react-cookie";
//import { useNavigate } from 'react-router-dom';
import TextInput from "../components/shared/TextInput";
import { Link,  useNavigate} from "react-router-dom";
import PasswordInput from "../components/shared/PasswordInput";
import { useState } from 'react';
import { makeUnauthenticatedPOSTRequest } from '../utils/ServerHelpers';

const SignupComponent = () => {

    const [email, setEmail] = useState("");
    const [confirmEmail, setConfirmEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");

    const [ cookie, setCookie] = useCookies(["token"]);
    const navigate = useNavigate();

    const signup = async (e) => {
        e.preventDefault();
        if (email != confirmEmail) {
            alert("email and conform email d=field must match, Please check again");
            return;
        }
        const data = {
            email, password, username, firstName, lastName
        }
        const response = await makeUnauthenticatedPOSTRequest(
            "/auth/register",
            data
        );
        if (response && !response.err) {
            //console.log(response);
            const token = response.token
            const date = new Date();
            date.setDate(date.getDate() + 30);

            setCookie("token", token, {path:"/", expires:date});
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
                <div className="font-bold mb-4 text-2xl">
                    Sign Up for free to start listening.
                </div>
                <TextInput
                    label="Email address"
                    placeholder="Enter your email"
                    className="my-6"
                    value={email}
                    setValue={setEmail}
                />

                <TextInput
                    label="Confirm email address"
                    placeholder="Enter your email again"
                    className="mb-6"
                    value={confirmEmail}
                    setValue={setConfirmEmail}
                />

                <TextInput
                    label="Username"
                    placeholder="Enter your username"
                    className="mb-6"
                    value={username}
                    setValue={setUsername}
                />


                <PasswordInput
                    label="Password"
                    placeholder="Enter a strong password"
                    className="my-6"
                    value={password}
                    setValue={setPassword}
                />



                <div className='w-full flex justify-between items-center space-x-8'>

                    <TextInput
                        label="First name"
                        placeholder="Enter your Firstname"
                        className="my-6"
                        value={firstName}
                        setValue={setFirstName}
                    />
                    <TextInput
                        label="Last name"
                        placeholder="Enter your Lastname"
                        className="my-6"
                        value={lastName}
                        setValue={setLastName}
                    />
                </div>

                <div className=" w-full flex items-center justify-center my-8">
                    <button className="font-semibold p-3 px-10 rounded-full button " onClick={signup}>
                        Sign Up
                    </button>
                </div>
                <div className="w-full border border-solid border-gray-300"></div>
                <div className="my-6 font-semibold text-lg">
                    Don't have an account?
                </div>
                <div className="border border-gray-500 text-gray-500 w-full flex items-center justify-center py-4 rounded-full font-bold">
                    <Link to="/login">LOG IN INSTEAD</Link>
                </div>
            </div>
        </div>


    )
};

export default SignupComponent;
