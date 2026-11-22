<template>
  <el-dialog
    v-model="visible"
    :title="isPhone ? '绑定 / 更换手机号' : '绑定 / 更换邮箱'"
    width="min(420px, 92vw)"
    append-to-body
    destroy-on-close
    @closed="resetForm"
  >
    <el-form ref="formRef" :model="form" :rules="rules" label-width="86px">
      <el-form-item :label="isPhone ? '手机号' : '邮箱'" prop="account">
        <el-input
          v-model.trim="form.account"
          :placeholder="isPhone ? '请输入 11 位手机号' : '请输入邮箱地址'"
          maxlength="50"
          clearable
        />
      </el-form-item>
      <el-form-item label="验证码" prop="code">
        <div class="code-row">
          <el-input v-model.trim="form.code" placeholder="请输入 6 位验证码" maxlength="6" />
          <el-button class="code-btn" :disabled="countdown > 0" @click="sendCode">
            {{ countdown > 0 ? `${countdown}s 后重发` : '获取验证码' }}
          </el-button>
        </div>
      </el-form-item>
    </el-form>
    <el-alert type="info" :closable="false" show-icon title="演示环境验证码固定为 123456" />

    <template #footer>
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" :loading="submitting" @click="handleSubmit">
        {{ isPhone ? '确认绑定手机' : '确认绑定邮箱' }}
      </el-button>
    </template>
  </el-dialog>
</template>

<script setup>
import { computed, reactive, ref, watch, onBeforeUnmount } from 'vue'
import { ElMessage } from 'element-plus'
import { useUserStore } from '@/store'

const props = defineProps( {
  modelValue : {
    type : Boolean,
    default : false
  },
  // phone：手机号绑定/更换；email：邮箱绑定/更换
  type : {
    type : String,
    default : 'phone'
  }
} )

const emit = defineEmits( ['update:modelValue', 'success'] )

const userStore = useUserStore()
const isPhone = computed( () => props.type === 'phone' )
const visible = computed( {
  get : () => props.modelValue,
  set : value => emit( 'update:modelValue', value )
} )

const formRef = ref( null )
const form = reactive( {
  account : '',
  code : ''
} )
const submitting = ref( false )
const countdown = ref( 0 )
let timer = null

const validateAccount = ( rule, value, callback ) => {
  if ( !value ) {
    callback( new Error( isPhone.value ? '请输入手机号' : '请输入邮箱' ) )
    return
  }
  if ( isPhone.value && !/^1[3-9]\d{9}$/.test( value ) ) {
    callback( new Error( '手机号格式不正确' ) )
    return
  }
  if ( !isPhone.value && !/^[\w.+-]+@[\w-]+\.[\w.-]+$/.test( value ) ) {
    callback( new Error( '邮箱格式不正确' ) )
    return
  }
  callback()
}

const rules = {
  account : [{ validator : validateAccount, trigger : 'blur' }],
  code : [
    { required : true, message : '请输入验证码', trigger : 'blur' },
    { pattern : /^\d{6}$/, message : '验证码为 6 位数字', trigger : 'blur' }
  ]
}

// 打开弹窗时带入当前已绑定的账号，方便直接修改
watch( visible, value => {
  if ( !value ) return
  form.account = ( isPhone.value ? userStore.phone : userStore.email ) || ''
  form.code = ''
  formRef.value?.clearValidate()
} )

const clearTimer = () => {
  if ( timer ) {
    clearInterval( timer )
    timer = null
  }
}

const startCountdown = () => {
  countdown.value = 60
  clearTimer()
  timer = setInterval( () => {
    countdown.value -= 1
    if ( countdown.value <= 0 ) clearTimer()
  }, 1000 )
}

const sendCode = async() => {
  const valid = await formRef.value?.validateField( 'account' ).catch( () => false )
  if ( !valid ) return
  startCountdown()
  ElMessage.success( '验证码已发送（演示验证码：123456）' )
}

const handleSubmit = async() => {
  const valid = await formRef.value?.validate().catch( () => false )
  if ( !valid ) return
  if ( form.code !== '123456' ) {
    ElMessage.error( '验证码不正确' )
    return
  }
  submitting.value = true
  if ( isPhone.value ) {
    userStore.updatePhone( form.account )
  } else {
    userStore.updateEmail( form.account )
  }
  submitting.value = false
  ElMessage.success( isPhone.value ? '手机号绑定成功' : '邮箱绑定成功' )
  visible.value = false
  emit( 'success', form.account )
}

const resetForm = () => {
  form.account = ''
  form.code = ''
  countdown.value = 0
  clearTimer()
  formRef.value?.clearValidate()
}

onBeforeUnmount( clearTimer )

defineOptions( {
  name : 'BindAccountDialog'
} )
</script>

<style lang="scss" scoped>
.code-row {
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;

  .code-btn {
    flex: 0 0 auto;
  }
}
</style>
