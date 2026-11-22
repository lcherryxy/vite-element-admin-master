<template>
  <el-dialog
    v-model="visible"
    title="完善个人信息"
    width="min(480px, 92vw)"
    append-to-body
    destroy-on-close
  >
    <el-form ref="formRef" :model="form" :rules="rules" label-width="86px">
      <el-form-item label="昵称" prop="name">
        <el-input v-model.trim="form.name" maxlength="20" show-word-limit placeholder="请输入昵称" />
      </el-form-item>
      <el-form-item label="性别" prop="gender">
        <el-radio-group v-model="form.gender">
          <el-radio value="男">男</el-radio>
          <el-radio value="女">女</el-radio>
          <el-radio value="保密">保密</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="生日" prop="birthday">
        <el-date-picker
          v-model="form.birthday"
          type="date"
          value-format="YYYY-MM-DD"
          placeholder="请选择生日"
          class="full-width"
        />
      </el-form-item>
      <el-form-item label="个人简介" prop="bio">
        <el-input
          v-model="form.bio"
          type="textarea"
          :rows="3"
          maxlength="100"
          show-word-limit
          placeholder="简单介绍一下自己"
        />
      </el-form-item>
    </el-form>

    <template #footer>
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="handleSubmit">保存</el-button>
    </template>
  </el-dialog>
</template>

<script setup>
import { computed, reactive, ref, watch } from 'vue'
import { ElMessage } from 'element-plus'
import { useUserStore } from '@/store'

const props = defineProps( {
  modelValue : {
    type : Boolean,
    default : false
  }
} )

const emit = defineEmits( ['update:modelValue', 'success'] )

const userStore = useUserStore()
const visible = computed( {
  get : () => props.modelValue,
  set : value => emit( 'update:modelValue', value )
} )

const formRef = ref( null )
const form = reactive( {
  name : '',
  gender : '保密',
  birthday : '',
  bio : ''
} )

const rules = {
  name : [
    { required : true, message : '请输入昵称', trigger : 'blur' },
    { min : 2, max : 20, message : '昵称长度为 2-20 个字符', trigger : 'blur' }
  ],
  birthday : [{ required : true, message : '请选择生日', trigger : 'change' }]
}

watch( visible, value => {
  if ( !value ) return
  form.name = userStore.name || ''
  form.gender = userStore.gender || '保密'
  form.birthday = userStore.birthday || ''
  form.bio = userStore.bio || ''
  formRef.value?.clearValidate()
} )

const handleSubmit = async() => {
  const valid = await formRef.value?.validate().catch( () => false )
  if ( !valid ) return
  userStore.updateProfile( {
    name : form.name,
    gender : form.gender,
    birthday : form.birthday,
    bio : form.bio
  } )
  ElMessage.success( '个人信息保存成功' )
  visible.value = false
  emit( 'success' )
}

defineOptions( {
  name : 'ProfileDialog'
} )
</script>

<style lang="scss" scoped>
.full-width {
  width: 100%;
}
</style>
