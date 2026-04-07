<template>
  <div class="mobile-search">
    <button 
      class="mobile-search-btn"
      @click="toggleSearch"
      :title="t('Search')"
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M21 21L16.514 16.506L21 21ZM19 10.5C19 15.194 15.194 19 10.5 19C5.806 19 2 15.194 2 10.5C2 5.806 5.806 2 10.5 2C15.194 2 19 5.806 19 10.5Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </button>

    <div v-if="isSearching" class="mobile-search-modal-overlay" @click="closeSearch">
      <div class="mobile-search-modal" @click.stop>
        <div class="mobile-search-header">
          <h3>{{ t('searchTitle') }}</h3>
          <button class="mobile-close-btn" @click="closeSearch">&times;</button>
        </div>

        <div class="mobile-search-input-container">
          <input
            v-model="searchTerm"
            type="text"
            :placeholder="t('searchPlaceholder')"
            class="mobile-search-input"
            @input="performSearch"
            ref="searchInput"
          />
        </div>

        <div class="mobile-search-results">
          <div v-if="isSearchingFlag" class="mobile-searching-indicator">
            {{ t('searching') }}
          </div>
          <div v-else-if="searchResults.length > 0" class="mobile-results-list">
            <div
              v-for="post in searchResults"
              :key="post.id"
              class="mobile-result-item"
              @click="onResultClick(post)"
            >
              <h4>{{ post.data.title }}</h4>
              <p class="mobile-result-excerpt">
                {{
                  post.data.description ||
                  (currentLanguage === 'zh' ? '暂无描述' : 'No description')
                }}
              </p>
            </div>
          </div>
          <div
            v-else-if="searchTerm && searchResults.length === 0"
            class="mobile-no-results"
          >
            {{ t('noResults') }}
          </div>
          <div v-else class="mobile-search-hint">{{ t('searchHint') }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { getCollection } from 'astro:content'
import { ref, nextTick, onMounted, onUnmounted } from 'vue'
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
  | 'Search'
  | 'searchTitle'
  | 'searchPlaceholder'
  | 'searchHint'
  | 'noResults'
  | 'searching'

function t(key: I18nKey): string {
  return getTranslation(key, currentLanguage)
}

function toggleSearch() {
  if (typeof document === 'undefined') return
  isSearching.value = !isSearching.value
  if (isSearching.value) {
    nextTick(() => {
      if (searchInput.value) {
        searchInput.value.focus()
      }
    })
  }
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

// 键盘事件处理
onMounted(() => {
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
.mobile-search {
  display: none;
}

@media (max-width: 720px) {
  .mobile-search {
    display: block;
  }
  
  .mobile-search-btn {
    background: none;
    border: 1px solid var(--card-border);
    border-radius: 6px;
    padding: 8px;
    color: var(--font-color-white);
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    opacity: 0.8;
    transition: all 0.2s ease;
  }

  .mobile-search-btn:hover {
    opacity: 1;
    background: var(--card-hover-bg);
    border-color: var(--accent);
  }

  .mobile-search-modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.8);
    display: flex;
    justify-content: center;
    align-items: flex-start;
    padding-top: 80px;
    z-index: 9999;
  }

  .mobile-search-modal {
    background: var(--card-bg);
    border-radius: 8px;
    width: 95%;
    max-width: 500px;
    max-height: 70vh;
    overflow: hidden;
    box-shadow: var(--card-shadow);
    border: 1px solid var(--card-border);
  }

  .mobile-search-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px;
    border-bottom: 1px solid var(--card-border);
  }

  .mobile-search-header h3 {
    margin: 0;
    font-size: 1.1rem;
    font-weight: 600;
    color: var(--font-color-white);
  }

  .mobile-close-btn {
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

  .mobile-search-input-container {
    padding: 15px;
  }

  .mobile-search-input {
    width: 100%;
    padding: 12px 16px;
    border: 1px solid var(--card-border);
    border-radius: 6px;
    font-size: 16px;
    outline: none;
    background: var(--card-bg);
    color: var(--font-color-white);
  }

  .mobile-search-results {
    max-height: 300px;
    overflow-y: auto;
    padding: 0 15px 15px;
  }

  .mobile-result-item {
    padding: 12px;
    border: 1px solid var(--card-border);
    border-radius: 6px;
    cursor: pointer;
    background: var(--card-bg);
    margin-bottom: 8px;
  }

  .mobile-result-item h4 {
    margin: 0 0 6px 0;
    font-size: 0.9rem;
    font-weight: 600;
    color: var(--font-color-white);
  }
}
</style>