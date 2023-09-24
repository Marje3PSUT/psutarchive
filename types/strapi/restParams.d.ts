declare global {
  // Filters
  /** Use to create a filter query using qs */
  type StrapiRestFilters<T extends Record<any, any>> = {
    [K in keyof T]?: FilterPropertyValue<T[K]> | StrapiRestFilters<T[K]>
  }
  type ActiveFilters = { [key: string]: string }

  // Sort
  type SortOptions = {
    title: string
    key: string,
    sortHandler?: (a: StrapiItem<Record<any, any>>, b: StrapiItem<Record<any, any>>) => number
  }[]
}
export {}

/** Filter Operators.
 * To see the full list: https://docs.strapi.io/dev-docs/api/rest/filters-locale-publication#filtering
 */
interface FilterOperators {
  /** equal to */
  $eq?: string | number | Date
  /** not equal to*/
  $ne?: string | number | Date

  /** less than */
  $lt?: number | Date
  /** greater than */
  $gt?: number | Date

  /** less than or equal to */
  $lte?: number | Date
  /** greater than or equal to */
  $gte?: number | Date

  /** included in an array */
  $in?: (string | number)[]
  /** not included in an array */
  $notIn?: (string | number)[]

  $contains?: string
  $notContains?: string
  /** Contains (case-insensitive) */
  $containsi?: string
  /** Does not contain (case-insensitive) */
  $notContainsi?: string

  /** is null */
  $null?: boolean
  /** is not null */
  $notNull?: boolean

  $startsWith?: string
  $endsWith?: string
}
type FilterPropertyValue<T> = FilterOperators
