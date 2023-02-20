
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
        }).catch(() => {
            ElMessage({
                type: 'info',
                message: '取消删除',
            })
        })
}

const warning = (message) => {
    ElNotification({
        title: 'Warning',
        message: message || "操作失败",
        type: 'warning',
        duration:3000
    })
}

const success = (message) => {
    ElNotification({
        title: 'Success',
        message: message || "操作成功",
        type: 'success',
        duration:3000
    })
}



export default {
    handleDelete,
    warning,
    success
}