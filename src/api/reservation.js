import { accessClient } from "@/api/client";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
const getGuestReservations = async (guestId) => {
  try {
    const res = await accessClient.get(`/reservation/guestList`);
    return res.data;
  } catch (err) {
    console.log(err);
    toast("에러!");
    return [];
  }
};

const getHostReservations = async (hostId) => {
  try {
    const res = await accessClient.get(`/reservation/guidList`);
    return res.data;
  } catch (err) {
    console.log(err);
    toast("에러!");
    return [];
  }
};

const determineReservation = async (reservationId, type) => {
  try {
    const res = await accessClient.put(`/reservation/modify`, {
      reservationId,
      reservation_type: type,
    });
    return res.data;
  } catch (err) {
    console.log(err);
    toast("에러!");
    return [];
  }
};

const getWaitings = async (guideId) => {
  try {
    const res = await accessClient.get(`/reservation/guidList`);
    return res.data;
  } catch (err) {
    toast("에러!");
    return [];
  }
};

const confirmReservation = async (reservationId, type) => {
  try {
    const res = await accessClient.put(`/reservation/modify`, {
      reservationId,
      reservationStatus: type,
    });
    return res.data;
  } catch (err) {
    console.log(err);
    toast("에러!");
    return null;
  }
};

const makeReservation = async (info) => {
  try {
    const res = await accessClient.post(`/reservation/makeReservation`, info);
    return res.data;
  } catch (err) {
    console.log(err);
    toast("에러!");
    return null;
  }
};

export {
  getGuestReservations,
  getHostReservations,
  determineReservation,
  getWaitings,
  confirmReservation,
  makeReservation,
};
