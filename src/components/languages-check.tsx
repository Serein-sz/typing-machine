"use client"

import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "./ui/command"
import { languages } from "@/data/languages"
import { useState } from "react"
import useCodeStore from "@/store/useCodeStore"
import { useShallow } from "zustand/react/shallow"

export function LanguagesCheck() {
  const [open, setOpen] = useState(false)
  const currentLanguage = useCodeStore(state => state.currentLanguage);
  const changeLanguage = useCodeStore(useShallow(state => state.changeLanguage));
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between ml-auto"
        >
          {currentLanguage
            ? currentLanguage
            : "Select language..."}
          <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command className="overflow-auto">
          <CommandInput placeholder="Search language..." className="h-9" />
          <CommandEmpty>No language found.</CommandEmpty>
          <CommandGroup className="h-[400px] overflow-auto">
            {languages.map((language) => (
              <CommandItem
                key={language}
                value={language}
                onSelect={(currentValue) => {
                  changeLanguage(currentValue)
                  setOpen(false)
                }}
              >
                {language}
                <CheckIcon
                  className={cn(
                    "ml-auto h-4 w-4",
                    language === currentLanguage ? "opacity-100" : "opacity-0"
                  )}
                />
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
