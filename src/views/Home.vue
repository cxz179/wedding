<template>
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
            <div class="heart-a"></div>
            <div class="icon-p">
                <img src="../assets/image/o5.webp" alt="">
                <p>小张同志</p>
            </div>
        </div>
        <router-view></router-view>
        <!-- 备案信息 -->
        <div class="footer">
            <p>
                <img src="../assets/image/ga.png" alt="">
                蜀ICP备2024116639号
            </p>
            <p class="font-15">蜀ICP备2024116639号-1</p>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, reactive } from "vue";
</script>

<style lang="scss" scoped>
.info-box {
    width: 80%;
    color: #fff;
    margin: 0 auto;
    box-sizing: border-box;
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
        box-sizing: border-box;

        .icon-p {
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

        .heart-a {
            width: 40px;
            height: 40px;
            background-color: #da3848;
            transform: rotateZ(45deg);
            -webkit-transform: rotateZ(45deg);
            position: relative;
            // flex-shrink: 0;  // 添加这行，防止在flex布局中被压缩
            animation: heartbeat 2s linear infinite;
            -webkit-animation: heartbeat 2s linear infinite;
            z-index: 1;
            margin: 0 50px;

            &::before,
            &::after {
                content: '';
                width: 40px;
                height: 40px;
                background-color: #da3848;
                border-radius: 50%;
                position: absolute;
            }

            &::before {
                top: 0;
                left: -20px;
            }

            &::after {
                top: -20px;
                left: 0;
            }
        }
    }

    

    

    .footer {
        width: 100%;
        text-align: center;
        color: #979696;
        padding: 20px 0;
        p {
            margin-top: 15px;
        }

        img {
            width: 17px;
            height: 17px;
        }
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

@media (max-width: 768px) {
    .info-box .people-icon .icon-p img {
        width: 70px !important;
        height: 70px !important;
        border-radius: 50%;
    }

    .top-row,
    .last-text {
        font-size: 15px;
    }
}
</style>