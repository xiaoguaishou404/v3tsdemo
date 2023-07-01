<template>
    <Teleport to="#modal">
    <div id="center">
        <h6>center teleport modal</h6>
    </div>
    </Teleport>
</template>
<script lang="ts">
export default {
    
}
</script>
<style>
#center{
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100px;
    height: 100px;
    background-color: #fff;
    border: 1px solid #ccc;
    border-radius: 5px;
    z-index: 9999;  
}
</style>