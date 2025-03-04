<template>
    <!-- 时间记录 -->
    <div class="add-time">
        <p class="font-30">今天是我们在一起的</p>
        <p class="padding-top-20 font-25">{{ totalTime }}</p>
    </div>
    <!-- 选项卡片 -->
    <div class="options">
        <div class="container" v-for="(item, index) in optionsAll" :key="index" @click="controls(item)">
            <svg class="icon" aria-hidden="true">
                <use :xlink:href="item.item_icon"></use>
            </svg>
            <div class="card1">
                <p class="item-title font-20">{{ item.item_title }}</p>
                <p class="item-text font-15">{{ item.item_text }}</p>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, reactive } from "vue";
import { useRouter } from "vue-router";
const router = useRouter()
const totalTime = ref('');
const startTime = ref('2022-03-13 00:20:00')
let timer = reactive(null)
let optionsAll = reactive([
    {
        item_icon: '#icon-icon_invite',
        item_title: '祝福语',
        item_text: '💌写下对我们的祝福',
        pathName:'leaveMessage'
    },
    {
        item_icon: '#icon-anzhouhangkeshijian',
        item_title: '点点滴滴',
        item_text: '💖记录你我生活',
    },
    {
        item_icon: '#icon-xiangji',
        item_title: '时光相册',
        item_text: '🖼️留住你我记忆'
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
        totalTime.value = `第${days}天 ${hours}小时 ${minutes}分钟 ${seconds}秒`
    }, 1000)
}
const controls = (item) => {
    console.log(item);
    router.push({name:item.pathName})
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

        .item-title {
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
</style>