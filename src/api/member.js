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
    const res = await client.post(`review/delete?reviewId=${reviewId}`);
    return res.data;
  } catch (err) {
    console.log(err);
    return [];
  }
};

const updateReview = async (reservator) => {
  try {
    const res = await client.post(`review/modify`, {
      ...reservator,
    });
    return res.data;
  } catch (err) {
    console.log(err);
    return [];
  }
};

export { getReviews, deleteReview, updateReview };
