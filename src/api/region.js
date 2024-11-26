import { client } from "@/api/client";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
const getRegion = async () => {
  try {
    const res = await client.get("/lookup/region");
    return res.data;
  } catch (e) {
    console.log(e);
    toast("에러!");
    return [];
  }
};

const getCities = async (regionId) => {
  try {
    const res = await client.get(`/lookup/city?regionId=${regionId}`);
    return res.data;
  } catch (err) {
    console.log(err);
    toast("에러!");
    return [];
  }
};

const getOptions = async () => {
  try {
    const res = await client.get("/lookup/category?type=O");
    return res.data;
  } catch (err) {
    console.log(err);
    toast("에러!");
    return [];
  }
};

const getCategories = async () => {
  try {
    const res = await client.get("/lookup/category?type=C");
    return res.data;
  } catch (err) {
    console.log(err);
    toast("에러!");
    return [];
  }
};

const getActivities = async () => {
  try {
    const res = await client.get("/lookup/category?type=A");
    return res.data;
  } catch (err) {
    console.log(err);
    toast("에러!");
    return [];
  }
};

export { getRegion, getCities, getCategories, getOptions, getActivities };
