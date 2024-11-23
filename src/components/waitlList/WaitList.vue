<template>
  <div class="w-full">
    <span class="text-xl"
      >{{ filteredWatings.length }}명의 사람들이 투어를 기다리고 있어요!</span
    >
    <div class="w-full h-[calc(100%-25px)] overflow-y-auto">
      <div
        v-for="guest in filteredWatings"
        :key="guest.reservationId"
        class="w-full border flex justify-between px-[15px] py-[10px]"
      >
        <div class="flex flex-col text-lg gap-[15px]">
          <span>
            {{ guest.reservater }}
          </span>
          <span
            >{{ new Date(guest.startDate).toISOString().split("T")[0] }} ~
            {{ new Date(guest.endDate).toISOString().split("T")[0] }}</span
          >
        </div>
        <div class="flex items-end gap-[15px]">
          <button @click="clickAccept(guest.reservationId)">승인</button>
          <button @click="clickReject(guest.reservationId)">취소</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { computed, onMounted, ref, watch } from "vue";
import { getWaitings, confirmReservation } from "@/api/reservation";

const props = defineProps({
  tourId: String,
});

const waitings = ref([]);
const filteredWatings = ref([]);

const updateFilteredWaitings = () => {
  filteredWatings.value = waitings.value.filter(
    (guest) => guest.tourId === props.tourId && guest.reservationStatus === "P"
  );
};

// Props나 waitings가 변경될 때마다 자동으로 filteredWatings를 업데이트
watch([() => props.tourId, () => waitings.value], updateFilteredWaitings, {
  immediate: true,
});

onMounted(async () => {
  const id = "minji123";
  waitings.value = await getWaitings(id);
});

const clickAccept = async (reservationId) => {
  const id = "minji123";
  console.log(reservationId);
  const res = await confirmReservation(reservationId, "A");
  waitings.value = await getWaitings(id);
};
const clickReject = async (reservationId) => {
  const id = "minji123";
  const res = await confirmReservation(reservationId, "C");
  waitings.value = await getWaitings(id);
};
</script>
<style></style>
