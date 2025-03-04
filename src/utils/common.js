//获取用户经纬度
export function getLocation(){
    return new Promise((resolve,reject) => {
        if(!navigator.geolocation){
            reject(new Error('浏览器不支持地理位置'));
            return;
        }
        navigator.geolocation.getCurrentPosition(async (position) => {
            try{
                let location = ''
                const { latitude, longitude } = position.coords;
                location = `${longitude},${latitude}`
                resolve(location)
                
            }catch(error){
                reject(error);
            }
        },(error) => {
            console.log(error,'ppppp');
            
            switch(error.code) {
                case error.PERMISSION_DENIED:
                    reject(new Error('用户拒绝了位置请求'));
                    break;
                case error.POSITION_UNAVAILABLE:
                    reject(new Error('位置信息不可用'));
                    break;
                case error.TIMEOUT:
                    reject(new Error('获取位置超时'));
                    break;
                default:
                    reject(new Error('获取位置发生未知错误'));
            }
        },
        // 配置选项
        {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 30000
        })

    })
}
//时间格式化函数
export function formatTime(date) {
    if (!date) {
        date = new Date();
    } else if (typeof date === 'string' || typeof date === 'number') {
        date = new Date(date);
    }

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}
