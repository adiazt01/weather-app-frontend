import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { motion } from "motion/react";

interface SearchButtonProps {
  onClick: () => void;
}

export const SearchButton = ({ onClick }: SearchButtonProps) => {
  return (
    <motion.div
      whileHover={{
        scale: 1.2,
      }}
      whileTap={{ scale: 0.9 }}
    >
      <Button size="icon" onClick={onClick} className="rounded-full size-12 shadow-lg">
        <Search className="size-6" />
      </Button>
    </motion.div>
  );
};