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

export const CriarComunicado = async (title, description, photo = "") => {
    let result = {};

    await axios.post(route.comunicados.create, { title: title, description: description, photo: photo })
        .then(response => {
            result = response.data;
        })
        .catch(error => {
            console.error(error);
        });

    return result;
}

export const DesativarComunicado = async (id) => {
    let result = {};

    await axios.post(route.comunicados.update, { id: id })
        .then(response => {
            result = response.data;
        })
        .catch(error => {
            console.error(error);
        });

    return result;
}