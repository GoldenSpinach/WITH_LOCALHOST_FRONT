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

export { getCurrentTours };
