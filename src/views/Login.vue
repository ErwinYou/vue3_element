<template>
    <el-form
        ref="ruleFormRef"
        :model="ruleForm"
        status-icon
        :rules="rules"
        label-width="120px"
        class="demo-ruleForm"
    >
        <el-form-item label="用户名" prop="username">
            <el-input v-model="ruleForm.username" autocomplete="off" />
        </el-form-item>
        <el-form-item label="密码" prop="password">
            <el-input v-model="ruleForm.password" type="password" autocomplete="off" />
        </el-form-item>
        <el-form-item>
            <el-row>
                <el-col :span="24">
                    <el-button type="primary" @click="submitForm(ruleFormRef)">登录</el-button>
                    <el-button type="primary" @click="userRegister">注册</el-button>
                    <el-button @click="resetForm(ruleFormRef)">重置</el-button>
                </el-col>
            </el-row>
        </el-form-item>
    </el-form>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import type { FormInstance } from 'element-plus'
import axios from 'axios'
import global from '@/global';
import { ElMessage } from 'element-plus'
import router from '@/router';

const ruleFormRef = ref<FormInstance>()
// 校验用户名
const checkUserName = (rule: any, value: any, callback: any) => {
    if (value === '') {
        callback(new Error('请输入用户名'))
    } else {
        callback()
    }
}
// 校验密码
const validatePass = (rule: any, value: any, callback: any) => {
    if (value === '') {
        callback(new Error('请输入密码'))
    } else {
        if (ruleForm.password !== '') {
            if (!ruleFormRef.value) return
            ruleFormRef.value.validateField('checkPass', () => null)
        }
        callback()
    }
}

const ruleForm = reactive({
    password: '',
    username: '',
})

const rules = reactive({
    password: [{ validator: validatePass, trigger: 'blur' }],
    username: [{ validator: checkUserName, trigger: 'blur' }]
})
const userLogin = () => {
    let user = {
        username: ruleForm.username,
        password: ruleForm.password
    }
    axios.post(global.HOST_URL + "/user/login", user).then(
        res => {
            res = res.data;
            console.log('res =>', res);
            // 登录成功
            if (res.code === 0) {
                ElMessage({
                    message: '登录成功',
                    type: 'success',
                })
                // 存储用户信息
                // localStorage.setItem('user', JSON.stringify(res.data));
                // 跳转到首页
                router.push('/');
            } else {
                ElMessage({
                    message: '登录失败',
                    type: 'error',
                })
            }
        }
    )
}
const userRegister = () => {
    let user = {
        username: ruleForm.username,
        password: ruleForm.password
    }
    axios.post(global.HOST_URL + "/user/register", user).then(
        res => {
            res = res.data;
            console.log('res =>', res);
            // 登录成功
            if (res.code === 0) {
                ElMessage({
                    message: res.msg,
                    type: 'success',
                })
                // 存储用户信息
                // localStorage.setItem('user', JSON.stringify(res.data));
                // 跳转到首页
                router.push('/login');
            } else {
                ElMessage({
                    message: res.msg,
                    type: 'error',
                })
            }
        }
    )
}
const submitForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.validate((valid) => {
        if (valid) {
            userLogin()
        } else {
            console.log('error submit!')
            return false
        }
    })
}

const resetForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.resetFields()
}
</script>
