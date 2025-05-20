import axios from "axios";
import { route } from "../../config/route";

export const LoginUser = async (email, password) => {
    let result = {};

    await axios.post(route.auth, { email: email, password: password })
        .then(response => {
            result = response.data;
        })
        .catch(error => {
            console.error(error);
        });

    return result;
}