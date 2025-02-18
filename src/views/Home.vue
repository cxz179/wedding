<template>
    <div class="home-box">
        <div class="layer1"></div>
        <div class="layer2"></div>
        <div class="layer3"></div>
        <div class="info-box">
            <div class="top-row font-25">
                <div class="arco-col">
                    💖
                    <span>挚爱至上</span>
                    💖
                </div>
                <div class="arco-col font-20 last-text">
                    💕
                    <span>遇见你,就像跋山涉水遇见一轮月亮</span>
                    💕
                </div>
            </div>
            <div class="container">
                <div class="card1"></div>
                <div class="card2"></div>
                <div class="card3">
                    * Card stacks are awesome and inspired by real card stack at your table.
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>

</script>

<style lang="scss" scoped>
@use "sass:meta"; // 引入 sass:meta 模块
@use "sass:math"; // 引入 math 模块
@use "sass:string";
@use "@/assets/common.scss" as *;

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
    $duration: 400s;
    $count: 1000;

    @for $i from 1 through 3 {
        $duration: math.floor(math.div($duration, 2));
        $count: math.floor(math.div($count, 2));

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

    .info-box {
        width: 80%;
        color: #fff;
        margin: 0 auto;
        .top-row{
            width: 100%;
            padding: 20px 0;
            @include flex-box('row','space-between','center');
            .arco-col{
                flex: 1;
            }
            .last-text{
                text-align: end;
            }
        }
        .container {
            position: relative;
            margin-top: 60px;
            width: 360px;

            >* {
                width: 340px;
                height: 120px;
                border: solid 1px #bebebe;
                background-color: #1f1f1f;
                position: absolute;
                border-radius: 10px;
                padding: 10px;
                color: #fff;
                box-shadow: 0px 8px 20px -10px #bbbbbb;
                text-shadow: 0px 0px 5px #fff;
                letter-spacing: 1px;
                background-image: radial-gradient(circle 160px at 50% 120%, #353535, #1f1f1f);
            }

            .card1 {
                width: 300px;
                margin: -20px 0px 0px 20px;
            }

            .card2 {
                width: 320px;
                margin: -10px 0px 0px 10px;
            }
        }
    }
}

@keyframes moveUp {
    100% {
        transform: translateY(-100vh);
    }
}
</style>