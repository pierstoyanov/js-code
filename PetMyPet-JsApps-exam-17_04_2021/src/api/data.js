import * as api from './api.js';

const host = 'http://localhost:3030';
api.settings.host = host;

export const register = api.register;
export const login = api.login;
export const logout = api.logout;

//app requests

export async function getPets() {
    return await api.get(host + `/data/pets?sortBy=_createdOn%20desc`);
}

export async function getItemById(id) {
    return await api.get(host + '/data/pets/' + id);
}

export async function createPet(data) {
    return await api.post(host + '/data/pets', data);
}

export async function editPet(id, data) {
    return await api.put(host + '/data/pets/' + id, data);
}

export async function deleteRecord(id) {
    return await api.del(host + '/data/pets/' + id);
}

export async function getMyPets() {
    const userId = sessionStorage.getItem('userId')
    return await api.get(host + `/data/pets?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`);
}

export async function getLikes(petId) {
    return await api.get(host + `/data/likes?where=petId%3D%22${petId}%22&distinct=_ownerId&count`);
}

export async function likePet(petId) {
    return await api.post(host + `/data/likes`, { petId });
}

export async function cannotLike(petId, userId) {
    if (userId == null) {
        return 1;
    }
    return await api.get(host + `/data/likes?where=petId%3D%22${petId}%22%20and%20_ownerId%3D%22${userId}%22&count`)
}