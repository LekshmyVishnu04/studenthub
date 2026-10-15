
import checkAuth from './checkAuth';
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Navbar from "../Navbar";

function Home() {
    const user = useSelector(state => state.auth.user);

    const [students, setStudents] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        if (user && user.token) {
            axios.get(
                "https://worksheet-student.mashupstack.com/students",
                {
                    headers: {
                        Authorization: "Bearer " + user.token
                    }
                }
            )
                .then(response => {
                    setStudents(response.data);
                    setErrorMessage("");
                })
                .catch(error => {
                    console.log("API Error:", error.response?.data);
                    setErrorMessage("Failed to load students.");
                });
        }
    }, [user]);

    return (
        <div>
            <Navbar />

            <div className="container mt-4">
                <h1 className="text-center mb-4">
                    Student List
                </h1>

                {errorMessage && (
                    <div className="alert alert-danger">
                        {errorMessage}
                    </div>
                )}

                <div className="table-responsive">
                    <table className="table table-bordered table-striped">
                        <thead className="table-dark">
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Age</th>
                            </tr>
                        </thead>

                        <tbody>
                            {students.map(student => (
                                <tr key={student.id}>
                                    <td>{student.id}</td>
                                    <td>{student.name}</td>
                                    <td>{student.age}</td>
                                </tr>
                            ))}

                            {students.length === 0 && !errorMessage && (
                                <tr>
                                    <td colSpan="3" className="text-center">
                                        No students available.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}


export default checkAuth(Home);