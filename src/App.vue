<template>
    <div class="home-box">
        <div class="layer1"></div>
        <div class="layer2"></div>
        <div class="layer3"></div>
        <router-view></router-view>
    </div>
</template>
  
<script setup>
import { ref, onMounted } from 'vue';
import { getLocation } from "@/utils/common";
const getUserLocation = async () => {
    try{
        const position = await getLocation()
        if(position){
            sessionStorage.setItem('location',position)
        }
        
    }catch(error){
        console.error('获取位置失败:',error)
    }
}
onMounted(() => {
    getUserLocation()

})
</script>
  
<style lang="scss">

@function getShadows($n) {
    $shadows: '#{math.random(100)}vw #{math.random(100)}vh #fff';

    @for $i from 2 through $n {
        $shadows: '#{$shadows}, #{math.random(100)}vw #{math.random(100)}vh #fff';
    }

    @return string.unquote($shadows);
}
.home-box {
    width: 100%;
    min-height: 100vh;
    position: relative;
    $duration: 400s;
    $count: 1000;

    &::before {
        content: '';
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100vh;
        background: radial-gradient(ellipse at bottom, #1b2735 0%, #090a0f 100%);
        z-index: -1;
    }

    @for $i from 1 through 3 {
        $duration: math.floor(math.div($duration, 2));
        $count: math.floor(math.div($count, 2));

        .layer#{$i} {
            $size: #{$i}px;
            position: fixed; // 改回 fixed
            width: $size;
            height: $size;
            border-radius: 50%;
            background: #fff;
            left: 0;
            top: 0;
            box-shadow: getShadows($count);
            animation: moveUp $duration linear infinite;
            z-index: -1; // 确保在内容下面

            &::after {
                content: "";
                position: fixed; // 改回 fixed
                left: 0;
                top: 100vh;
                width: $size;
                height: $size;
                border-radius: inherit;
                box-shadow: inherit;
            }
        }
    }
}
@keyframes moveUp {
    from {
        transform: translateY(0);
    }

    to {
        transform: translateY(-100vh);
    }
}
</style>