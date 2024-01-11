import axios from "axios"; 


export async function fetchData(search, page) {
    const headers = {"Authorization": "NJHMpyMaFFn1TrhMJgKDGrXpLjas04X3naVyLDxNFp1blRcXKAuQOFTq" }
   // const API_KEY = 'NJHMpyMaFFn1TrhMJgKDGrXpLjas04X3naVyLDxNFp1blRcXKAuQOFTq';
    return await axios.get(`https://api.pexels.com/v1/search?query=${search}&page=${page}&per_page=12`, {headers}).then(response => response.data)
    // const URL = 'https://pixabay.com/api/'
    // const API_KEY = "40771201-2278ca32ba7eea467c30dfc24"
    //return  await axios.get(`${URL}?q=${search}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`).then(response => response.data)
  
}

export function setLocalStorage(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}





