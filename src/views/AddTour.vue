<template>
  <div class="w-full h-[calc(100vh-101px)] flex justify-center items-center">
    <div class="border-t"></div>
    <section
      class="w-5/6 h-[700px] max-w-[1160px] border rounded-lg box-border p-[25px] self-center"
    >
      <div class="flex w-full h-full pt-[45px] box-border">
        <div class="w-1/4 flex flex-col items-end gap-[15px] pe-[15px] text-xl">
          <div class="p-[5px] hover:bg-blue-200 cursor-pointer rounded-md">
            제목
          </div>
          <div class="p-[5px] hover:bg-blue-200 cursor-pointer rounded-md">
            카테고리
          </div>
          <div class="p-[5px] hover:bg-blue-200 cursor-pointer rounded-md">
            옵션
          </div>
          <div class="p-[5px] hover:bg-blue-200 cursor-pointer rounded-md">
            가격
          </div>
          <div class="p-[5px] hover:bg-blue-200 cursor-pointer rounded-md">
            일정
          </div>
          <div class="p-[5px] hover:bg-blue-200 cursor-pointer rounded-md">
            설명
          </div>
          <div class="p-[5px] hover:bg-blue-200 cursor-pointer rounded-md">
            유의사항
          </div>
          <button
            class="block w-2/3 bg-blue-400 rounded-md text-white hover:bg-blue-500 text-2xl"
            @click="clickAdd"
          >
            패키지 등록
          </button>
        </div>
        <div class="h-full border-s me-[25px]"></div>
        <div class="w-3/4 h-full box-border">
          <section
            class="flex flex-col items-center h-full overflow-y-auto gap-[15px] w-full max-w-[100%]"
          >
            <div class="flex flex-col w-[90%]">
              <label class="text-2xl mb-[10px]" for="title">제목</label>
              <input
                class="border px-[25px] py-[15px] rounded-md"
                type="text"
                v-model="info.title"
              />
            </div>
            <div class="flex flex-col w-[90%] relative">
              <label class="text-2xl mb-[10px]" for="title"
                >편의 & 활동유형</label
              >
              <div class="flex gap-[6px] max-w-[90%]">
                <div
                  class="flex gap-[6px] max-w-[90%] relative overflow-hidden"
                >
                  <div
                    v-for="option in optionStore.selectedOptions"
                    :key="option.id"
                    @click="optionStore.deleteOption(option.id)"
                    class="box-border min-w-[100px] max-w-[200px] h-[30px] max-h-[34px] bg-blue-400 text-white px-3 py-1 rounded-full cursor-pointer text-center whitespace-nowrap overflow-hidden text-ellipsis"
                  >
                    {{ option.name }}
                  </div>
                </div>
                <img
                  class="w-[30px] min-w-[30px] cursor-pointer"
                  src=" @/assets/images/add.svg"
                  alt="설정추가"
                  @click="isOptionSelectorToggled = true"
                />
              </div>
              <TourOptionSelector
                v-if="isOptionSelectorToggled"
                class="absolute z-50 top-[75px] start-[15px]"
              />
            </div>
            <div class="flex flex-col w-[90%]">
              <label class="text-2xl mb-[10px]" for="title">가격</label>
              <input
                class="border px-[5px] py-[15px] rounded-md"
                type="number"
                v-model="info.pay"
              />
            </div>
            <ScheduleEditor v-model:activitys="info.activitys" />
            <div class="flex flex-col w-[90%]">
              <label class="text-2xl mb-[10px]" for="title">소요 시간</label>
              <input
                class="border px-[5px] py-[15px] rounded-md"
                type="number"
                v-model="info.needDate"
              />
            </div>
            <div class="flex flex-col w-[90%]">
              <label class="text-2xl mb-[10px]" for="title">패키지 설명</label>
              <input
                class="border px-[25px] py-[15px] rounded-md"
                type="text"
                v-model="info.tourContent"
              />
            </div>
            <div class="flex flex-col w-[90%]">
              <label class="text-2xl mb-[10px]" for="title">유의사항</label>
              <input
                class="border px-[25px] py-[15px] rounded-md"
                type="text"
                v-model="info.notice"
              />
            </div>
            <div class="flex flex-col w-[90%] relative">
              <label class="text-2xl mb-[10px]" for="title">가이드 지역</label>
              <div class="flex gap-[6px] max-w-[90%]">
                <div
                  class="flex gap-[6px] max-w-[90%] relative overflow-hidden"
                >
                  <div
                    v-for="city in optionStore.cities"
                    :key="city.id"
                    @click="optionStore.deleteCity(city.id)"
                    class="box-border min-w-[100px] max-w-[200px] h-[30px] max-h-[34px] bg-blue-400 text-white px-3 py-1 rounded-full cursor-pointer text-center whitespace-nowrap overflow-hidden text-ellipsis"
                  >
                    {{ city.name }}
                  </div>
                </div>
                <img
                  class="w-[30px] min-w-[30px] cursor-pointer"
                  src=" @/assets/images/add.svg"
                  alt="지역추가"
                  @click="isAreaSelectorToggled = !isAreaSelectorToggled"
                />
              </div>
              <TourAreaSelector
                v-if="isAreaSelectorToggled"
                class="absolute z-50 top-[75px] start-[15px]"
              />
            </div>
            <div class="flex flex-col w-[90%]">
              <label class="text-2xl mb-[10px]" for="title">시작지점</label>
              <input
                ref="autocompleteInput"
                type="text"
                placeholder="시작지점을 입력해주세요(이곳이 검색기준이 됩니다)"
                class="w-full p-2 border rounded"
              />
            </div>
            <div class="flex flex-col w-[90%]">
              <label
                class="text-2xl cursor-pointer flex items-center"
                for="tour-image"
                >대표 이미지(클릭)
                <img src="@/assets/images/file.svg" alt="사진업로드"
              /></label>
              <input
                class="hidden"
                type="file"
                id="tour-image"
                accept="image/*"
                @change="onFileUpload"
              />
            </div>
          </section>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, watch, onMounted, onUnmounted } from "vue";
