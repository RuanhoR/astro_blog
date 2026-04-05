<template>
  <div>
    <div class="search-btn-wrapper" @click="openSearch">
      <div
        class="search-btn"
        :title="getTranslation('Search', currentLanguage)"
      >
        {{ getTranslation('Search', currentLanguage) }}
      </div>
    </div>

    <div v-if="isSearching" class="modal-overlay" @click="closeSearch">
      <div class="search-modal" @click.stop>
        <div class="search-header">
          <h3>{{ t('searchTitle') }}</h3>
          <button class="close-btn" @click="closeSearch">&times;</button>
        </div>

        <div class="search-input-container">
          <input
            v-model="searchTerm"
            type="text"
            :placeholder="t('searchPlaceholder')"
            class="search-input"
            @input="performSearch"
            ref="searchInput"
          />
        </div>

        <div class="search-results">
          <div v-if="isSearchingFlag" class="searching-indicator">
            {{ t('searching') }}
          </div>
          <div v-else-if="searchResults.length > 0" class="results-list">
            <div
              v-for="post in searchResults"
              :key="post.id"
              class="result-item"
              @click="onResultClick(post)"
            >
              <h4>{{ post.data.title }}</h4>
              <p class="result-excerpt">
                {{
                  post.data.description ||
                  (currentLanguage === 'zh' ? '暂无描述' : 'No description')
                }}
              </p>
            </div>
          </div>
          <div
            v-else-if="searchTerm && searchResults.length === 0"
            class="no-results"
          >
            {{ t('noResults') }}
          </div>
          <div v-else class="search-hint">{{ t('searchHint') }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { getCollection } from 'astro:content'
import { ref, nextTick } from 'vue'
import { getTranslation, currentLanguage } from '../i18n/index'
const isSearching = ref<boolean>(false)
const searchTerm = ref<string>('')
const searchResults = ref<any[]>([])
const searchInput = ref<HTMLInputElement | null>(null)
const isSearchingFlag = ref<boolean>(false)
const props = defineProps<{
  posts: Awaited<ReturnType<typeof getCollection>>
}>()
const posts = props.posts
// i18n函数
type I18nKey =
  | 'searchTitle'
  | 'searchPlaceholder'
  | 'searchHint'
  | 'noResults'
  | 'searching'
function t(key: I18nKey): string {
  const translations = {
    searchTitle: getTranslation('searchTitle', currentLanguage),
    searchPlaceholder: getTranslation('searchPlaceholder', currentLanguage),
    searchHint: getTranslation('searchHint', currentLanguage),
    noResults: getTranslation('noResults', currentLanguage),
    searching: getTranslation('searching', currentLanguage),
  }
  return translations[key]
}

function openSearch() {
  // Prevent errors during server-side rendering
  if (typeof document === 'undefined') return

  isSearching.value = true
  nextTick(() => {
    if (searchInput.value) {
      searchInput.value.focus()
    }
  })
}

function closeSearch() {
  isSearching.value = false
  searchTerm.value = ''
  searchResults.value = []
  isSearchingFlag.value = false
}

function performSearch() {
  if (!searchTerm.value.trim()) {
    searchResults.value = []
    isSearchingFlag.value = false
    return
  }

  isSearchingFlag.value = true
  setTimeout(() => {
    const term = searchTerm.value.toLowerCase()
    searchResults.value = posts.filter(post => {
      const title = post.data.title?.toLowerCase() || ''
      const description = post.data.description?.toLowerCase() || ''
      const body = post.body?.toLowerCase() || ''

      return (
        title.includes(term) ||
        description.includes(term) ||
        body.includes(term)
      )
    })
    isSearchingFlag.value = false
  }, 300)
}

function onResultClick(
  post: Awaited<ReturnType<typeof getCollection>>[number],
) {
  location.href = '/blog/' + post.id
  closeSearch()
}

// 添加键盘事件监听
import { onMounted, onUnmounted } from 'vue'

onMounted(() => {
  // Only add event listener on client side
  document.addEventListener('keydown', handleKeyDown)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeyDown)
})

function handleKeyDown(e: KeyboardEvent) {
  if (e.key === 'Escape' && isSearching.value) {
    closeSearch()
  }
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding-top: 100px;
  z-index: 9999;
}

.search-modal {
  background: var(--card-bg);
  border-radius: 8px;
  width: 90%;
  max-width: 600px;
  max-height: 80vh;
  overflow: hidden;
  box-shadow: var(--card-shadow);
  border: 1px solid var(--card-border);
}

.search-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border-bottom: 1px solid var(--card-border);
}

.search-header h3 {
  margin: 0;
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--font-color-white);
}

.close-btn {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: rgb(var(--gray));
  padding: 0;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.close-btn:hover {
  color: var(--font-color-white);
}

.search-input-container {
  padding: 20px;
}

.search-input {
  width: 100%;
  padding: 12px 16px;
  border: 1px solid var(--card-border);
  border-radius: 6px;
  font-size: 16px;
  outline: none;
  transition: border-color 0.2s;
  background: var(--card-bg);
  color: var(--font-color-white);
}

.search-input::placeholder {
  color: rgb(var(--gray));
}

.search-input:focus {
  border-color: var(--accent);
  box-shadow: 0 0 0 3px var(--accent-dark);
}

.search-results {
  max-height: 400px;
  overflow-y: auto;
  padding: 0 20px 20px;
}

.searching-indicator {
  text-align: center;
  padding: 20px;
  color: rgb(var(--gray));
  font-style: italic;
}

.results-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.result-item {
  padding: 16px;
  border: 1px solid var(--card-border);
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s;
  background: var(--card-bg);
}

.result-item:hover {
  border-color: var(--accent);
  background: rgba(var(--accent), 0.05);
}

.result-item h4 {
  margin: 0 0 8px 0;
  font-size: 1rem;
  font-weight: 600;
  color: var(--font-color-white);
}

.result-excerpt {
  margin: 0;
  font-size: 0.875rem;
  color: rgb(var(--gray));
  line-height: 1.4;
}

.no-results,
.search-hint {
  text-align: center;
  padding: 40px 20px;
  color: rgb(var(--gray));
  font-size: 0.875rem;
}

/* 搜索按钮样式 */
.search-btn-wrapper {
  cursor: pointer;
  pointer-events: auto;
  position: relative;
  z-index: 1;
  display: inline-flex;
}

.search-btn-text {
  background: var(--card-bg);
  border: 1px solid var(--card-border);
  border-radius: 6px;
  padding: 0.5rem 0.75rem;
  color: var(--font-color-white);
  font-size: 1rem;
  opacity: 0.8;
  transition: all 0.2s ease;
  min-width: 80px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.search-btn-wrapper:hover .search-btn-text {
  opacity: 1;
  background: rgba(var(--accent), 0.1);
  border-color: var(--accent);
}
</style>
