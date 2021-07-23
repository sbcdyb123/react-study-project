import { cloneDeep } from 'lodash'

/*******
 * @Date: 2021-07-22 23:01:46
 * @name: 方龙
 * @description: 对传入的值进行布尔判断，主要排除0为false的情况
 * @param {unknown} value 传入需要判断的值
 * @return {boolean}
 */
export const isFalsy = (value: unknown): boolean =>
  value === 0 ? false : !value
/*******
 * @Date: 2021-07-22 22:57:19
 * @name: 方龙
 * @description 删除传入的对象中属性值为空的属性
 * @param {object} object 传入的对象
 * @return {object}
 */
export const cleanObject = (object: any) => {
  const result = cloneDeep(object)
  Object.keys(result).forEach((key) => {
    const value = result[key]
    if (isFalsy(value)) {
      delete result[key]
    }
  })
  return result
}
