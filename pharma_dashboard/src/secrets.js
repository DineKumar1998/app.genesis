import axios from 'axios'

const Constants  = {
    URL : "http://localhost:3000/",
    fetcher : axios,
    token :  localStorage.getItem('token')
}

export default Constants