function listPosts() {

    var query = 'SELECT *\n' +
        'FROM `post`;';

    return query;

}

function getPost(idpost) {

    var query = 'SELECT *\n' +
        'FROM `post`\n' +
        'WHERE `idpost`= ' + idpost + ';';

    return query;

}

function updatePost(params) {

    // TODO: actual update queries based off params
    // temporary SET
    var query = 'UPDATE `post`\n' +
        'SET `inactive`=0\n' +
        'WHERE `idpost`=' + params.idpost + ';';

    return query;

}

exports.listPosts = listPosts;
exports.getPost = getPost;
exports.updatePost = updatePost;
