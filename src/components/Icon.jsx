import * as LucideIcons from 'lucide-react'

export default function Icon({ name, size = 16, ...props }) {
  const LucideIcon = LucideIcons[name]
  if (!LucideIcon) return null
  return <LucideIcon size={size} strokeWidth={1.5} {...props} />
}
