import 'whatwg-fetch'
import qs from 'qs'

function parseJSON(response) {
    return response.json()
}

function checkStatus(response) {

    if (response.status >= 200 && response.status < 300) {
        return response
    }
    // if (response.status) {
    //   return response
    // } 
    const error = new Error(response.statusText)
    error.response = response
    throw error
}

function Salert(info) {
    swal({
        title: info,
        type: 'warning',
        text: "",
        timer: 2000,
    })
}
export default function request(url, options) {
    return fetch(url, options)
        .then(checkStatus)
        .then(parseJSON)
        .then(function(data) {
            return data
        })
        .catch((data) => {
            alert('系统错误')
                // alert(JSON.stringify(data))
        })
}

export function post(url, data, type, token) {
    return request(url, {
        method: 'post',
        headers: {
            // 'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Type': type,
            'Authorization': 'Bearer' + ' ' + token,
        },
        credentials: 'include',
        body: qs.stringify(data)
    })
}

export function post2(url, data, type, token) {
    return request(url, {
        method: 'post',
        headers: {
            // 'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Type': type,
            'Authorization': 'Bearer' + ' ' + token,
        },
        credentials: 'include',
        body: JSON.stringify(data)
    })
}

export function post3(url, data, type, token) {
    return request(url, {
        method: 'post',
        headers: {
            // 'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Type': type,
            'Authorization': 'Bearer' + ' ' + token,
        },
        credentials: 'include',
        body: data
    })
}


export function get(url, data, type, token) {
    return request(`${url}?${qs.stringify(data)}`, {
        method: 'GET',
        headers: {
            // 'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Type': type,
            'Authorization': 'Bearer' + ' ' + token,
        },
        credentials: 'include'
    })
}

export function get2(url, type, token) {
    return request(`${url}`, {
        method: 'GET',
        headers: {
            // 'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Type': type,
            'Authorization': 'Bearer' + ' ' + token,
        },
        credentials: 'include'
    })
}

export function put(url, data, type, token) {
    console.log(data);
    return request(url, {
        method: 'PUT',
        headers: {
            // 'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Type': type,
            'Authorization': 'Bearer' + ' ' + token,
        },
        credentials: 'include',
        body: JSON.stringify(data)
    })
}

export function Delete(url, data, type, token) {
    console.log(data);
    return request(url, {
        method: 'DELETE',
        headers: {
            // 'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Type': type,
            'Authorization': 'Bearer' + ' ' + token,
        },
        credentials: 'include',
        body: JSON.stringify(data)
    })
}

export function patch(url, data, type, token) {
    console.log(data);
    return request(url, {
        method: 'PATCH',
        headers: {
            'Content-Type': type,
            'Authorization': 'Bearer' + ' ' + token,
        },
        credentials: 'include',
        body: JSON.stringify(data)
    })
}