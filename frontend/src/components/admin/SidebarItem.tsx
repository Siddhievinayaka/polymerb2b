'use client'

import Link from 'next/link'
import { LucideIcon } from 'lucide-react'

interface SidebarItemProps {
  name: string
  href: string
  icon: LucideIcon
  enabled: boolean
}

export default function SidebarItem({
  name,
  href,
  icon: Icon,
  enabled,
}: SidebarItemProps) {
  if (!enabled) {
    return (
      <div className="group relative flex items-center gap-3 px-4 py-2 rounded-lg text-gray-400 cursor-not-allowed">
        <Icon size={18} />
        {name}

        {/* Tooltip */}
        <div className="absolute left-full ml-3 hidden group-hover:block bg-black text-white text-xs px-3 py-1 rounded-md whitespace-nowrap z-10">
          Coming Soon
        </div>
      </div>
    )
  }

  return (
    <Link
      href={href}
      className="flex items-center gap-3 px-4 py-2 rounded-lg font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-all duration-200 hover:scale-[1.02]"
    >
      <Icon size={18} />
      {name}
    </Link>
  )
}