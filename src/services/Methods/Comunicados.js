import axios from "axios";
import { route } from "../../config/route";

export const ListarComunicados = async () => {
    let result = {};

    await axios.post(route.comunicados.listar)
        .then(response => {
            result = response.data;
        })
        .catch(error => {
            console.error(error);
        });

    return result;
}