<template>
    <div id="index">
        <Nav></Nav>
        <LeftMenu></LeftMenu>
        <div class="rightContainer">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
    import Nav from "../components/Nav"
    import LeftMenu from "../components/LeftMenu";

    export default {
        name:'index',
        components: {
            Nav,
            LeftMenu
        }
    }
</script>


<style scoped>
#index{
    height: 100%;
    width: 100%;
    overflow: hidden;
}
.rightContainer {
    position: relative;
    top: 0;
    left: 180px;
    width: calc(100% - 180px);
    height: calc(100% - 71px);
    overflow: auto;
}
</style>