function listUsers() {

    var query = 'SELECT *\n' +
        'FROM `user`;';

    return query;

}

function getUser(iduser) {

    var query = 'SELECT *\n' +
        'FROM `user`\n' +
        'WHERE `iduser`= ' + iduser + ';';

    return query;

}

function updateUser(params) {

    // TODO: actual update queries based off params
    // temporary SET
    var query = 'UPDATE `user`\n' +
        'SET `inactive`=0\n' +
        'WHERE `iduser`=' + params.iduser + ';';

    return query;

}

exports.listUsers = listUsers;
exports.getUser = getUser;
exports.updateUser = updateUser;
