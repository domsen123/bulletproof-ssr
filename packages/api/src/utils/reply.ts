export const toReply = <T = any>(data: T | T[]): { items: T[] } => {
  const items = Array.isArray(data) ? data : [data]
  return { items }
}
