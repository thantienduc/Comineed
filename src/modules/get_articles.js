import axios from 'axios';

class GetArticles {
    static get_location(text) {
        axios.post('http://localhost:2204/', text, {
        headers: {'Content-Type': 'raw'}})
        .then(function (response) {
            response.data = response.data.slice(response.data.indexOf("{"))
            var obj = JSON.parse(`${response.data}`);
            var result = ((obj.cities[0]===undefined)?'':(obj.cities[0]+' '))+((obj.countries[0]===undefined)?'':obj.countries[0]);
            //console.log(result);
            return result;
        })
        .catch(function (error) {
            console.log(error.response);
        });
    }

    static async get_articles() {
        await axios.get('https://newsapi.org/v2/everything?q=natural+disaster+victims&apiKey=8281d920a6634e01a0e2a16c75d1fb8f')
        .then((response) => {
            console.log(response.data.articles)
            return response.data.articles;        
        }).catch((error)=>{
            return error.response;
        })

    }
}

export default GetArticles