<template>
    <div>
        <Navbar></Navbar>
        <router-view />
    </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";

export default {
    components: {
        Navbar
    }
}
</script>

<style lang="scss">
@import './variables';
body {
    font-size: 15px;
    // padding-top: 5em !important;
    background-color: $section-background;
}
</style>
