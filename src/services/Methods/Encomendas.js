import axios from "axios";
import { route } from "../../config/route";

export const ListarEncomendas = async () => {
    let result = {};

    await axios.post(route.encomendas.listar)
        .then(response => {
            result = response.data;
        })
        .catch(error => {
            console.error(error);
        });

    return result;
}

export const Salvar = async (photo = "") => {
    let result = {};
    
    await axios.post(route.encomendas.salvar, { photo: photo })
        .then(response => {
            result = response.data;
        })
        .catch(error => {
            console.error(error);
        });

    return result;
}
export const AlterarEncomenda = async (id) => {
    let result = {};
    
    await axios.post(route.encomendas.update, { id: id })
        .then(response => {
            result = response.data;
        })
        .catch(error => {
            console.error(error);
        });

    return result;
}