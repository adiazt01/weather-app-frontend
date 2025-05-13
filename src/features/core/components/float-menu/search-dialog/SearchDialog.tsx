import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  Command
} from "@/components/ui/command"
import { Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useFavoritesStore } from "@/features/weather/stores/favorites.store"
import { useAuthStore } from "@/features/auth/stores/auth.store"
import { useState, useEffect } from "react"
import type { CityFavorite } from "@/features/weather/interface/city-favorite.interface"
import { useSearchHistoryStore } from "../../../stores/search-history.store"
import { useMutation } from "@tanstack/react-query"
import { useDebounce } from "@/hooks/useDebounce"
import { getAutoComplete } from "@/features/weather/services/weather.service"
import type { AutoComplete } from "@/features/weather/interface/autocomplete.interface"
import { Skeleton } from "@/components/ui/skeleton"
import type { CityFavoriteSchema } from "@/features/weather/schemas/city-favorites.schema"
import { useSearchParams } from "react-router"

interface SearchDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export const SearchDialog = ({ open, onOpenChange }: SearchDialogProps) => {
  const { favorites, addFavorite, removeFavorite } = useFavoritesStore()
  const { isAuthenticated } = useAuthStore()
  const { addCityToHistory } = useSearchHistoryStore()
  const [searchQuery, setSearchQuery] = useState("")
  const debouncedSearchQuery = useDebounce(searchQuery, 300)
  const [searchResults, setSearchResults] = useState<AutoComplete[]>([])
  const [_, setSearchParams] = useSearchParams();


  const mutation = useMutation({
    mutationFn: (query: string) => getAutoComplete({ city: query }),
    onSuccess: (data) => {
      if (data) {
        setSearchResults(Array.isArray(data) ? data : [data])
      } else {
        setSearchResults([])
      }
    },
    onError: () => {
      setSearchResults([])
    },
  })

  useEffect(() => {
    if (debouncedSearchQuery.length > 2 && open) {
      mutation.mutate(debouncedSearchQuery)
    }
  }, [debouncedSearchQuery, open])

  useEffect(() => {
    if (!open) {
      setSearchQuery("")
      setSearchResults([])
    }
  }, [open])

  const handleSearch = (query: string) => {
    setSearchQuery(query)
  }

  const handleSelectCity = (city: AutoComplete) => {
    addCityToHistory({
      country: city.country,
      createdAt: new Date(),
      id: city.id,
      latitude: city.latitude,
      longitude: city.longitude,
      name: city.name,
      region: city.region,
      updatedAt: new Date(),
    })
    onOpenChange(false)    
    setSearchParams({ city: city.name })
  }

  const toggleFavorite = (city: CityFavoriteSchema | CityFavorite) => {
    if (favorites.some((fav) => fav.id === city.country)) {
      removeFavorite(city.country)
    }
    else {
      addFavorite({
        country: city.country,
        latitude: city.latitude,
        longitude: city.longitude,
        name: city.name,
        region: city.region,
      })
    } 
  }

  const isFavorite = (cityId: string) => favorites.some((fav) => fav.id === cityId)

  return (
    <CommandDialog open={open} onOpenChange={onOpenChange}>
      <Command shouldFilter={false}>
        <CommandInput placeholder="Buscar ciudades..." value={searchQuery} onValueChange={handleSearch} />
        <CommandList>
          {mutation.isPending && <CommandEmpty>
            <Skeleton className="h-full mx-2 px-2 py-3.5" />
          </CommandEmpty>}

          {!mutation.isPending && searchResults.length === 0 && searchQuery.length > 2 && (
            <CommandEmpty>No se encontraron resultados.</CommandEmpty>
          )}


          {searchResults.length > 0 && (
            <CommandGroup >
              {searchResults.map((city) => (
                <CommandItem
                  key={city.id}
                  onSelect={() => handleSelectCity(city)}
                  className="flex items-center justify-between cursor-pointer"
                >
                  <div className="flex items-center">
                    <span>{city.name}</span>
                    <span className="ml-2 text-sm text-muted-foreground">{city.country}</span>
                  </div>
                  {isAuthenticated && (
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={(e) => {
                        e.stopPropagation()
                        toggleFavorite({
                          country: city.country,
                          latitude: city.latitude,
                          longitude: city.longitude,
                          name: city.name,
                          region: city.region,
                          updatedAt: new Date(),
                        })
                      }}
                    >
                      <Star className={isFavorite(city.id) ? "fill-yellow-400 text-yellow-400" : ""} size={16} />
                    </Button>
                  )}
                </CommandItem>
              ))}
            </CommandGroup>
          )}

          <div className="py-2 px-2">
            <kbd className="text-xs text-muted-foreground flex items-center justify-center gap-1">
              Presiona <span className="rounded border px-1 bg-muted">⌘K</span> para abrir la búsqueda
            </kbd>
          </div>
        </CommandList>
      </Command>
    </CommandDialog>
  )
}
