import Axios from "axios";

const baseUrl = 'http://localhost:3001/persons';

const getAll = () => {
    const request = Axios
        .get(baseUrl);
    return request.then(response => response.data);
}

const update = (newContact) => {
    const request = Axios.post(baseUrl, newContact);
    return request.then(respone => respone.data);
}

export default {
    getAll: getAll,
    update: update
}