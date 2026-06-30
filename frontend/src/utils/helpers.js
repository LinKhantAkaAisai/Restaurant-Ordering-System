export function formatCurrency(amount) {
  return `$${Number(amount).toFixed(2)}`
}

export function getTableFromQuery() {
  const params = new URLSearchParams(window.location.search)
  return params.get('table') || '1'
}

export function timeAgo(isoString) {
  const diffMs = Date.now() - new Date(isoString).getTime()
  const mins = Math.floor(diffMs / 60000)
  if (mins < 1) return 'just now'
  if (mins === 1) return '1 min ago'
  return `${mins} min ago`
}

export const STATUS_FLOW = ['pending', 'cooking', 'served']

export const STATUS_LABEL = {
  pending: 'Pending',
  cooking: 'Cooking',
  served: 'Served',
}
