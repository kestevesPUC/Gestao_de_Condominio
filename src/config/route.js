const url = "http://10.0.2.2:5020";

export const route = {
    auth: `${url}/api/auth`,
    user: {
        listar_usuarios: `${url}/api/user/list-all`,
        listar_funcionarios: `${url}/api/user/list-all-employee`,
        add: `${url}/api/user/create`,
        listar_tipos_usuario: `${url}/api/user/list-type-users`,
        get_usuario: `${url}/api/user/get-user`,
    },
    visitor: {
        registraVisita: `${url}/api/visitor/registra-visita`,
        getVisitante: `${url}/api/visitor/recupera-visitante`,
        getVisitantes: `${url}/api/visitor/recupera-visitantes`,
    },
    vehicle: {
        listar_vehicles: `${url}/api/vehicle/list-all`,
        infos: `${url}/api/vehicle/infos`,
        create: `${url}/api/vehicle/create2`,
    },
    called: {
        listar_chamados: `${url}/api/called/list-all`,
        create: `${url}/api/called/create`,
        ocurrences: `${url}/api/called/list-all-ocurrence`,
        iniciar: `${url}/api/called/start`,
        status: `${url}/api/called/status`,
        atualizar: `${url}/api/called/atualizar`,
    },
    administracao: {
        perfis: `${url}/api/administracao/list-all`,
        addPerfil: `${url}/api/administracao/add-perfil`,
        areas: `${url}/api/administracao/areas`,
        reservarAreas: `${url}/api/administracao/reserva-areas`,
        getResevas: `${url}/api/administracao/recupera-reservas`,
        upload: `${url}/api/administracao/upload`,
    },
    comunicados: {
        listar:  `${url}/api/comunicados/list-all`,
    }
    
    
}