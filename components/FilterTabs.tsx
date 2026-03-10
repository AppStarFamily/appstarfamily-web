'use client'

interface FilterTabsProps {
  tabs: string[]
  activeTab: string
  onTabChange: (tab: string) => void
}

export default function FilterTabs({ tabs, activeTab, onTabChange }: FilterTabsProps) {
  return (
    <div className="flex flex-wrap gap-2 justify-center">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => onTabChange(tab)}
          className={`px-4 py-2 text-sm rounded-lg border transition-all duration-200 ${
            activeTab === tab
              ? 'border-gold text-gold bg-gold/10'
              : 'border-gold/10 text-[#8B8FA8] hover:text-gold hover:border-gold/30'
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  )
}
