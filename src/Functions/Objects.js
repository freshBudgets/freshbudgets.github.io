export function deepNestUpdate(object, key, value) {
  object[key] = value;
  return object;
}

export function deepNestToggle(object, key) {
  let curr = object[key];
  Object.keys(object).forEach(v => object[v] = false)
  object[key] = !curr;
  return object;
}
