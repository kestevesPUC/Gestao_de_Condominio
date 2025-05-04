const url = "http://10.0.2.2:5020";

export const route = {
    user: {
        listar_usuarios: `${url}/api/user/list-all`,
        add: `${url}/api/user/create`
    },
    vehicle: {
        listar_vehicles: `${url}/api/vehicle/list-all`
    },
    called: {
        listar_chamados: `${url}/api/called/list-all`
    }
    
}