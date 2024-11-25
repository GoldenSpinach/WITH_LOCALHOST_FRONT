import { client, accessClient } from "@/api/client";
import { TrackOpTypes } from "vue";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
const getReviews = async (memberId) => {
  try {
    const res = await accessClient.get(`/review/${memberId}`);
    return res.data;
  } catch (err) {
    console.log(err);
    toast("에러!");
    return [];
  }
};

// 메소드 수정 필요
const deleteReview = async (reviewId) => {
  try {
    const res = await accessClient.post(`review/delete?reviewId=${reviewId}`);
    return res.data;
  } catch (err) {
    console.log(err);
    toast("에러!");
    return [];
  }
};

const updateReview = async (reservator) => {
  try {
    const res = await accessClient.post(`review/modify`, {
      ...reservator,
    });
    return res.data;
  } catch (err) {
    console.log(err);
    toast("에러!");
    return [];
  }
};

const join = async (info, id) => {
  try {
    const res = await accessClient.post("/user/join", {
      ...info,
      userId: id,
    });
    return res.data;
  } catch (err) {
    console.log(err);
    toast("에러!");
    return {};
  }
};

const getMe = async () => {
  try {
    const res = await accessClient.get("/user/info");
    return res.data;
  } catch (err) {
    console.log(err);
    toast("에러!");
    return {};
  }
};
const logout = async () => {
  try {
    const res = await accessClient.post("/user/logout");
    return res.data;
  } catch (err) {
    console.log(err);
    toast("에러!");
    return {};
  }
};
export { getReviews, deleteReview, updateReview, join, getMe, logout };
