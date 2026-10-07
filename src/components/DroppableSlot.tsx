"use client";

import React from "react";
import { useDroppable } from "@dnd-kit/core";
import { Product, Category } from "@/types/workspace";
import { Plus, X } from "lucide-react";

interface DroppableSlotProps {
  id: string;
  acceptCategory: Category; // Kategori wajib
  item: Product | null;
  onRemove: () => void;
  className?: string;
  label: string;
}

export function DroppableSlot({
  id,
  acceptCategory,
  item,
  onRemove,
  className = "",
  label,
}: DroppableSlotProps) {
  const { isOver, setNodeRef } = useDroppable({
    id,
    data: { acceptCategory }, // Dikirim agar bisa divalidasi saat drag end
  });

  return (
    <div
      ref={setNodeRef}
      className={`relative flex items-center justify-center rounded-xl border-2 border-dashed transition-all ${
        isOver
          ? "border-emerald-500 bg-emerald-50/50 scale-105"
          : "border-slate-300/60 bg-black/5"
      } ${className}`}
    >
      {item ? (
        <div className="relative w-full h-full group flex items-center justify-center">
          <img
            src={item.image}
            alt={item.name}
            className="max-h-full max-w-full object-contain drop-shadow-md pointer-events-none"
          />
          <button
            onClick={(e) => {
              e.stopPropagation();
              onRemove();
            }}
            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
            title="Remove item"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-1 text-slate-400 p-2 text-center pointer-events-none">
          <Plus className="w-5 h-5 opacity-60" />
          <span className="text-[10px] uppercase tracking-wider font-semibold">
            {label}
          </span>
        </div>
      )}
    </div>
  );
}
