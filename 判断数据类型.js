// 判断数据类型
/**
 *
 * @param {*} tgt 目标数据
 * @param {*} type 数据类型
 */
export function DataType(tgt, type) {
  const dataType = Object.prototype.toString.call(tgt).replace(/\[object /g, "").replace(/\]/g, "").toLowerCase();
  return type ? dataType === type : dataType;
}
