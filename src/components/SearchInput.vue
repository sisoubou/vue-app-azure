<template>
    <div>
        <input :value="modelValue" @input="emit('update:modelValue', $event.target.value)" type="text" placeholder="Rechercher un Pokemon"/>
    </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'

defineProps({
    modelValue: {
        type: String,
        default: ''
    }
})

const emit = defineEmits(['update:modelValue'])
</script>

<style scoped>
    input {
        width: 1200px;
        padding: 10px;
        font-size: 1.2rem;
        border: 2px solid #ccc;
        border-radius: 5px;
        box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
        display: center;
    }

    input:focus {
        border-color: #0a7400;
        outline: none;
        box-shadow: rgba(10, 116, 0, 0.3) 0px 4px 12px;
    }
</style>