<script setup>
import { computed } from 'vue'

const props = defineProps({
  data: { type: Object, required: true }
})

const isNonEmptyString = v => typeof v === 'string' && v.trim().length > 0
const normalizeUrl = u => { try { return new URL(u).toString() } catch { return '' } }
const isValidRow = r => r && isNonEmptyString(r.label) && isNonEmptyString(r.purpose) && isNonEmptyString(r.link)

const catalog = computed(() => {
  const sections = Array.isArray(props.data?.sections) ? props.data.sections : []
  const clean = sections.map(s => {
    const title = isNonEmptyString(s?.title) ? s.title.trim() : ''
    const rows = Array.isArray(s?.rows) ? s.rows : []
    const validRows = rows.map(r => ({
      label: String(r?.label ?? '').trim(),
      purpose: String(r?.purpose ?? '').trim(),
      link: normalizeUrl(String(r?.link ?? '').trim()),
      icon: String(r?.icon ?? '').trim()
    })).filter(isValidRow)
    return { title, rows: validRows }
  }).filter(sec => isNonEmptyString(sec.title) && sec.rows.length > 0)
  return { sections: clean }
})
</script>

<template>
  <section v-if="catalog.sections.length === 0">Нет данных</section>
  <section v-else>
    <div v-for="(sec, i) in catalog.sections" :key="i" class="vp-section">
      <h2>{{ sec.title }}</h2>
      <div class="table-wrapper">
        <table>
          <thead>
          <tr>
            <th>Платформа</th>
            <th>Назначение</th>
            <th>Ссылка</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(row, j) in sec.rows" :key="j">
            <td>
              <span v-if="row.icon" aria-hidden="true" class="icon">{{ row.icon }}</span>
              <span class="label">{{ row.label }}</span>
            </td>
            <td>{{ row.purpose }}</td>
            <td><a :href="row.link" target="_blank" rel="noopener noreferrer">{{ row.link }}</a></td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </section>
</template>

<style scoped>
.vp-section { margin-block: 2rem }
.table-wrapper { overflow-x: auto }
table { width: 100%; border-collapse: collapse }
th, td { padding: .75rem 1rem; border-bottom: 1px solid var(--vp-c-divider) }
th { text-align: left; font-weight: 600 }
.icon { margin-right: .5rem }
.label { vertical-align: middle }
</style>
