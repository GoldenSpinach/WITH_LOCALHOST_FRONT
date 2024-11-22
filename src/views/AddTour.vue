<template>
  <div class="w-full h-screen flex justify-center items-center">
    <div class="border-t"></div>
    <section class="w-5/6 h-[700px] max-w-[1160px]  border rounded-lg box-border p-[25px] self-center">
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
        </div>
        <div class="h-full border-s me-[25px]"></div>
        <div class="w-full h-full box-border">
          <section class="flex flex-col items-center h-full overflow-y-auto gap-[15px]">
            <div class="flex flex-col w-[90%]">
              <label class="text-2xl mb-[10px]" for="title">제목</label>
              <input class="border px-[25px] py-[15px] rounded-md" type="text" />
            </div>
            <div class="flex flex-col w-[90%]">
              <label class="text-2xl mb-[10px]" for="title">카테고리</label>
              <input class="border px-[5px] py-[15px] rounded-md" type="text" />
            </div>
            <div class="flex flex-col w-[90%]">
              <label class="text-2xl mb-[10px]" for="title">옵션</label>
              <input class="border px-[5px] py-[15px] rounded-md" type="text" />
            </div>
            <div class="flex flex-col w-[90%]">
              <label class="text-2xl mb-[10px]" for="title">가격</label>
              <input class="border px-[5px] py-[15px] rounded-md" type="text" />
            </div>
            <div class="flex flex-col w-[90%]">
              <span class="text-2xl">일정</span>
              <div class="w-full border-t my-[15px]"></div>
              <div class="flex w-full justify-between">
                <div class="w-[45%] h-[400px] max-h-[500px] flex flex-col gap-[15px]">
                  <div class="px-[20px] py-[15px] border rounded-md flex justify-between">
                    <span>일정이름이지롱</span>
                    <img class="w-[20px] cursor-pointer" src="@/assets/images/trashcan.svg" alt="" />
                  </div>
                  <div class="px-[20px] py-[15px] border rounded-md flex justify-between">
                    <span>일정이름이지롱</span>
                    <img class="w-[20px] cursor-pointer" src="@/assets/images/trashcan.svg" alt="" />
                  </div>
                  <div class="px-[20px] py-[15px] border rounded-md flex justify-between">
                    <span>일정이름이지롱</span>
                    <img class="w-[20px] cursor-pointer" src="@/assets/images/trashcan.svg" alt="" />
                  </div>
                  <div class="px-[20px] py-[15px] border rounded-md flex justify-between">
                    <span>일정이름이지롱</span>
                    <img class="w-[20px] cursor-pointer" src="@/assets/images/trashcan.svg" alt="" />
                  </div>
                  <div class="px-[20px] py-[15px] border rounded-md flex justify-between">
                    <span>일정이름이지롱</span>
                    <img class="w-[20px] cursor-pointer" src="@/assets/images/trashcan.svg" alt="" />
                  </div>
                </div>
                <div class="w-[45%] flex flex-col gap-[20px]">
                  <div class="w-full flex flex-col gap-[10px]">
                    <label class="text-xl" for="act-title">일정 이름</label>
                    <input class="border px-[25px] py-[15px]" type="text" id="act-title" />
                  </div>
                  <div class="w-full flex flex-col gap-[10px]">
                    <label class="text-xl" for="act-description">설명</label>
                    <input class="border px-[25px] py-[15px]" type="text" id="act-description" />
                  </div>
                  <div class="w-full flex flex-col gap-[10px]">
                    <div class="flex justify-between">
                      <label class="text-sm cursor-pointer flex items-center" for="act-image">사진 업로드
                        <img src="@/assets/images/file.svg" alt="사진업로드" /></label>
                      <input class="hidden" type="file" id="act-image" />
                      <button class="w-1/3 bg-blue-400 rounded-md text-white hover:bg-blue-500 h-[40px]">
                        추가
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="flex flex-col w-[90%]">
              <label class="text-2xl mb-[10px]" for="title">패키지 설명</label>
              <input class="border px-[25px] py-[15px] rounded-md" type="text" />
            </div>
            <div class="flex flex-col w-[90%]">
              <label class="text-2xl mb-[10px]" for="title">유의사항</label>
              <input class="border px-[25px] py-[15px] rounded-md" type="text" />
            </div>
          </section>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from "vue";

const info = ref({});
</script>

<style></style>
