
import { useState } from "react";
import { Input } from "@/components/ui/input";

interface EditableFieldProps {
  value: string | number;
  onSave: (value: string | number) => void;
  fieldKey: string;
  type?: "text" | "number";
  className?: string;
  editingField: string | null;
  setEditingField: (key: string | null) => void;
}

export const EditableField = ({ 
  value, 
  onSave, 
  fieldKey, 
  type = "text",
  className = "",
  editingField,
  setEditingField
}: EditableFieldProps) => {
  const [tempValue, setTempValue] = useState(value);
  const isEditing = editingField === fieldKey;

  const handleSave = () => {
    onSave(type === "number" ? Number(tempValue) : tempValue);
    setEditingField(null);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSave();
    if (e.key === "Escape") {
      setTempValue(value);
      setEditingField(null);
    }
  };

  if (isEditing) {
    return (
      <Input
        type={type}
        value={tempValue}
        onChange={(e) => setTempValue(e.target.value)}
        onBlur={handleSave}
        onKeyDown={handleKeyDown}
        className="w-full text-center"
        autoFocus
      />
    );
  }

  return (
    <button
      onClick={() => {
        setEditingField(fieldKey);
        setTempValue(value);
      }}
      className={`w-full text-left hover:bg-gray-100 px-2 py-1 rounded transition-colors cursor-pointer border border-transparent hover:border-gray-300 ${className}`}
    >
      {type === "number" && typeof value === "number" ? `${value} Kč` : value}
    </button>
  );
};
