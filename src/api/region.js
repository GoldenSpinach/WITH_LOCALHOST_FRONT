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

export { getRegion, getCities };
