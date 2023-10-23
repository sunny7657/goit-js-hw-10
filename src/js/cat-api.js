import axios from 'axios';

function fetchBreeds() {
  return axios.get(`/breeds`).then(response => {
    return response.data;
  });
}

function fetchCatByBreed(breedId) {
  return axios.get(`/images/search?breed_ids=${breedId}`).then(response => {
    return response.data;
  });
}

export { fetchBreeds, fetchCatByBreed };
