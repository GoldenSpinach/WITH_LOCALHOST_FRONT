<template>
  <div class="flex flex-col w-[90%]">
    <span class="text-2xl">{{ t("일정") }}</span>
    <div class="w-full border-t my-[15px]"></div>
    <div class="flex w-full justify-between">
      <div
        class="w-[45%] h-[400px] max-h-[500px] flex flex-col gap-[15px] overflow-y-auto"
      >
        <div
          class="px-[20px] py-[15px] border rounded-md flex justify-between"
          v-for="schedule in activitys"
          :key="schedule.id"
        >
          <span>{{ schedule.actName }}</span>
          <img
            class="w-[20px] cursor-pointer"
            src="@/assets/images/trashcan.svg"
            :alt="t('일정 삭제')"
            @click="deleteSchedule(schedule.id)"
          />
        </div>
      </div>
      <div class="w-[45%] flex flex-col gap-[20px]">
        <div class="w-full flex flex-col gap-[10px]">
          <label class="text-xl" for="act-title">{{ t("일정 이름") }}</label>
          <input
            class="border px-[25px] py-[15px]"
            type="text"
            id="act-title"
            v-model="scheduleInfo.actName"
          />
        </div>
        <div class="w-full flex flex-col gap-[10px]">
          <label class="text-xl" for="act-description">{{ t("설명") }}</label>
          <input
            class="border px-[25px] py-[15px]"
            type="text"
            id="act-description"
            v-model="scheduleInfo.actContents"
          />
        </div>
        <div class="flex flex-col w-[90%] relative">
          <label class="text-xl mb-[10px]" for="title">{{
            t("활동 유형")
          }}</label>
          <div class="flex gap-[6px] max-w-[90%] relative">
            <div
              v-if="scheduleInfo.categoryId !== null"
              @click="isOptionSelectorToggled = true"
              class="box-border min-w-[100px] max-w-[200px] h-[30px] max-h-[34px] bg-blue-400 text-white px-3 py-1 rounded-full cursor-pointer text-center whitespace-nowrap overflow-hidden text-ellipsis"
            >
              {{ scheduleInfo.categoryId }}
            </div>
            <img
              v-else
              class="w-[30px] min-w-[30px] cursor-pointer"
              src="@/assets/images/add.svg"
              :alt="t('설정 추가')"
              @click="isOptionSelectorToggled = true"
            />
          </div>
          <ActOptionSelector
            v-if="isOptionSelectorToggled"
            :seletedCategory="scheduleInfo.categoryId"
            :seletedCategoryName="scheduleInfo.categoryName"
            @update:category="updateCategory"
            class="absolute z-50 top-[75px] start-[-95px]"
          />
        </div>
        <div class="w-full flex flex-col gap-[10px]">
          <input
            ref="autocompleteInput"
            type="text"
            :placeholder="t('일정 시작 주소 입력')"
            class="w-full p-2 border rounded"
          />
        </div>
        <div class="w-full flex flex-col gap-[10px]">
          <div class="flex justify-between">
            <label
              class="text-sm cursor-pointer flex items-center"
              for="act-image"
            >
              {{ t("사진 업로드") }}
              <img src="@/assets/images/file.svg" :alt="t('사진 업로드')" />
            </label>
            <input
              class="hidden"
              type="file"
              id="act-image"
              accept="image/*"
              ref="fileInputRef"
              @change="onFileUpload"
            />
            <button
              class="w-1/3 bg-blue-400 rounded-md text-white hover:bg-blue-500 h-[40px]"
              @click="addSchedule"
            >
              {{ t("추가") }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, defineEmits, defineProps } from "vue";
import { Loader } from "@googlemaps/js-api-loader";
import ActOptionSelector from "../actOptionSelector/ActOptionSelector.vue";
import { useI18n } from "vue-i18n";

const props = defineProps({
  activitys: Array,
});
const emit = defineEmits(["update:activitys"]);

const { VITE_GOOGLE_MAP_KEY } = import.meta.env;
const { t } = useI18n(); // 번역 함수 추가
const sid = ref(0); // 새로운 활동의 ID 생성용
const fileInputRef = ref(null);
const isOptionSelectorToggled = ref(false);
const scheduleInfo = ref({
  actName: null,
  actContents: null,
  img: null,
  actAddress: null,
  actLatitude: null,
  actLongitude: null,
  categoryId: null,
});

const addSchedule = () => {
  console.log(scheduleInfo.value);
  if (
    !scheduleInfo.value.actName ||
    !scheduleInfo.value.actContents ||
    !scheduleInfo.value.img ||
    !scheduleInfo.value.actAddress
  ) {
    alert(t("이름, 설명, 사진, 주소는 필수입니다."));
    return;
  }

  // 부모 컴포넌트에 변경된 activitys 배열을 전달
  emit("update:activitys", [
    ...props.activitys,
    {
      id: sid.value++,
      ...scheduleInfo.value,
    },
  ]);

  // 필드 초기화
  fileInputRef.value.value = "";
  scheduleInfo.value = {
    actName: null,
    actContents: null,
    img: null,
    actAddress: null,
    actLatitude: null,
    actLongitude: null,
    categoryId: null,
  };
  autocompleteInput.value.value = "";
};

const onFileUpload = (event) => {
  scheduleInfo.value.img = Array.from(event.target.files)[0];
  console.log(scheduleInfo.value.img);
};

const deleteSchedule = (id) => {
  // 해당 id를 제외한 배열을 부모로 전달
  const updatedActivitys = props.activitys.filter(
    (schedule) => schedule.id !== id
  );
  emit("update:activitys", updatedActivitys);
};

const updateCategory = ({ id, name }) => {
  scheduleInfo.value.categoryId = id;
  scheduleInfo.value.categoryName = name;
  isOptionSelectorToggled.value = false;
};

// Google Places Autocomplete 초기화
const autocompleteInput = ref(null);

onMounted(() => {
  const loader = new Loader({
    apiKey: VITE_GOOGLE_MAP_KEY,
    libraries: ["places"],
  });

  loader.load().then(() => {
    const autocomplete = new google.maps.places.Autocomplete(
      autocompleteInput.value,
      {
        types: ["geocode"],
      }
    );

    autocomplete.addListener("place_changed", () => {
      const place = autocomplete.getPlace();
      if (place && place.formatted_address) {
        // 선택한 주소 정보 업데이트
        scheduleInfo.value.actAddress = place.formatted_address;

        // 위도, 경도 정보가 있으면 업데이트
        if (place.geometry && place.geometry.location) {
          scheduleInfo.value.actLatitude = place.geometry.location.lat();
          scheduleInfo.value.actLongitude = place.geometry.location.lng();
        }
      }
    });
  });
});
</script>

<style lang=""></style>
