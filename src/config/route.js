const url = "http://10.0.2.2:5020";

export const route = {
    auth: `${url}/api/auth`,
    user: {
        listar_usuarios: `${url}/api/user/list-all`,
        add: `${url}/api/user/create`,
        listar_tipos_usuario: `${url}/api/user/list-type-users`
    },
    vehicle: {
        listar_vehicles: `${url}/api/vehicle/list-all`
    },
    called: {
        listar_chamados: `${url}/api/called/list-all`,
        create: `${url}/api/called/create`,
        ocurrences: `${url}/api/called/list-all-ocurrence`,
        iniciar: `${url}/api/called/start`,
    },
    administracao: {
        perfis: `${url}/api/administracao/list-all`,
        addPerfil: `${url}/api/administracao/add-perfil`,
    }
    
    
}