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
export const GetAreas = async () => {
    let result = {};

    await axios.post(route.administracao.areas)
        .then(response => {
            result = response.data;
        })
        .catch(error => {
            console.error(error);
        });

    return result;
}
export const ReservarArea = async (data) => {
    let result = {};

    await axios.post(route.administracao.reservarAreas, data)
        .then(response => {
            result = response.data;
        })
        .catch(error => {
            console.error(error);
        });

    return result;
}
export const GetReservas = async () => {
    let result = {};

    await axios.post(route.administracao.getResevas)
        .then(response => {
            result = response.data;
        })
        .catch(error => {
            console.error(error);
        });

    return result;
}
export const UploadImages = async (formData) => {
    let result = {};

    await axios.post(
        route.administracao.upload, 
        formData,
        {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        }
    );

    return result;
}