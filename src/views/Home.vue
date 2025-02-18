<template>
    <div class="home-box">
        <div class="layer1"></div>
        <div class="layer2"></div>
        <div class="layer3"></div>
        <div class="info-box">
            sass星空
        </div>
    </div>
</template>

<script setup>

</script>

<style lang="scss" scoped>
@use "sass:meta"; // 引入 sass:meta 模块
@use "sass:math"; // 引入 math 模块
@use "sass:string";

@function getShadows($n) {
    $shadows: '#{math.random(100)}vw #{math.random(100)}vh #fff';

    @for $i from 2 through $n {
        $shadows: '#{$shadows}, #{math.random(100)}vw #{math.random(100)}vh #fff';
    }
    @return string.unquote($shadows);
}

.home-box {
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    background: radial-gradient(ellipse at bottom, #1b2735 0%, #090a0f 100%);
    $duration:400s;
    $count:1000;
    @for $i from 1 through 3 {
        $duration: math.floor(math.div($duration, 2));
        $count: math.floor(math.div($count,2));
        .layer#{$i} {
            $size: #{$i}px;
            position: fixed;
            width: $size;
            height: $size;
            border-radius: 50%;
            background: #fff;
            left: 0;
            top: 0;
            box-shadow: getShadows($count);
            animation: moveUp $duration linear infinite;

            &::after {
                content: "";
                position: fixed;
                left: 0;
                top: 100vh;
                width: $size;
                height: $size;
                border-radius: inherit;
                box-shadow: inherit;
            }
        }
    }
    .info-box{
        width: 60%;
        
        background: #fff;
        margin: 0 auto;
    }
}

@keyframes moveUp {
    100% {
        transform: translateY(-100vh);
    }
}
</style>