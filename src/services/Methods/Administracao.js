import axios from "axios";
import { route } from "../../config/route";

export const ListarPerfis = async () => {
    let result = {};

    await axios.post(route.administracao.perfis)
        .then(response => {
            result = response.data;
        })
        .catch(error => {
            console.error(error);
        });

    return result;
}
export const CriarPerfil = async (name, description) => {
    let result = {};

    await axios.post(route.administracao.addPerfil, { name: name, description: description })
        .then(response => {
            result = response.data;
        })
        .catch(error => {
            console.error(error);
        });

    return result;
}