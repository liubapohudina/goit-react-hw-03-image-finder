import axios from "axios"; 


export async function fetchData(search, page) {
    const URL = 'https://pixabay.com/api/'
    const API_KEY = "40771201-2278ca32ba7eea467c30dfc24"
         return  await axios.get(`${URL}?q=${search}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`).then(response => response.data)
  
}
