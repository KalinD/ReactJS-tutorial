import axios from 'axios';

const HOST = "http://localhost:8080";

const API = {
    login: (email, pass, success) => {
        console.log("email: ", email, "\npassword: ", pass);
        axios.post(`${HOST}/api/users/login`, { email: email, password: pass })
            .then(res => {
                console.log("Received a reponse: ", res);
                success(res);
            });
    }
}

export default API;