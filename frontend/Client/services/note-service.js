'use strict';


// package references


import * as axios from 'axios';


// db options


const baseApiUrl = 'http://localhost:3000/api';


// add note

const addNote = (seed, name, location) => {

    return new Promise((resolve, reject) => {
        axios
            .post(`${baseApiUrl}/product/give`, {
                'seed': seed,
                'product': {
                    'name': name,
                    'location': location
                }})
            .then((result) => {
                resolve(result.data);
            })
            .catch(error => {
                console.log(error);
                reject(error.message);
            });

    });

};


// find notes


const findNote = (id) => {

    return new Promise((resolve, reject) => {
        axios
            .get(`${baseApiUrl}/notes/${id}`)
            .then(response => {
                resolve(response.data);
                return;
            })
            .catch(error => {
                reject(error.message);
                return;
            });
    });

};


const findNotesByTitle = (title) => {

    return new Promise((resolve, reject) => {
        axios
            .get(`${baseApiUrl}/notes?title=${title}`)
            .then(response => {
                resolve(response.data);
                return;
            })
            .catch(error => {
                reject(error.message);
                return;
            });
    });

};

const listNotes = (seed) => {

    return new Promise((resolve, reject) => {
        axios
            .get(`${baseApiUrl}/products/user/${seed}`)
            .then(response => {
                resolve(response.data);
                return;
            })
            .catch(error => {
                reject(error.message);
                return;
            });
    });

};


// remove note


const removeNote = (id) => {

    return new Promise((resolve, reject) => {
        axios
            .delete(`${baseApiUrl}/notes/${id}`)
            .then(() => {
                resolve();
                return;
            })
            .catch(error => {
                reject(error.message);
                return;
            });
    });

};


// update note


const updateNote = (note) => {
    return new Promise((resolve, reject) => {
        axios
            .put(`${baseApiUrl}/notes`, {note})
            .then(() => {
                resolve();
                return;
            })
            .catch(error => {
                reject(error.message);
                return;
            });
    });

};


// exports


module.exports = {
    'addNote': addNote,
    'findNote': findNote,
    'findNotesByTitle': findNotesByTitle,
    'listNotes': listNotes,
    'removeNote': removeNote,
    'updateNote': updateNote
};