import ScheduleEditor from "@/components/scheduleEditor/ScheduleEditor.vue";
import TourOptionSelector from "@/components/tourOptionSelector/TourOptionSelector.vue";
import { useTourOptionStore } from "@/stores/tourOptionStore";
import { Loader } from "@googlemaps/js-api-loader";
import TourAreaSelector from "@/components/tourAreaSelector/TourAreaSelector.vue";
import { addTour } from "../api/tour";
const { VITE_GOOGLE_MAP_KEY } = import.meta.env;
const isOptionSelectorToggled = ref(false);
const isAreaSelectorToggled = ref(false);
const optionStore = useTourOptionStore();
const info = ref({
  title: null,
  categorys: [],
  options: [],
  pay: null,
  activitys: [],
  tourContent: null,
  notice: null,
  meetLatitude: null,
  meetLongitude: null,
  meetAddress: null,
  mainImg: null,
  regionId: null,
  cityId: null,
  needDate: 0,
});

/**
 * 가이드네임
 * 투어
 * - 타이틀/peoplecnt(1)/가격/유의사항/meetadd, lat, lng/이미지/cityId, regionId, needDate, tourContent
 *
 * 옵션
 * - 카테고리 id
 *
 * 카테고리
 * - 카테고리 id
 *
 * act
 * - categoryId, actname, actcontent, actadd, lat, lng, img,
 *
 */

const handleClickOutside = (event) => {
  const target = event.target;
  if (target.closest(".relative") !== null) {
    return;
  }

  isOptionSelectorToggled.value = false;
};

const onFileUpload = (event) => {
  info.value.mainImg = Array.from(event.target.files);
};

const clickAdd = async () => {
  optionStore.selectedOptions.forEach((option) => {
    if (option.type === "C") {
      info.value.categorys.push(option.id);
    } else {
      info.value.options.push(option.id);
    }
  });
  info.value.regionId = optionStore.regionId;
  info.value.cityId = optionStore.cities;
  // console.log(info.value);
  // console.log(optionStore.selectedOptions);
  // console.log(optionStore.regionId);
  // console.log(optionStore.cities);
  console.log(info);
  await addTour(info.value);
};
const autocompleteInput = ref(null);

onMounted(() => {
  document.addEventListener("click", handleClickOutside);
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
        info.value.meetAddress = place.formatted_address;
        console.log(place.formatted_address);
        // 위도, 경도 정보가 있으면 업데이트
        if (place.geometry && place.geometry.location) {
          info.value.meetLatitude = place.geometry.location.lat();
          info.value.meetLongitude = place.geometry.location.lng();
        }
      }
    });
  });
});

onUnmounted(() => {
  document.removeEventListener("click", handleClickOutside);
});
</script>

<style></style>
