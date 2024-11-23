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
          <button>승인</button>
          <button>취소</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { computed, onMounted, ref, watch } from "vue";
import { getWaitings } from "@/api/reservation";

const props = defineProps({
  tourId: String,
});

const waitings = ref([]);
const filteredWatings = ref([]);

watch(
  () => props.tourId,
  () => {
    console.log(props.tourId);
    filteredWatings.value = waitings.value.filter(
      (guest) => guest.tourId === props.tourId
    );
  },
  { immediate: true }
);

onMounted(async () => {
  const id = "minji123";
  waitings.value = await getWaitings(id);
});
</script>
<style></style>
