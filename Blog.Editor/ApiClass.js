const fetch = require('node-fetch');

class Api {
    async getPostById(id){
        var response = await fetch(`http://localhost:3080/api/getPostById/${id}`)
        var res =  await response.json();
        return res;
    }
    async getAllPosts(){
        var response = await fetch('http://localhost:3080/api/getAllPosts')
        var res = await response.json();
        return res;
    }
}

module.exports = Api