<template>
    <div class="message-box">
        <p class="nums font-20 font-bold">累计已经收到 <span class="font-30">{{ blessList.length }}</span> 条祝福</p>
        <div class="item-info">
            <BlessItem v-for="(item,index) in blessList" :key="index" :bless_item="item"></BlessItem>
        </div>
        <div class="comment-form">
            <div class="from-row">
                <input v-model="userData.user_name" type="text" placeholder="怎么称呼？">
            </div>
            <div class="form-group">
                <textarea v-model="userData.user_text" class="message-input font-18" ref="messageInput" placeholder="写下对我们的祝福"></textarea>
            </div>
            <div class="submit-btn">
                <button class="btn" type="submit" @click="sendBless">
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-fasong"></use>
                    </svg>
                    发送祝福
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { reactive, ref, onMounted, watch } from 'vue';
import BlessItem from "@/components/bless/index.vue"
import { getBlessList, addBless } from "@/apis/bless"
import { formatTime } from "@/utils/common"
const messageInput = ref(null);
let blessList = ref([]) //祝福列表
let userData = ref({
    user_name:'',
    user_text:'',
    time:'',
    user_location:'',//用户经纬度
})
//获取祝福列表
const getList = async () => {
    try{
        const res = await getBlessList();
        console.log(res,'55555');
        if(res && res.code === 0){
            blessList.value = [...res.data]
        }
    }catch(error){
        console.error('获取祝福列表失败:',error)
    }
}
//发送祝福
const sendBless = async () => {
    try {
        // 表单验证
        const name = userData.value.user_name.toString().trim()
        const text = userData.value.user_text.toString().trim()
        
        if(!name || name === 'undefined' || name === 'null') {
            alert('请输入您的称呼')
            return
        }
        if(!text || text === 'undefined' || text === 'null') {
            alert('请输入祝福内容')
            return
        }

        // 构建请求数据
        const requestData = {
            user_name: userData.value.user_name.trim(),
            user_text: userData.value.user_text.trim(),
            time: formatTime(new Date()),
            user_location: sessionStorage.getItem('location') || ''
        }

        const res = await addBless(requestData)
        
        if(res?.code === 0) {
            // 更新列表
            blessList.value.push({
                ...requestData,
                address: res.data.address,
                user_avatar: res.data.avatar_pic
            })

            // 重置表单
            userData.value = {
                user_name: '',
                user_text: '',
                time: '',
                user_location: ''
            }
        }
    } catch(error) {
        console.error('发送祝福失败:', error)
        alert('发送祝福失败,请稍后重试')
    }
}
onMounted(() => {
    getList()
})

</script>

<style lang="scss" scoped>
.message-box {
    width: 100%;
    max-height: 1000px;
    margin: 0 auto;
    margin-top: 100px;
    border-radius: 10px;
    background-color: rgb(253, 250, 251);
    box-shadow: rgba(236, 235, 235, 0.884) 1px 4px 15px;
    color: #eb3a3a;
    padding: 20px;
    box-sizing: border-box;

    .nums {
        text-align: center;
    }
    .item-info{
        max-height: 600px;
        overflow-y: auto;     // 只允许垂直方向滚动
        overflow-x: hidden;   // 隐藏水平方向滚动条
    }
    .comment-form {
        width: 100%;

        .from-row {
            margin: 15px 0;

            input {
                height: 35px;
                border: 2px solid #ced4da;
                border-radius: 5px;
                box-sizing: border-box;
                padding: 5px 10px;
                display: block;
                transition: border-color 0.3s;

                &:focus {
                    border-color: #fedcc2;
                    outline: none;
                }
            }
        }
    }

    .form-group {
        width: 100%;
        height: 150px;
        border-radius: 5px;

        .message-input {
            width: 100%;
            height: 100%;
            padding: 5px 10px;
            border: 2px solid #ced4da;
            box-sizing: border-box;
            border-radius: 5px;
            color: #6a6b6d;
            resize: none;

            &:focus {
                border-color: #fedcc2;
                outline: none;
            }

        }
    }

    .submit-btn {
        width: 100%;
        @include flex-box(row, end, center, nowrap);
        margin-top: 20px;

        .btn {
            width: 100px;
            height: 40px;
            border: none;
            border: 2px solid #fa862b;
            background-color: #fdfafb;
            border-radius: 5px;
            color: #fa862b;
            @include flex-box(row, center,center,nowrap);
            &:hover {
                background-color: #fa862b;
                color: #fff;
            }

            .icon {
                width: 1.5em;
                height: 1.5em;
                vertical-align: -0.15em;
                fill: currentColor;
                overflow: hidden;
            }
        }
    }
}
</style>