function listCommunities() {

    var query = 'SELECT *\n' +
        'FROM `community`;';

    return query;

}

function getCommunity(idcommunity) {

    var query = 'SELECT *\n' +
        'FROM `community`\n' +
        'WHERE `idcommunity`= ' + idcommunity + ';';

    return query;

}

function updateCommunity(params) {

    // TODO: actual update queries based off params
    // temporary SET
    var query = 'UPDATE `community`\n' +
        'SET `inactive`=0\n' +
        'WHERE `idcommunity`=' + params.idcommunity + ';';

    return query;

}

exports.listCommunities = listCommunities;
exports.getCommunity = getCommunity;
exports.updateCommunity = updateCommunity;
