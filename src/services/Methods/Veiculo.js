import axios from "axios";
import { route } from "../../config/route";

export const RecuperaInfoVeiculo = async () => {
    let result = {};

    await axios.post(route.vehicle.infos)
        .then(response => {
            result = response.data;
        })
        .catch(error => {
            console.error(error);
        });

    return result;
}
export const CadastrarVeiculo = async (params) => {
    let result = {};

    await axios.post(route.vehicle.create, params)
        .then(response => {
            result = response.data;
        })
        .catch(error => {
            console.error(error);
        });

    return result;
}