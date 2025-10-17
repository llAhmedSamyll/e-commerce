"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { City } from "country-state-city"
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form"

export default function SelectCity({ form }) {
  const [open, setOpen] = React.useState(false)
  const [search, setSearch] = React.useState("")
  const cities = City.getCitiesOfCountry("EG")

  // فلترة المدن حسب البحث
  const filteredCities = cities.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <FormField
      control={form.control}
      name="city"
      render={({ field }) => (
        <FormItem>
          <FormLabel>City</FormLabel>
          <FormControl>
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={open}
                  className="w-full justify-between"
                >
                  {field.value || "Select or enter a city..."}
                  <ChevronsUpDown className="opacity-50" />
                </Button>
              </PopoverTrigger>

              <PopoverContent className="w-[300px] p-0">
                <Command className="shadow-lg bg-[#F3F3F3]">
                  <CommandInput
                    placeholder="Type or select city..."
                    className="h-9"
                    value={search}
                    onValueChange={setSearch}
                  />
                  <CommandList>
                    {filteredCities.length === 0 ? (
                      <CommandEmpty>
                        <div className="p-2 text-sm text-gray-500">
                          No city found.
                          <br />
                          <Button
                            variant="link"
                            className="text-blue-600 p-0"
                            onClick={() => {
                              form.setValue("city", search)
                              setOpen(false)
                            }}
                          >
                            Add "{search}"
                          </Button>
                        </div>
                      </CommandEmpty>
                    ) : (
                      <CommandGroup>
                        {filteredCities.map((city) => (
                          <CommandItem
                            key={`${city.name}-${city.stateCode}`}
                            value={city.name}
                            onSelect={(currentValue) => {
                              form.setValue("city", currentValue)
                              setOpen(false)
                            }}
                            className="text-black"
                          >
                            {city.name}
                            <Check
                              className={cn(
                                "ml-auto",
                                field.value === city.name
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    )}
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
