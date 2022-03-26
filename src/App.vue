<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <div class="common-layout">
    <el-container>
      <el-header >
        <el-row type="flex" justify="center" style="background-color: #f5f7fa; text-align: center;">
          <el-col :span="24">
            <h1>欢迎登录</h1>
          </el-col>
        </el-row>
      </el-header>
      <el-main>
        <el-row justify="center">
          <el-col :span="8">
            <RouterView />
          </el-col>
        </el-row>
      </el-main>
      <el-footer>
        <el-row type="flex" justify="center" style="background-color: #f5f7fa; text-align: center;">
          <el-col :span="8">
            <h1>版权所有</h1>
          </el-col>
        </el-row>
      </el-footer>
    </el-container>
  </div>
</template>
