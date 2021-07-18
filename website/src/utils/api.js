import axios from 'axios';

const HOST = "http://localhost:8080";

const API = {
    login: (email, pass, success) => {
        console.log("email: ", email, "\npassword: ", pass);
        axios.post(`${HOST}/api/users/login`, { email: email, password: pass })
            .then(res => {
                success(res);
            });
    },
    getUsers: (token, success) => {
        axios.get(`${HOST}/api/users?access_token=${token}`)
            .then(res => {
                success(res);
            });
    },
    getPosts: (token, success) => {
        axios.get(`${HOST}/api/Posts?access_token=${token}`)
            .then(res => {
                success(res);
            });
    }
}

export default API;