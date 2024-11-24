import { client } from "@/api/client";

const getRegion = async () => {
  try {
    const res = await client.get("/lookup/region");
    return res.data;
  } catch (e) {
    console.log(e);
    return [];
  }
};

const getCities = async (regionId) => {
  try {
    const res = await client.get(`/lookup/city?regionId=${regionId}`);
    return res.data;
  } catch (err) {
    console.log(err);
    return [];
  }
};

const getOptions = async () => {
  try {
    const res = await client.get("/lookup/category?type=O");
    return res.data;
  } catch (err) {
    console.log(err);
    return [];
  }
};

const getCategories = async () => {
  try {
    const res = await client.get("/lookup/category?type=C");
    return res.data;
  } catch (err) {
    console.log(err);
    return [];
  }
};

const getActivities = async () => {
  try {
    const res = await client.get("/lookup/category?type=A");
    return res.data;
  } catch (err) {
    console.log(err);
    return [];
  }
};

export { getRegion, getCities, getCategories, getOptions, getActivities };
