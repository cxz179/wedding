//基准大小
const baseSize = 16;
//设置rem函数
function setRem(){
    const scale = document.documentElement.clientWidth / 1420;
    // 设置页面根节点字体大小（“Math.min(scale, 3)” 指最高放大比例为3，可根据实际业务需求调整）
    document.documentElement.style.fontSize = `${baseSize * Math.min(scale,3)}px`;
}
//初始化
setRem()
//改变窗口大小时重新设置rem
window.onresize = () => {
    setRem()
}