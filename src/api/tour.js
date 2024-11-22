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
export { getCurrentTours, getTours, getConditionTours };
