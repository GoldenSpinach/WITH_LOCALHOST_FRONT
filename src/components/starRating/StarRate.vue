<template>
  <div class="rating-stars">
    <input
      type="radio"
      name="rating"
      id="rs0"
      value="0"
      v-model="rating"
      @change="emitRating"
    /><label for="rs0"></label>
    <input
      type="radio"
      name="rating"
      id="rs1"
      value="1"
      v-model="rating"
      @change="emitRating"
    /><label for="rs1"></label>
    <input
      type="radio"
      name="rating"
      id="rs2"
      value="2"
      v-model="rating"
      @change="emitRating"
    /><label for="rs2"></label>
    <input
      type="radio"
      name="rating"
      id="rs3"
      value="3"
      v-model="rating"
      @change="emitRating"
    /><label for="rs3"></label>
    <input
      type="radio"
      name="rating"
      id="rs4"
      value="4"
      v-model="rating"
      @change="emitRating"
    /><label for="rs4"></label>
    <input
      type="radio"
      name="rating"
      id="rs5"
      value="5"
      v-model="rating"
      @change="emitRating"
    /><label for="rs5"></label>
  </div>
</template>

<script setup>
import { ref, defineProps, defineEmits } from "vue";

// Define emits to communicate with the parent component
const emit = defineEmits(["update:modelValue"]);

// Rating value managed within the component
const props = defineProps({
  modelValue: {
    type: Number,
    default: 0,
  },
});

const rating = ref(props.modelValue);

// Emit the rating value when it changes
const emitRating = () => {
  emit("update:modelValue", rating.value);
};
</script>

<style scoped>
.rating-stars {
  display: block;
  width: 35vmin;
  background: linear-gradient(90deg, #ffffff90 40vmin, #fff0 40vmin 100%);
  border-radius: 5vmin;
  position: relative;
}

.rating-counter {
  font-size: 5.5vmin;
  font-family: Arial, Helvetica, serif;
  color: #9aacc6;
  width: 10vmin;
  text-align: center;
  background: #0006;
  position: absolute;
  top: 0;
  right: 0;
  height: 100%;
  border-radius: 0 5vmin 5vmin 0;
  line-height: 10vmin;
}

.rating-counter:before {
  content: "0";
  transition: all 0.25s ease 0s;
}

input {
  display: none;
}

label {
  width: 5vmin;
  height: 5vmin;
  background: #000b;
  display: inline-flex;
  cursor: pointer;
  margin: 0.5vmin 0.65vmin;
  transition: all 1s ease 0s;
  clip-path: polygon(
    50% 0%,
    66% 32%,
    100% 38%,
    78% 64%,
    83% 100%,
    50% 83%,
    17% 100%,
    22% 64%,
    0 38%,
    34% 32%
  );
}

label[for="rs0"] {
  display: none;
}

label:before {
  width: 90%;
  height: 90%;
  content: "";
  background: orange;
  z-index: -1;
  display: block;
  margin-left: 5%;
  margin-top: 5%;
  clip-path: polygon(
    50% 0%,
    66% 32%,
    100% 38%,
    78% 64%,
    83% 100%,
    50% 83%,
    17% 100%,
    22% 64%,
    0 38%,
    34% 32%
  );
  background: linear-gradient(
    90deg,
    yellow,
    orange 30% 50%,
    #184580 50%,
    70%,
    #173a75 100%
  );
  background-size: 205% 100%;
  background-position: 0 0;
}

label:hover:before {
  transition: all 0.25s ease 0s;
}

input:checked + label ~ label:before {
  background-position: 100% 0;
  transition: all 0.25s ease 0s;
}

input:checked + label ~ label:hover:before {
  background-position: 0% 0;
}

#rs1:checked ~ .rating-counter:before {
  content: "1";
}

#rs2:checked ~ .rating-counter:before {
  content: "2";
}

#rs3:checked ~ .rating-counter:before {
  content: "3";
}

#rs4:checked ~ .rating-counter:before {
  content: "4";
}

#rs5:checked ~ .rating-counter:before {
  content: "5";
}

label + input:checked ~ .rating-counter:before {
  color: #ffab00 !important;
  transition: all 0.25s ease 0s;
}

label:hover ~ .rating-counter:before {
  color: #9aacc6 !important;
  transition: all 0.5s ease 0s;
  animation: pulse 1s ease 0s infinite;
}

@keyframes pulse {
  50% {
    font-size: 6.25vmin;
  }
}

label[for="rs1"]:hover ~ .rating-counter:before {
  content: "1" !important;
}

label[for="rs2"]:hover ~ .rating-counter:before {
  content: "2" !important;
}

label[for="rs3"]:hover ~ .rating-counter:before {
  content: "3" !important;
}

label[for="rs4"]:hover ~ .rating-counter:before {
  content: "4" !important;
}

label[for="rs5"]:hover ~ .rating-counter:before {
  content: "5" !important;
}

input:checked:hover ~ .rating-counter:before {
  animation: none !important;
  color: #ffab00 !important;
}
</style>
