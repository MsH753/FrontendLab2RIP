
const urlf = "https://swapi.dev/api/"
async function sendRequest(metod, url, body=undefined){
    const headers = {
        'Content-Type': 'application/json',
    }
    const respons = fetch(url, {
        metod: metod,
        headers: headers,
        body: JSON.stringify(body)
      }); 
      return await respons.json(); 
    }

async function getAll(){
    const url = urlf+"people/"
    try{
        const data = await sendRequest("GET", url)
        console.log(data);
    }catch(error){
        console.log(error)
    }
}
export default getAll;