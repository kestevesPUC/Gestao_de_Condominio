import axios from "axios";
import { route } from "../../config/route";


export const RecuperaTipoUsuario = async () => {
    let result = {};

    await axios.post(route.user.listar_tipos_usuario)
        .then((response) => {
            result = response.data;
        });

    return result;
}

export const AddUsuario = async (name, password, perfil, bloco, apto, email) => {
    let result = {};

    await axios.post(route.user.add, {
        "name": name,
        "password": password,
        "perfil": perfil,
        "bloco": bloco,
        "apto": apto,
        "email": email
    }).then((response) => {
        result = response.data;
    });

    return result;
}

export const ListarUsuario = async () => {
    let result = {};

    await axios.post(route.user.listar_usuarios)
        .then(response => {
            result = response.data;
        })
        .catch(error => {
            console.error(error);
        });

    return result;
}