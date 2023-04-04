<template>
    <div class="flex w-full justify-center pt-2 items-center" v-if="loading">
        <div class="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] text-primary motion-reduce:animate-[spin_1.5s_linear_infinite]"
            role="status">
            <span
                class="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">Loading...</span>
        </div>
        <span class="ml-4">{{ label }}</span>
    </div>
</template>
<script lang="ts" setup>
const {label, loading} = defineProps({
    label: String,
    loading: Boolean
})
</script>