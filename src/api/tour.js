import { client, accessClient } from "@/api/client";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

const getCurrentTours = async () => {
  try {
    const res = await client.get("/tour/recentlist");
    return res.data;
  } catch (err) {
    console.log(err);
    toast("에러!");
    return [];
  }
};

const getTours = async () => {
  try {
    const res = await client.get("/tour/list");
    return res.data;
  } catch (err) {
    console.log(err);
    toast("에러!");
    return [];
  }
};

const getConditionTours = async (condition) => {
  try {
    const res = await client.post("/tour/search", condition);
    return res.data;
  } catch (err) {
    console.log(err);
    toast("에러!");
    return [];
  }
};

const getTourDetail = async (id) => {
  try {
    const res = await client.get(`/tour/${id}`);
    return res.data;
  } catch (err) {
    console.log(err);
    toast("에러!");
    return {};
  }
};

const getMyTours = async (id) => {
  try {
    const res = await accessClient.get(`/tour/mytour`);
    return res.data;
  } catch (err) {
    console.log(err);
    toast("에러!");
    return [];
  }
};

const addTour = async (tour) => {
  try {
    const res = await accessClient.post("/tour/create", tour, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data;
  } catch (err) {
    console.log(err);
    toast("에러!");
    return {};
  }
};
export { getCurrentTours, getTours, getConditionTours, getTourDetail, getMyTours, addTour };
