"use client"

import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface FilterProps {
  title: string; 
  value: string; 
  placeholder?: string; 
  options: { value: string; label: string }[]; 
  onChange: (value: string) => void; 
}

/**
 * Filtros de busca
 * Removido do código por enquanto
 */
export const Filter: React.FC<FilterProps> = ({
  title,
  value,
  placeholder = "Selecione",
  options,
  onChange,
}) => {
  return (
    <div>
      <Label>{title}</Label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map((opt) => (
            <SelectItem key={opt.value} value={opt.value}>
              {opt.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
