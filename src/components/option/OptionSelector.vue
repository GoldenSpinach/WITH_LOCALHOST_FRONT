<template>
    <div class="w-[450px] border border-zinc-300 rounded-3xl mt-[5px] shadow-xl p-[20px] bg-white">
        <div>
            <span class="text-lg font-bold mb-[8px] inline-block"> 지역</span>
            <div class="flex flex-wrap gap-[12px]">
                <div v-for="option in options" :key="option.categoryId"
                    class="border p-[5px] rounded-lg cursor-pointer hover:bg-blue-400  hover:text-white">
                    {{ option.categoryName }}
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang='ts'>
import { ref } from "vue";

const options = ref([
    {
        "categoryId": 21,
        "categoryName": "여행",
        "categoryType": "C"
    },
    {
        "categoryId": 22,
        "categoryName": "관광",
        "categoryType": "C"
    },
    {
        "categoryId": 23,
        "categoryName": "먹방",
        "categoryType": "C"
    },
    {
        "categoryId": 24,
        "categoryName": "레저",
        "categoryType": "C"
    },
    {
        "categoryId": 25,
        "categoryName": "휴양",
        "categoryType": "C"
    },
    {
        "categoryId": 26,
        "categoryName": "체험",
        "categoryType": "C"
    },
    {
        "categoryId": 27,
        "categoryName": "문화",
        "categoryType": "C"
    },
    {
        "categoryId": 28,
        "categoryName": "스포츠",
        "categoryType": "C"
    },
    {
        "categoryId": 29,
        "categoryName": "자연",
        "categoryType": "C"
    },
    {
        "categoryId": 30,
        "categoryName": "쇼핑",
        "categoryType": "C"
    },
    {
        "categoryId": 31,
        "categoryName": "유적지 탐방",
        "categoryType": "C"
    },
    {
        "categoryId": 32,
        "categoryName": "테마파크",
        "categoryType": "C"
    },
    {
        "categoryId": 33,
        "categoryName": "낚시",
        "categoryType": "C"
    },
    {
        "categoryId": 34,
        "categoryName": "온천",
        "categoryType": "C"
    },
    {
        "categoryId": 35,
        "categoryName": "캠핑",
        "categoryType": "C"
    },
    {
        "categoryId": 36,
        "categoryName": "등산",
        "categoryType": "C"
    },
    {
        "categoryId": 37,
        "categoryName": "바다 여행",
        "categoryType": "C"
    },
    {
        "categoryId": 38,
        "categoryName": "도심 여행",
        "categoryType": "C"
    },
    {
        "categoryId": 39,
        "categoryName": "역사 탐방",
        "categoryType": "C"
    },
    {
        "categoryId": 40,
        "categoryName": "축제 참여",
        "categoryType": "C"
    }
])
</script>

<style></style>