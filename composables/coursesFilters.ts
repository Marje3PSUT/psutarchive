export const useCoursesFilters = () => {
  const route = useRoute()
  const router = useRouter()

  const search = useState<string>('courses-filters-search', () => '')
  const categorySlug = useState<string>('courses-filters-category', () => 'all')
  const page = useState<number>('courses-filters-page', () => 0)
  const sort = useState<string>('courses-filters-sort', () => 'alphabetical')
  const view = useState<'grid' | 'list'>('courses-filters-view', () => 'grid')
  const res = useState<'yes' | 'no'>('courses-filters-res', () => 'yes')

  function initFromUrl() {
    const q = route.query
    search.value = (q.query && decodeURIComponent(q.query as string)) || ''
    categorySlug.value = (q.category as string) || 'all'
    page.value = q.page ? Math.max(0, parseInt(q.page as string) - 1) : 0
    sort.value = (q.sort as string) || 'alphabetical'
    view.value = (q.view as 'grid' | 'list') || 'grid'
    res.value = (q.res as 'yes' | 'no') || 'yes'
  }

  function syncToUrl() {
    router.replace({
      query: {
        query: search.value ? encodeURIComponent(search.value) : '',
        category: categorySlug.value,
        page: String(page.value + 1),
        sort: sort.value,
        view: view.value,
        res: res.value,
      },
    })
  }

  return { search, categorySlug, page, sort, view, res, initFromUrl, syncToUrl }
}
