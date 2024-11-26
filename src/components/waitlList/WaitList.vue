<template>
  <div class="w-full">
    <span class="text-xl">
      {{ t("투어_대기_문구", { count: filteredWatings.length }) }}
    </span>
    <div class="w-full h-[calc(100%-25px)] overflow-y-auto">
      <div v-for="guest in filteredWatings" :key="guest.reservationId"
        class="w-full border flex justify-between px-[15px] py-[10px]">
        <div class="flex flex-col text-lg gap-[15px]">
          <span>{{ guest.reservater }}</span>
          <span>
            {{ new Date(guest.startDate).toISOString().split("T")[0] }} ~
            {{ new Date(guest.endDate).toISOString().split("T")[0] }}
          </span>
        </div>
        <div class="flex items-end gap-[15px]">
          <button @click="clickAccept(guest.reservationId)">
            {{ t("승인") }}
          </button>
          <button @click="clickReject(guest.reservationId)">
            {{ t("취소") }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref, watch } from "vue";
import { getWaitings, confirmReservation } from "@/api/reservation";
import { useI18n } from "vue-i18n";
import { useMemberStore } from "../../stores/member";

const { t } = useI18n();

const props = defineProps({
  tourId: String,
});

const waitings = ref([]);
const filteredWatings = ref([]);
const memberStore = useMemberStore();

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
  const id = memberStore.memberId;
  waitings.value = await getWaitings(id);
});

const clickAccept = async (reservationId) => {
  const id = memberStore.memberId;
  console.log(reservationId);
  const res = await confirmReservation(reservationId, "A");
  waitings.value = await getWaitings(id);
};
const clickReject = async (reservationId) => {
  const id = memberStore.memberId;
  const res = await confirmReservation(reservationId, "C");
  waitings.value = await getWaitings(id);
};
</script>

<style></style>
