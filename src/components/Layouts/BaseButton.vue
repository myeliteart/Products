<template>
    <button class="bg-gray-700 text-white border border-gray-700 rounded py-2 px-4 hover:bg-transparent hover:border hover:border-gray-700 hover:text-gray-700" :class="mode">
        <slot></slot>
    </button>
</template>

<script setup>
    const props = defineProps(['mode'])
</script>

<style scoped>
    .reverse {
        background-color: #fff;
        color:  #333537;
        padding: 7px 15px;
        border: 1px solid #333537;
        border-radius: .3rem; 
    }
    .reverse:hover {
        background-color: #333537;
        color:  #fff;
        border-radius: .3rem;
        border: 1px solid #333537;
    }
    .round {
        background-color: #f6ad55;
        color:  #333537;
        font-weight: 600;
        font-size: 16px;
        padding: 10px 15px;
        width: 30%;
        border-radius: .5rem;
        border: 1px solid #f6ad55;
    }
    .round:hover {
        background-color: transparent;
        color:  #333537;
        padding: 10px 15px;
        border-radius: .5rem;
        width: 30%;
        border: 1px solid #333537;
    }
    .round-reverse {
        background-color: transparent;
        color: #f6ad55;
        padding: 0;
        border: 0px solid #f6ad55;
    }
    .round-reverse:hover {
        background-color: transparent;
        color:  #333537;
        padding: 0;
        border: 0px solid #333537;
    }
    @media screen and (max-width: 980px) {
    .round {
        background-color: #f6ad55;
        color:  #333537;
        font-weight: 600;
        font-size: 16px;
        padding: 9px;
        border-radius: .3rem;
        width: 40%;
        border: 2px solid #f6ad55;
    }
    .round:hover {
        background-color: transparent;
        color:  #333537;
        padding: 9px;
        border-radius: .3rem;
        width:40%;
        border: 2px solid #333537;
    }
}
</style>