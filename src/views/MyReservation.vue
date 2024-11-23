<template>
  <div class="w-full h-full box-border pt-[25px]">
    <h1 class="text-4xl">예약 내역</h1>
    <div class="border w-full my-[15px]"></div>
    <div class="w-full h-[505px] overflow-y-auto">
      <div class="flex flex-col gap-[15px]">
        <template
          v-for="reservation in reservationHistories"
          :key="reservation.reservationId"
        >
          <Reservation :reservation />
        </template>
      </div>
    </div>
  </div>
</template>
<script setup>
import { computed, onMounted, ref } from "vue";
import Reservation from "@/components/reservation/Reservation.vue";
import { getGuestReservations } from "@/api/reservation";
import { getReviews, deleteReview } from "@/api/member";

const reservations = ref([]);
const reviews = ref([]);

const reservationHistories = computed(() => {
  return reservations.value.map((reservation) => {
    return {
      ...reservation,
      myReview: reviews.value.filter(
        (review) => review.reservationId === reservation.reservationId
      )[0],
    };
  });
});

onMounted(async () => {
  const memberId = "minji123";
  reservations.value = await getGuestReservations(memberId);
  reviews.value = await getReviews(memberId);
});
</script>
<style></style>
