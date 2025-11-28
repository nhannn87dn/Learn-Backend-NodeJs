import React from "react"
import { useForm } from "react-hook-form"
import {
  Form,
} from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"

type FormValues = {
  query: string
}

interface SearchFormProps {
  onSearch?: (query: string) => void
}

const SearchForm: React.FC<SearchFormProps> = ({ onSearch }) => {
  const form = useForm<FormValues>({ defaultValues: { query: "" } })

  function handleSearch(values: FormValues) {
    const q = values.query?.trim() ?? ""
    if (onSearch) onSearch(q)
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSearch)}
        className="flex items-center bg-white rounded-full"
        role="search"
        aria-label="Tìm kiếm sản phẩm"
      >
        <input
          type="text"
          {...form.register("query")}
          placeholder="Tìm kiếm sản phẩm..."
          className="flex-1 rounded-l-md  border-0 px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <Button aria-label="Tìm kiếm" type="submit" className="rounded-l-none rounded-r-md ml-0 w-10 bg-transparent hover:bg-transparent text-indigo-500">
          <Search size={20}  />
        </Button>
      </form>
    </Form>
  )
}

export default SearchForm
