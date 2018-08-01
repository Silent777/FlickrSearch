import axios from 'axios';

const imageSearchGet = (query, page) => {
    const per_page = 55
    const apiKey = '6b3575d10435de5f010fc941f5eff94a'
    let url = `https://api.flickr.com/services/rest/?method=flickr.photos.search&
                api_key=${apiKey}&
                tags=${query}&
                per_page=${per_page}&
                format=json&
                nojsoncallback=1&
                page=${page}`;
    return axios.get(url)
}

export { imageSearchGet }