export const useAnnouncements = () => {
  const STORAGE_KEY = 'hidden_announcements'

  /**
   * Get hidden announcements list
   * @returns array of hidden announcements ids, null if not found
   */
  const getHidden = (): number[] | null => {
    const savedList = localStorage.getItem(STORAGE_KEY)
    return savedList ? JSON.parse(savedList) : null
  }

  /**
   * 
   * @param list is the array of hidden announcements API Ids to save to the list
   * It saves directly to localStorage and overrides any old saved data
   */
  const saveHidden = (list: number[]) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list))
  }

  /**
   * Adds an announcement to the hidden list
   * @param id is the API ID of the announcements to add to the list
   */
  const addItem = (id: number) => {
    let list = getHidden()
    if (list) {
      if (list.indexOf(id) === -1) list.push(id)
      else return
    }
    else list = [id]
    saveHidden(list)
  }

  /**
   * Removes a hidden announcement from the list
   * @param id is the API ID of the announcement to remove from the hidden list
   */
  const removeItem = (id: number) => {
    let list = getHidden()
    if (list) {
      const idx = list.indexOf(id)
      if (idx !== -1) {
        list.splice(idx, 1)
      }
      else return
    }
    else list = []
    saveHidden(list)
  }
  return {
    saveHidden,
    getHidden,
    addItem,
    removeItem
  }
}
