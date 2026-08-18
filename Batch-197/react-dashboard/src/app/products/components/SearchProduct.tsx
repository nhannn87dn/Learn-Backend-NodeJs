import { useEffect, useState } from "react"
import { Search, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import type { ICategoryOption } from "@/app/categories/type"
import type { IBrandOption } from "@/app/brands/type"

interface SearchProductProps {
  categoryOptions: ICategoryOption[]
  brandOptions: IBrandOption[]
  searchQuery: string
  categoryQuery: string
  brandQuery: string
  onSearch: (values: { search: string; category: string; brand: string }) => void
}

const SearchProduct = ({
  categoryOptions,
  brandOptions,
  searchQuery,
  categoryQuery,
  brandQuery,
  onSearch,
}: SearchProductProps) => {
  const [category, setCategory] = useState(categoryQuery)
  const [brand, setBrand] = useState(brandQuery)
  const [keyword, setKeyword] = useState(searchQuery)

  useEffect(() => {
    setCategory(categoryQuery)
    setBrand(brandQuery)
    setKeyword(searchQuery)
  }, [searchQuery, categoryQuery, brandQuery])

  return (
    <form
      className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4"
      onSubmit={(event) => {
        event.preventDefault()
        onSearch({
          search: keyword,
          category,
          brand,
        })
      }}
    >
      <Select value={category} onValueChange={setCategory}>
        <SelectTrigger className="w-full cursor-pointer">
          <SelectValue placeholder="Select category" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All categories</SelectItem>
          {categoryOptions.map((item) => (
            <SelectItem key={item._id} value={item._id}>
              {item.category_name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select value={brand} onValueChange={setBrand}>
        <SelectTrigger className="w-full cursor-pointer">
          <SelectValue placeholder="Select brand" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All brands</SelectItem>
          {brandOptions.map((item) => (
            <SelectItem key={item._id} value={item._id}>
              {item.brand_name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={keyword}
          onChange={(event) => setKeyword(event.target.value)}
          placeholder="Search keyword"
          className="pl-9 pr-9"
        />
        {!!keyword && (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="absolute right-1 top-1/2 h-7 w-7 -translate-y-1/2 cursor-pointer"
            onClick={() => {
              setKeyword("")
              onSearch({
                search: "",
                category,
                brand,
              })
            }}
          >
            <X className="size-4" />
            <span className="sr-only">Clear keyword</span>
          </Button>
        )}
      </div>

      <Button type="submit" className="cursor-pointer">
        Search
      </Button>
    </form>
  )
}

export default SearchProduct