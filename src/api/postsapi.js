import axios from "axios";

export default axios.create({

    /* Change this according to URL in production */
    baseURL: "http://localhost:3500"
})