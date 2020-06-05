import Axios from "axios";

const baseUrl = 'http://localhost:3001/persons';

const getAll = () => {
    const request = Axios
        .get(baseUrl);
    return request.then(response => response.data);
}

const update = (newContact) => {
    const request = Axios.post(baseUrl, newContact);
    return request.then(response => response.data);
}

/* delete is a reserved word in JS */
const remove = (id) => {
    console.log(id);
   Axios
       .delete(`http://localhost:3001/persons/${id}`);
}

export default {
    getAll: getAll,
    update: update,
    remove: remove
}