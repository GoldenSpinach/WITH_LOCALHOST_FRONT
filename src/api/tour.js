import { client } from "@/api/client";

const getCurrentTours = async () => {
  try {
    const res = await client.get("/tour/recentlist");
    return res.data;
  } catch (err) {
    console.log(err);
    return [];
  }
};

const getTours = async () => {
  try {
    const res = await client.get("/tour/list");
    return res.data;
  } catch (err) {
    console.log(err);
    return [];
  }
};

const getConditionTours = async (condition) => {
  try {
    const res = await client.post("/tour/search", condition);
    return res.data;
  } catch (err) {
    console.log(err);
    return [];
  }
};

const getTourDetail = async (id) => {
  try {
    const res = await client.get(`/tour/${id}`);
    return res.data;
  } catch (err) {
    console.log(err);
    return {};
  }
};

const getMyTours = async (id) => {
  try {
    const res = await client.get(`/tour/mytour?userId=${id}`);
    return res.data;
  } catch (err) {
    console.log(err);
    return [];
  }
};
export {
  getCurrentTours,
  getTours,
  getConditionTours,
  getTourDetail,
  getMyTours,
};
