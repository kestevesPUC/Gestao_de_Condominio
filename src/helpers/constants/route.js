const url = "http://localhost:5020";

export const Route = {
    user: {
        list: `${url}/api/user/list`,
        create: `${url}/api/user/create`,
    },
    vehicle: {
        list: `${url}/api/vehicle/list`,
        create: `${url}/api/vehicle/create`,
    }
}