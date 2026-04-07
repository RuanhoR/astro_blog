<template>
  <a :href="href" :class="{ active: isActive }">
    {{ displayText }}
  </a>
</template>

<script setup lang="ts">
import { ref, onMounted, watchEffect } from 'vue'
import { getTranslation, currentLanguage } from '../i18n/index'

const props = defineProps<{
  href: string
  translationKey: string
}>()

const displayText = ref('')
const isActive = ref(false)

// 动态获取翻译文本
function updateTranslation() {
  displayText.value = getTranslation(props.translationKey as any, currentLanguage)
}

// 检查当前路由是否激活
function checkActive() {
  isActive.value = window.location.pathname === props.href || 
                   (props.href !== '/' && window.location.pathname.startsWith(props.href))
}

onMounted(() => {
  updateTranslation()
  checkActive()
  
  // 监听语言变化
  const observer = new MutationObserver(() => {
    updateTranslation()
    checkActive()
  })
  
  // 监听路由变化
  window.addEventListener('popstate', checkActive)
  
  return () => {
    observer.disconnect()
    window.removeEventListener('popstate', checkActive)
  }
})

// 监听props变化
watchEffect(() => {
  updateTranslation()
})
</script>

<style scoped>
a {
  padding: 1em 0.5em;
  border-bottom: 4px solid transparent;
  text-decoration: none;
  color: var(--font-color-white);
  transition: all 0.2s ease;
}

a.active {
  text-decoration: none;
  border-bottom-color: var(--accent);
}

a:hover {
  opacity: 0.8;
}
</style>