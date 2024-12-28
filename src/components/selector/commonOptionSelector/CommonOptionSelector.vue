<template>
  <div
    class="w-[450px] border border-zinc-300 rounded-3xl mt-5 shadow-xl p-6 bg-white"
  >
    <div v-if="menus?.length" class="border-b w-full mb-6 flex">
      <span
        v-for="menu in menus"
        :key="menu.key"
        :class="[
          'text-lg font-semibold inline-block px-5 pb-3 rounded-t-md me-5 cursor-pointer text-center transition-all duration-200',
          currentMenu === menu.key
            ? 'bg-blue-400 text-white'
            : 'text-gray-700 hover:bg-gray-100',
        ]"
        @click="currentMenu = menu.key"
      >
        {{ menu.label }}
      </span>
    </div>
    <div class="flex flex-wrap gap-3">
      <div
        v-for="item in filteredItems"
        :key="item.categoryId"
        @click="handleSelect(item.categoryId, item.categoryName)"
        :class="[
          'border p-4 rounded-lg cursor-pointer transition-all duration-200',
          selectedItems.some((selected) => selected.id === item.categoryId)
            ? 'bg-blue-400 text-white border-blue-400'
            : 'border-gray-300 hover:bg-blue-50 hover:text-blue-500',
        ]"
      >
        <span class="flex items-center gap-1">
          <span>{{ item.categoryName }}</span>
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";

const props = defineProps({
  menus: Array, // 메뉴 리스트 [{ key: "OPTION", label: "편의" }, { key: "CATEGORY", label: "활동유형" }]
  items: Object, // 데이터 리스트 { OPTION: [{ id, name, type }], CATEGORY: [{ id, name, type }] }
  selectedItems: {
    type: Array,
    default: () => [], // 기본값: 빈 배열
  },
});

const emit = defineEmits(["select"]);
const currentMenu = ref(props.menus?.[0]?.key || "OPTION");

const filteredItems = computed(() => {
  console.log(props.items[currentMenu.value]);
  return props.items[currentMenu.value] || [];
});

const handleSelect = (id, name) => {
  emit("select", { id, name });
};
</script>

<style scoped>
.material-icons {
  font-size: 16px;
  vertical-align: middle;
}
</style>
