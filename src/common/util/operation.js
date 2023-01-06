
import { ElMessage, ElMessageBox } from 'element-plus'
import { ElNotification } from 'element-plus'

const handleDelete = (callback) => {
    ElMessageBox.confirm('您确定要删除这条数据吗?', '警告',
        {
            confirmButtonText: '确认',
            cancelButtonText: '取消',
            type: 'warning',
        }).then(() => {
            //执行删除操作
            callback();
            ElMessage({
                type: 'success',
                message: '删除成功',
            })
        }).catch(() => {
            ElMessage({
                type: 'info',
                message: '取消删除',
            })
        })
}

const tips = (message) => {
    ElNotification({
        title: 'Warning',
        message: message,
        type: 'warning',
        duration:3000
    })
}



export default {
    handleDelete,
    tips
}