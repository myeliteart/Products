<template>
   <div class="border-t-4 border-orange-400">
        <div class="py-4 bg-gray-700">
            <div class="text-white px-6">
                <p class="mb-0">&copy; Copyright {{ year }} &nbsp; | &nbsp; Vue by Eli</p>
            </div>
        </div>
    </div>
</template>

<script setup>
    const date = new Date()
    const year = date.getFullYear()
</script>

<style scoped>
</style>