export const useFavCourses = () => {
  const STORAGE_KEY = 'fav_courses'

  /**
   * Get saved favorite courses list
   * @returns array of saved courses, null if not found
   */
  const getCourses = (): number[] | null => {
    const savedList = localStorage.getItem(STORAGE_KEY)
    let list = []
    try {
      list = savedList ? JSON.parse(savedList) : null
    }
    catch (e) {
      console.error("Caught error:", e)
      localStorage.removeItem(STORAGE_KEY)
    }
    return list
  }

  /**
   * 
   * @param list is the array of courses API Ids to save to favorite courses.
   * It saves directly to localStorage and overrides any old saved data
   */
  const saveFavCourses = (list: number[]) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list))
  }

  /**
   * Adds a course to the favorite courses list
   * @param courseId is the API ID of the course to add to the favorites list
   */
  const addCourse = (courseId: number) => {
    let list = getCourses()
    if (list) {
      if (list.indexOf(courseId) === -1) list.push(courseId)
      else return
    }
    else list = [courseId]
    saveFavCourses(list)
  }

  /**
   * Removes a course from the favorite courses list
   * @param courseId is the API ID of the course to remove from the favorites list
   */
  const removeCourse = (courseId: number) => {
    let list = getCourses()
    if (list) {
      const idx = list.indexOf(courseId)
      if (idx !== -1) {
        list.splice(idx, 1)
      }
      else return
    }
    else list = []
    saveFavCourses(list)
  }
  return {
    saveFavCourses,
    getCourses,
    addCourse,
    removeCourse
  }
}