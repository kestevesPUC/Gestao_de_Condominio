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

export const AddUsuario = async (name, password, perfil, bloco, apto, email, photo) => {
    let result = {};

    await axios.post(route.user.add, {
        "name": name,
        "password": password,
        "profile": perfil,
        "bloco": bloco,
        "apto": apto,
        "email": email,
        "photo": photo,
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
export const GetUser = async (id) => {
    let result = {};

    await axios.post(route.user.get_usuario, id)
        .then(response => {
            result = response.data;
        })
        .catch(error => {
            console.error(error);
        });

    return result;
}

export const RegistrarVisitante = async (params) => {
    let result = {};

    await axios.post(route.visitor.registraVisita, params)
        .then(response => {
            result = response.data;
        })
        .catch(error => {
            console.error(error);
        });

    return result;
}