import { client } from "@/api/client";

const getReviews = async (memberId) => {
  try {
    const res = await client.get(`/review/${memberId}`);
    return res.data;
  } catch (err) {
    console.log(err);
    return [];
  }
};

// 메소드 수정 필요
const deleteReview = async (reviewId) => {
  try {
    const res = await client.delete(`review/${reviewId}`);
    return res.data;
  } catch (err) {
    console.log(err);
    return [];
  }
};

export { getReviews, deleteReview };
