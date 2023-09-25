const API_PATH = `${process.env.REACT_APP_API_KEY}/api/user`

const headers = new Headers();
headers.append('Accept', 'application/json')
headers.append('Content-type', 'application/json')
headers.append('Authorization', localStorage.getItem('fcxlabs-token'))


export function getAllByFilter(filter) {
    return fetch(`${API_PATH}/get-all-by-filter?${filter}`, { method: 'GET', headers: headers })
}

export function createUser(userRequest) {
    return fetch(`${API_PATH}`, { method: 'POST', body: JSON.stringify(userRequest), headers: headers })
}

export function updateById(id, userRequest) {
    return fetch(`${API_PATH}?id=${id}`, { method: 'PUT', body: JSON.stringify(userRequest), headers: headers })
}

export function inactiveUserById(id) {
    return fetch(`${API_PATH}?id=${id}`, { method: 'DELETE', headers: headers })
}

export function blockerById(id) {
    return fetch(`${API_PATH}/blocker-by-id?id=${id}`, { method: 'PATCH', headers: headers })
}