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

export { getRegion };
