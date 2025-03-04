import requset from "@/utils/request";

//获取祝福列表
export function getBlessList(params){
    return requset({
        url:'/api/bless/getBlessList',
        method:'get',
        params
    })
}

export function addBless(data){
    return requset({
        url:'/api/bless/addBless',
        method:'post',
        data
    })
}