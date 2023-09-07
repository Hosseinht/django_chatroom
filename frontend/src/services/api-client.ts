import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
});

class APIClient<T> {
  endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  getAllServers = () => {
    return axiosInstance.get<T>(this.endpoint).then((res) => res.data);
  };



  // get = (id: number | string) => {
  //     return axiosInstance
  //         .get<T>(this.endpoint + "/" + id)
  //         .then((res) => res.data);
  // };
}

export default APIClient;
