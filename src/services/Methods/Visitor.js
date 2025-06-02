import axios from "axios";
import { route } from "../../config/route";


export const getVisitantes = async () => {
    let result = {};

    await axios.post(route.visitor.getVisitantes)
        .then((response) => {
            result = response.data;
        });

    return result;
}

export const getVisitante = async (cpf) => {
    let result = {};

    await axios.post(route.visitor.getVisitante, { cpf: cpf })
        .then((response) => {
            result = response.data;
        });

    return result;
}