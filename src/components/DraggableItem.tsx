"use client";

import { useDraggable } from "@dnd-kit/core";
import { Product } from "@/types/workspace";

export function DraggableItem({ product }: { product: Product }) {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: product.id,
      data: { product },
    });

  const style = transform
    ? { transform: `translate3d(${transform.x}px, ${transform.y}px, 0)` }
    : undefined;

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={`p-3 border rounded-xl bg-white shadow-sm hover:shadow-md cursor-grab active:cursor-grabbing transition-all flex items-center gap-3 select-none ${
        isDragging ? "opacity-40 z-50" : ""
      }`}
    >
      <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center p-1">
        <img
          src={product.image}
          alt={product.name}
          className="max-h-full object-contain"
        />
      </div>
      <div className="flex-1">
        <h4 className="text-sm font-semibold text-slate-800">{product.name}</h4>
        <p className="text-xs text-slate-500">${product.pricePerMonth}/mo</p>
      </div>
    </div>
  );
}
