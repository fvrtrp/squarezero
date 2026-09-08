type CategoryChipProps = {
  category: string
  active?: boolean
  onClick?: () => void
}

export default function CategoryChip({ category, active, onClick }: CategoryChipProps) {
  const className = `categoryChip${active ? " isActive" : ""}`

  if (onClick) {
    return (
      <button
        type="button"
        className={className}
        aria-pressed={active}
        onClick={onClick}
      >
        {category}
      </button>
    )
  }

  return <span className={className}>{category}</span>
}
