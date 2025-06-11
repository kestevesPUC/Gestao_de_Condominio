
export const formatStringDateFromBr = (data) => {
    let nova_data = new Date(data)
    return nova_data.toLocaleString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        hour12: false,
        timeZone: 'America/Sao_Paulo'
    });
}
export const formatStringDateCompleteFromBr = (data) => {
    let nova_data = new Date(data)
    return nova_data.toLocaleString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour12: false,
        timeZone: 'America/Sao_Paulo'
    });
}

export const treatName = (name) => {
    if (name == "" || name == 'undefined' || name == undefined) return "";
    let arrName = name.split(' ');
    return `${arrName[0]} ${arrName[arrName.length - 1]}`;
}

export const treatDateForUsa = (data) => {

    const yyyy = data.getFullYear();
    const mm = String(data.getMonth() + 1).padStart(2, '0'); // Mês começa do 0
    const dd = String(data.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
}

export const formatStringDateTimeCompleteFromBr = (data) => {
    let nova_data = new Date(data)
    return nova_data.toLocaleString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
        timeZone: 'America/Sao_Paulo'
    });
}