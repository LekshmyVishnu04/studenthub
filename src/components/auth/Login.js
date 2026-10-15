import Navbar from "../Navbar";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../store/authSlice";
import checkGuest from "./checkGuest";


function Login() {
    var [email, setEmail] = useState('');
    var [password, setPassword] = useState('');
    var [errorMessage, setErrorMessage] = useState('');
    var navigate = useNavigate();
    const dispatch = useDispatch();
    function attemptLogin() {
        axios.post('https://worksheet-student.mashupstack.com/login', {
            email: email,
            password: password
        }).then(response => {
            setErrorMessage('')
            var user = {
                email: email,
                token: response.data.token
            };

            dispatch(setUser(user));
            navigate('/');
            // console.log("User data:", user);
            // console.log("Dispatched action:", setUser(user));

            // console.log(response.data.token)
        }).catch(error => {
            const data = error.response?.data;

            if (data?.errors) {
                setErrorMessage(
                    Object.values(data.errors).flat().join(" ")
                );
            } else if (data?.message) {
                setErrorMessage(data.message);
            } else {
                setErrorMessage(
                    "Failed to login. Please check your connection and try again."
                );
            }
        });
    }

    return (<div>
        <Navbar />
        <div className="container">
            <div className="row">
                <div className="col-8 offset-2">
                    <h1>Login</h1>
                    {errorMessage ? <div className="alert alert-danger">{errorMessage}</div> : ''}
                    <div className="form-group">
                        <label>Email:</label>
                        <input type="text"
                            className="form-control"
                            value={email}
                            onInput={(event) => setEmail(event.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label>Password:</label>
                        <input type="password"
                            className="form-control"
                            value={password}
                            onInput={(event) => setPassword(event.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <button className="btn btn-primary float-right" onClick={attemptLogin}>Login</button>
                    </div>
                </div>
            </div>
        </div>
    </div>)

}

export default checkGuest(Login)