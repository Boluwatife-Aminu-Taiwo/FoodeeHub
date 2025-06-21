export interface Location {
  id: string
  name: string
  state: string
  lga?: string
  type: "state" | "city" | "area"
  coordinates?: {
    lat: number
    lng: number
  }
}

export interface LocationSearchProps {
  placeholder?: string
  onLocationSelect?: (location: Location) => void
  className?: string
  disabled?: boolean
  value?: Location | null
}

export interface LocationDropdownProps {
  isOpen: boolean
  locations: Location[]
  searchTerm: string
  onLocationSelect: (location: Location) => void
  onClose: () => void
}

export interface LocationItemProps {
  location: Location
  onSelect: (location: Location) => void
}

export interface LocationConfirmationProps {
  location: Location
  onClear: () => void
  className?: string
}
