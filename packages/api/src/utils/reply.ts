export const toReply = (data: any) => {
  const items = Array.isArray(data) ? data : [data]
  return { items }
}
