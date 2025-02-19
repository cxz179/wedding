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
                <div class="container" v-for="(item,index) in optionsAll" :key="index" @click="controls(item)">
                    <svg class="icon" aria-hidden="true">
                        <use :xlink:href="item.item_icon"></use>
                    </svg>
                    <div class="card1">
                        <p class="item-title font-20">{{ item.item_title }}</p>
                        <p class="item-text font-15">{{ item.item_text }}</p>
                    </div>
                </div>
            </div>
            <!-- 备案信息 -->
            <div class="footer">
                <p>
                    <img src="../assets/image/ga.png" alt="">
                    蜀ICP备2024116639号
                </p>
                <p class="font-15">蜀ICP备2024116639号-1</p>
            </div>
        </div>
    </div>
</template>

<script setup>
import { disposePinia } from "pinia";
import { ref, onMounted, onUnmounted, reactive } from "vue";
const totalTime = ref('');
const startTime = ref('2022-03-13 00:20:00')
let timer = reactive()
let optionsAll = reactive([
    {
        item_icon:'#icon-icon_invite',
        item_title:'祝福语',
        item_text:'💌写下对我们的祝福'
    },
    {
        item_icon:'#icon-anzhouhangkeshijian',
        item_title:'点点滴滴',
        item_text:'💖记录你我生活'
    },
    {
        item_icon:'#icon-xiangji',
        item_title:'时光相册',
        item_text:'🖼️留住你我记忆'
    },
    
])
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
            @include flex-box(row, space-between, center, '');

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
            @include flex-box(row, center, center, '');
            transform: perspective(1000);
            .icon-p {
                width: 100px;
                padding: 0 50px;
                @include flex-box(column, '', center, '');

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
                -webkit-transform: rotate(45deg);
                position: relative;
                animation: heartbeat 2s linear infinite;
                -webkit-animation: heartbeat 2s linear infinite;
                transform-origin: center center;
                -webkit-transform-origin: center center;

                &::before,
                &::after {
                    content: '';
                    width: 40px;
                    height: 40px;
                    background-color: #da3848;
                    border-radius: 50%;
                    position: absolute;
                    display: block;
                }

                &::before {
                    top: 0;
                    left: -20px;
                    transform-origin: right center;
                    -webkit-transform-origin: right center;
                }

                &::after {
                    top: -20px;
                    left: 0;
                    transform-origin: center bottom;
                    -webkit-transform-origin: center bottom;
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
            @include flex-box(row, center, center, wrap);
            gap: 40px;
            padding: 40px 0;

            .container {
                width: 300px;
                height: 120px;
                box-sizing: border-box;
                border: solid 1px #bebebe;
                background-color: #1f1f1f;
                border-radius: 10px;
                padding: 10px 20px;
                color: #fff;
                box-shadow: 0px 8px 20px -10px #bbbbbb;
                text-shadow: 0px 0px 5px #fff;
                letter-spacing: 1px;
                background-image: radial-gradient(circle 160px at 50% 120%, #353535, #1f1f1f);
                @include flex-box(row, '', center, '');
                gap: 0 30px;
                &:hover {
                    box-shadow: 0 0 20px #bbbbbb;
                }
                .item-title{
                    margin-bottom: 15px;
                }
                .icon {
                    width: 2.5em;
                    height: 2.5em;
                    vertical-align: -0.15em;
                    fill: currentColor;
                    overflow: hidden;
                }
            }
        }
        .footer{
            width: 100%;
            text-align: center;
            color: #979696;
            p{
                margin-top: 15px;
            }
            img{
                width: 17px;
                height: 17px;
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