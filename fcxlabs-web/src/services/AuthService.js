const API_PATH = `${process.env.REACT_APP_API_KEY}/Auth`

const headers = new Headers();
headers.append('Accept', 'application/json')
headers.append('Content-type', 'application/json')


export function login(username, password) {
    const authRequest = { username, password }
    return fetch(`${API_PATH}/login`, { method: 'POST', body: JSON.stringify(authRequest), headers: headers })
}

export function signup(userRequest) {
    return fetch(`${API_PATH}/signup`, { method: 'POST', body: JSON.stringify(userRequest), headers: headers })
}

export async function validToken(token) {
    headers.append('Authorization', token)
    return fetch(`${API_PATH}/valid-token`, { method: 'GET', headers: headers })
        .then(response => response.status !== 200)
}