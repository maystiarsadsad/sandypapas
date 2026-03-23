'use client';

import { categories } from '@/lib/data';

interface CategoryTabsProps {
  selected: string;
  onSelect: (id: string) => void;
}

export default function CategoryTabs({ selected, onSelect }: CategoryTabsProps) {
  return (
    <div className="w-full overflow-x-auto py-4 scrollbar-hide">
      <div className="flex gap-2 px-4 md:px-0 md:justify-center min-w-max">
        {categories.map((cat) => {
          const isActive = selected === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => onSelect(cat.id)}
              className={`
                flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold
                transition-all duration-300 whitespace-nowrap cursor-pointer
                ${isActive
                  ? 'bg-brand-red text-white shadow-lg shadow-brand-red/30 scale-105'
                  : 'bg-brand-dark-surface text-brand-muted hover:bg-brand-dark-card hover:text-white'
                }
              `}
            >
              <span className="text-lg">{cat.icon}</span>
              {cat.name}
            </button>
          );
        })}
      </div>
    </div>
  );
}
