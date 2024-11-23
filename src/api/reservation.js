import { client } from "@/api/client";

const getGuestReservations = async (guestId) => {
  try {
    const res = await client.get(`/reservation/guestList?guestId=${guestId}`);
    return res.data;
  } catch (err) {
    console.log(err);
    return [];
  }
};

const getHostReservations = async (hostId) => {
  try {
    const res = await client.get(`/reservation/guidList/${hostId}`);
    return res.data;
  } catch (err) {
    console.log(err);
    return [];
  }
};

const determineReservation = async (reservationId, type) => {
  try {
    const res = await client.put(`/reservation/modify`, {
      reservationId,
      reservation_type: type,
    });
    return res.data;
  } catch (err) {
    console.log(err);
    return [];
  }
};

const getWaitings = async (guideId) => {
  try {
    const res = await client.get(`/reservation/guidList?guidId=${guideId}`);
    return res.data;
  } catch (err) {
    return [];
  }
};

const confirmReservation = async (reservationId, type) => {
  try {
    const res = await client.put(`/reservation/modify`, {
      reservationId,
      reservationStatus: type,
    });
    return res.data;
  } catch (err) {
    console.log(err);
    return null;
  }
};

export {
  getGuestReservations,
  getHostReservations,
  determineReservation,
  getWaitings,
  confirmReservation,
};
