<template>
    <div class="bless-item">
        <div class="photo">
            <img :src="localBlessItem.user_avatar" alt="">
        </div>
        <div class="bless-info">
            <div class="user-mes">
                <span class="user-name">{{ localBlessItem.user_name }}</span>
                <span class="font-15 margin-l-10">{{ localBlessItem.time }}</span>
                <span class="user-address font-15 margin-l-5">{{ localBlessItem.address }}</span>
            </div>
            <div class="user-text">
                {{ localBlessItem.user_text }}
            </div>
        </div>
    </div>
</template>
    
<script setup>
import { watch, ref } from 'vue';
const props = defineProps({
    bless_item:{
        type:Object,
        default:() => {}
    }
})
const localBlessItem = ref({...props.bless_item})
watch(() => props.bless_item, (newVal) => {
    localBlessItem.value = {...newVal}
},{
    deep:true,
    immediate:true
})
</script>
    
<style lang="scss" scoped>
.bless-item{
    width: 100%;
    margin-top: 20px;
    @include flex-box(row,'',start,nowrap);
    .photo{
        width: 50px;
        height: 50px;
        border-radius: 50%;
        margin: 0 10px 0 0;
        img{
            width: 100%;
            height: 100%;
            border-radius: 50%;
        }
    }
    .bless-info{
        flex: 1; // 添加这一行
        border: 1px solid #fedcc2;
        padding: 7px 10px 10px 10px;
        border-radius: 5px;
        box-shadow: 1px 1px 2px 1px #fff5ee;
        color: #000;
        .user-name{
            color: #1f77fc;
            display: inline-block;
            position: relative;
            &::after{
                content: '';
                width: 1px;
                height: 16px;
                background-color: #b1b3b8;
                position: absolute;
                right: -5px;
                top: 50%;
                transform: translateY(-50%);
            }
        }
        .user-mes{
            margin-bottom: 20px;
        }
        .user-address{
            color: #cd4814;
        }
        .user-text{
            color: #757e91;
        }
    }
}
</style>