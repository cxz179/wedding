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
            <!-- 头像 -->
            <div class="people-icon">
                <div class="icon-p">
                    <img src="../assets/image/o5.webp" alt="">
                    <p>泡泡</p>
                </div>
                <div class="heart"></div>
                <div class="icon-p">
                    <img src="../assets/image/o5.webp" alt="">
                    <p>小张同志</p>
                </div>
            </div>
            <!-- 时间记录 -->
            <div class="add-time">
                <p class="font-30">今天是我们在一起的</p>
                <p class="padding-top-20 font-25">第{{ totalTime }}</p>
            </div>
            <!-- 选项卡片 -->
            <div class="options">
                <div class="container" v-for="item in 6" :key="item" @click="controls(item)">
                    <div class="card1"></div>
                    <div class="card2"></div>
                    <div class="card3">
                        * Card stacks are awesome and inspired by real card stack at your table.
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>

<script setup>
import { disposePinia } from "pinia";
import { ref, onMounted, onUnmounted, reactive } from "vue";
const totalTime = ref('3天');
const startTime = ref('2022-03-13 00:20:00')
let timer = reactive()
const formatTime = () => {
    timer = setInterval(() => {
        const start = new Date(startTime.value).getTime();
        const now = new Date().getTime();
        const diff = now - start;
        const days = Math.floor(diff / (24 * 60 * 60 * 1000));
        const hours = Math.floor((diff % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));
        const minutes = Math.floor((diff % (60 * 60 * 1000)) / (60 * 1000));
        const seconds = Math.floor((diff % (60 * 1000)) / 1000);
        totalTime.value = `${days}天 ${hours}小时 ${minutes}分钟 ${seconds}秒`
    }, 1000)
}
const controls = (item) => {
    console.log(item);
    
}
onMounted(() => {
    formatTime()
})
onUnmounted(() => {
    if (timer) {
        clearInterval(timer)
    }
})
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

    .info-box {
        width: 80%;
        color: #fff;
        margin: 0 auto;

        .top-row {
            width: 100%;
            padding: 20px 0;
            @include flex-box(row, space-between, center,'');

            .arco-col {
                flex: 1;
            }

            .last-text {
                text-align: end;
            }
        }

        .people-icon {
            width: 100%;
            margin-top: 100px;
            @include flex-box(row, center, center,'');

            .icon-p {
                width: 100px;
                padding: 0 50px;
                @include flex-box(column, '', center,'');

                img {
                    width: 85px;
                    height: 85px;
                    border-radius: 50%;
                }

                p {
                    margin-top: 20px;
                }
            }

            .heart {
                width: 40px;
                height: 40px;
                background-color: #da3848;
                transform: rotate(45deg);
                position: relative;
                animation: heartbeat 2s linear infinite;

                &::before {
                    content: '';
                    width: 40px;
                    height: 40px;
                    position: absolute;
                    top: 0;
                    left: -20px;
                    background-color: #da3848;
                    border-radius: 50%;

                }

                &::after {
                    content: '';
                    width: 40px;
                    height: 40px;
                    position: absolute;
                    top: -20px;
                    left: 0;
                    background-color: #da3848;
                    border-radius: 50%;
                }
            }
        }

        .add-time {
            width: 100%;
            text-align: center;
            margin-top: 50px;

            p:nth-child(1) {
                background: linear-gradient(90deg, red, #00f);
                background-clip: text;
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
            }
        }

        .options {
            width: 100%;
            @include flex-box(row, center, center,wrap);
            gap: 120px 50px;

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
}

@keyframes moveUp {
    from {
        transform: translateY(0);
    }
    to {
        transform: translateY(-100vh);
    }
}

@keyframes heartbeat {
    0% {
        transform: scale(1) rotate(45deg);
    }

    25% {
        transform: scale(1.3) rotate(45deg);
    }

    50% {
        transform: scale(1) rotate(45deg);
    }

    75% {
        transform: scale(1.3) rotate(45deg);
    }

    100% {
        transform: scale(1) rotate(45deg);
    }
}
</style>