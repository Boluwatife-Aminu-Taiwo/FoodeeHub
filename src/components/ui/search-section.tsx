"use client"
import { Search, SlidersHorizontal, Grid, List } from "lucide-react"
import { Input } from "./input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./select"
import { AnimatedButton } from "./animated-button"
import { Badge } from "./badge"
import { GlassCard } from "./glass-card"

interface SearchSectionProps {
  searchTerm: string
  setSearchTerm: (term: string) => void
  selectedCategory: string
  setSelectedCategory: (category: string) => void
  sortBy: string
  setSortBy: (sort: string) => void
  viewMode: "grid" | "list"
  setViewMode: (mode: "grid" | "list") => void
  resultsCount: number
  categories: Array<{ category: string; count: number }>
}

export function SearchSection({
  searchTerm,
  setSearchTerm,
  selectedCategory,
  setSelectedCategory,
  sortBy,
  setSortBy,
  viewMode,
  setViewMode,
  resultsCount,
  categories,
}: SearchSectionProps) {
  const formatCategory = (category: string) => {
    return category.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())
  }

  return (
    <GlassCard className="p-6 mb-8">
      {/* Main Search Row */}
      <div className="grid lg:grid-cols-4 gap-4 mb-6">
        {/* Search Input */}
        <div className="lg:col-span-2 relative group">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-orange-500 transition-colors" />
          <Input
            placeholder="Search restaurants, cuisines, or dishes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-12 h-12 rounded-xl border-2 border-white/20 bg-white/10 backdrop-blur-sm focus:border-orange-500 focus:bg-white/20 transition-all duration-300"
          />
        </div>

        {/* Category Filter */}
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="h-12 rounded-xl border-2 border-white/20 bg-white/10 backdrop-blur-sm focus:border-orange-500">
            <SelectValue placeholder="All Categories" />
          </SelectTrigger>
          <SelectContent className="backdrop-blur-xl bg-white/90 border border-white/20">
            <SelectItem value="all">All Categories</SelectItem>
            {categories.map((cat) => (
              <SelectItem key={cat.category} value={cat.category}>
                {formatCategory(cat.category)} ({cat.count})
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Sort Filter */}
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="h-12 rounded-xl border-2 border-white/20 bg-white/10 backdrop-blur-sm focus:border-orange-500">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent className="backdrop-blur-xl bg-white/90 border border-white/20">
            <SelectItem value="featured">Featured First</SelectItem>
            <SelectItem value="rating">Highest Rated</SelectItem>
            <SelectItem value="distance">Nearest</SelectItem>
            <SelectItem value="delivery_fee">Lowest Delivery Fee</SelectItem>
            <SelectItem value="popular">Most Popular</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Results Bar */}
      <div className="flex items-center justify-between pt-4 border-t border-white/20">
        <div className="flex items-center space-x-4">
          <span className="text-sm text-gray-600 font-medium">{resultsCount} restaurants found</span>
          {selectedCategory && selectedCategory !== "all" && (
            <Badge
              variant="secondary"
              className="bg-orange-100/80 text-orange-800 backdrop-blur-sm cursor-pointer hover:bg-orange-200/80 transition-colors"
              onClick={() => setSelectedCategory("all")}
            >
              {formatCategory(selectedCategory)}
              <button className="ml-2 hover:text-orange-900">×</button>
            </Badge>
          )}
        </div>

        <div className="flex items-center space-x-2">
          <AnimatedButton
            variant={viewMode === "grid" ? "primary" : "ghost"}
            size="sm"
            onClick={() => setViewMode("grid")}
            className="p-2"
          >
            <Grid className="h-4 w-4" />
          </AnimatedButton>
          <AnimatedButton
            variant={viewMode === "list" ? "primary" : "ghost"}
            size="sm"
            onClick={() => setViewMode("list")}
            className="p-2"
          >
            <List className="h-4 w-4" />
          </AnimatedButton>
          <AnimatedButton variant="outline" size="sm" icon={<SlidersHorizontal className="h-4 w-4" />}>
            More Filters
          </AnimatedButton>
        </div>
      </div>
    </GlassCard>
  )
}
