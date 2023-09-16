import axios from "axios";
import { fakeDataApi } from "@/helper/FakeApi";
import { getTextCards } from "@/helper/helpFunc";

export function fetchPosts() {
  const url = "https://bandaumnikov.ru/api/test/site/get-index";

  return axios
    .get(url)
    .then((response) => {
      return response?.data?.data;
    })
    .catch((error) => {
      console.log("error", error);
      return fakeDataApi;
    })
    .then((posts) => {
      getTextCards(posts);
      return posts;
    });
}
