<template>
    <div class="w-[450px] border border-zinc-300 rounded-3xl mt-[5px] shadow-xl p-[20px] bg-white">
        <div>
            <span class="text-lg font-bold mb-[8px] inline-block"> 지역</span>
            <div class="flex flex-wrap gap-[12px]">
                <div v-for="region in regions" :key="region.regionId"
                    class="border p-[5px] rounded-lg cursor-pointer hover:bg-blue-400  hover:text-white">
                    {{ region.regionName }}
                </div>
            </div>
        </div>
        <div class="w-full border my-[25px]"></div>
        <div>
            <span class="text-lg font-bold mb-[8px] inline-block">도시</span>
            <div class="flex flex-wrap gap-[12px]">
                <div v-for="city in cities" :key="city.cityId"
                    class="border p-[5px] rounded-lg cursor-pointer hover:bg-blue-400  hover:text-white">
                    {{ city.cityName }}
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang='ts'>
import { ref } from "vue";

const regions = ref([
    {
        "regionId": 10,
        "regionName": "강원도"
    },
    {
        "regionId": 9,
        "regionName": "경기도"
    },
    {
        "regionId": 16,
        "regionName": "경상남도"
    },
    {
        "regionId": 15,
        "regionName": "경상북도"
    },
    {
        "regionId": 5,
        "regionName": "광주광역시"
    },
    {
        "regionId": 3,
        "regionName": "대구광역시"
    },
    {
        "regionId": 6,
        "regionName": "대전광역시"
    },
    {
        "regionId": 2,
        "regionName": "부산광역시"
    },
    {
        "regionId": 1,
        "regionName": "서울특별시"
    },
    {
        "regionId": 8,
        "regionName": "세종특별자치시"
    },
    {
        "regionId": 7,
        "regionName": "울산광역시"
    },
    {
        "regionId": 4,
        "regionName": "인천광역시"
    },
    {
        "regionId": 14,
        "regionName": "전라남도"
    },
    {
        "regionId": 13,
        "regionName": "전라북도"
    },
    {
        "regionId": 17,
        "regionName": "제주특별자치도"
    },
    {
        "regionId": 12,
        "regionName": "충청남도"
    },
    {
        "regionId": 11,
        "regionName": "충청북도"
    }
]);
const cities = ref([
    {
        "cityId": 9,
        "cityName": "수원시",
        "regionId": 9
    },
    {
        "cityId": 10,
        "cityName": "고양시",
        "regionId": 9
    },
    {
        "cityId": 11,
        "cityName": "용인시",
        "regionId": 9
    },
    {
        "cityId": 12,
        "cityName": "성남시",
        "regionId": 9
    },
    {
        "cityId": 13,
        "cityName": "부천시",
        "regionId": 9
    },
    {
        "cityId": 14,
        "cityName": "화성시",
        "regionId": 9
    },
    {
        "cityId": 15,
        "cityName": "남양주시",
        "regionId": 9
    },
    {
        "cityId": 16,
        "cityName": "안산시",
        "regionId": 9
    },
    {
        "cityId": 17,
        "cityName": "안양시",
        "regionId": 9
    },
    {
        "cityId": 18,
        "cityName": "평택시",
        "regionId": 9
    },
    {
        "cityId": 19,
        "cityName": "의정부시",
        "regionId": 9
    },
    {
        "cityId": 20,
        "cityName": "파주시",
        "regionId": 9
    },
    {
        "cityId": 21,
        "cityName": "시흥시",
        "regionId": 9
    },
    {
        "cityId": 22,
        "cityName": "김포시",
        "regionId": 9
    },
    {
        "cityId": 23,
        "cityName": "광명시",
        "regionId": 9
    },
    {
        "cityId": 24,
        "cityName": "광주시",
        "regionId": 9
    },
    {
        "cityId": 25,
        "cityName": "군포시",
        "regionId": 9
    },
    {
        "cityId": 26,
        "cityName": "오산시",
        "regionId": 9
    },
    {
        "cityId": 27,
        "cityName": "이천시",
        "regionId": 9
    },
    {
        "cityId": 28,
        "cityName": "하남시",
        "regionId": 9
    },
    {
        "cityId": 29,
        "cityName": "안성시",
        "regionId": 9
    },
    {
        "cityId": 30,
        "cityName": "양주시",
        "regionId": 9
    },
    {
        "cityId": 31,
        "cityName": "구리시",
        "regionId": 9
    },
    {
        "cityId": 32,
        "cityName": "포천시",
        "regionId": 9
    },
    {
        "cityId": 33,
        "cityName": "의왕시",
        "regionId": 9
    },
    {
        "cityId": 34,
        "cityName": "여주시",
        "regionId": 9
    },
    {
        "cityId": 35,
        "cityName": "동두천시",
        "regionId": 9
    },
    {
        "cityId": 36,
        "cityName": "과천시",
        "regionId": 9
    }
]);
</script>

<style></style>