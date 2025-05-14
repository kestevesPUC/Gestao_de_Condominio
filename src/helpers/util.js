
export const formatStringDateFromBr = (data) => {
    let nova_data = new Date(data)
    return nova_data.toLocaleString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
        timeZone: 'America/Sao_Paulo'
    });
}

export const treatName = (name) => {
    let arrName = name.split(' ');
    return `${arrName[0]} ${arrName[arrName.length - 1]}`;
}