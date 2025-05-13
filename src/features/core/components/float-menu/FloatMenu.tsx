import { useEffect, useState } from "react"
import { UserMenu } from "./user-menu/UserMenu";
import { SearchButton } from "./search-button/SearchButton";
import { SearchDialog } from "./search-dialog/SearchDialog";

export const FloatingMenu = () => {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }

    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])


  return (
    <>
      <div className="fixed bottom-4 right-4 flex flex-col gap-2 items-end z-50">
        <UserMenu />
        <SearchButton
          onClick={() => setOpen(true)}
        />
      </div>

      <SearchDialog
        open={open}
        onOpenChange={setOpen}
      />
    </>
  )
}
