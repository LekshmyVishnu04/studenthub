import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar";

function Register() {

    var [name, setName] = useState('');
    var [email, setEmail] = useState('');
    var [password, setPassword] = useState('');
    var [passwordConf, setPasswordConf] = useState('');
    var [errorMessage, setErrorMessage] = useState('');
    var navigate = useNavigate();


    function registerUser() {

        if (password !== passwordConf) {
            setErrorMessage("Password and Confirm Password do not match!");
            return;
        }
        var user = {
            user_name: name,
            email: email,
            password: password
        }
        axios.post('https://worksheet-student.mashupstack.com/register', user).then(response => {
            setErrorMessage('');
            navigate('/login');
        }).catch(error => {
            console.log("API Error:", error);
            console.log("Response Status:", error.response?.status);
            console.log("Response Data:", error.response?.data);

            if (error.response?.data?.errors) {
                setErrorMessage(
                    Object.values(error.response.data.errors)
                        .flat()
                        .join(' ')
                );
            } else if (error.response?.data?.message) {
                setErrorMessage(error.response.data.message);
            } else if (error.response) {
                setErrorMessage(
                    JSON.stringify(error.response.data)
                );
            } else {
                setErrorMessage("Unable to connect to the API. Please try again.");
            }
        })
    }

    return (
        <div> <Navbar />
            <div className="container">
                <div className="row">

                    <div className="col-8 offset-2">
                        <h1>Register</h1>
                        {errorMessage ? <div className="alert alert-danger">{errorMessage}</div> : ''}
                        <div className="form-group">
                            <label>Name:</label>
                            <input type="text"
                                className="form-control"
                                value={name}
                                onInput={(event) => setName(event.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label>Email:</label>
                            <input type="text"
                                className="form-control"
                                value={email}
                                onChange={(event) => setEmail(event.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label>Password:</label>
                            <input type="password"
                                className="form-control"
                                value={password}
                                onChange={(event) => setPassword(event.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label>Confirm Password:</label>
                            <input type="password"
                                className="form-control"
                                value={passwordConf}
                                onInput={(event) => setPasswordConf(event.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <button className="btn btn-primary float-right" onClick={registerUser}>Submit</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default Register;