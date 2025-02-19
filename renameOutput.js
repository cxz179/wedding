//重命名
import { promises as fsPromises } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
function getFormattedDate() {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2,'0');
    const day = String(date.getDate()).padStart(2,'0');
    const hour = String(date.getHours()).padStart(2,'0');
    const minutes = String(date.getMinutes()).padStart(2,'0');
    return `${year}${month}${day}${hour}${minutes}`;
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const formattedDate = getFormattedDate();
const srcPath = resolve(__dirname, 'dist');
const destPath = resolve(__dirname, `dist_${formattedDate}`);
// 延迟函数
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// 异步重命名函数
async function renameDirectory(src, dest) {
    try {
        await delay(2000); // 等待指定时间
        await fsPromises.chmod(src, 0o777); // 更改可写权限，注意权限代码的格式
        await fsPromises.rename(src, dest);
        console.log(`已成功重命名目录 "${src}" 至 "${dest}".`);
    } catch (error) {
        console.error('重命名目录时出错：', error);
        if (error.code === 'ENOENT') {
            console.error(`源目录 "${src}" 不存在.`);
        } else if (error.code === 'EACCES') {
            console.error(`尝试访问时权限被拒绝"${src}" or "${dest}".`);
        } else {
            console.error(`意外错误: ${error.message}`);
        }
    }
}
renameDirectory(srcPath,destPath);