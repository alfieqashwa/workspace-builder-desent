"use client";

import { Product } from "@/types/workspace";
import { useDraggable } from "@dnd-kit/core";
import Image from "next/image";
import React from "react";

export function DraggableItem({ product }: { product: Product }) {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: product.id,
      data: { product },
    });

  const style: React.CSSProperties = {
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : undefined,
    cursor: isDragging ? "grabbing" : "grab", // Menangani cursor secara langsung tanpa CSS utility conflict
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={`p-3 border border-slate-800 rounded-xl bg-slate-900 shadow-sm hover:border-slate-700 transition-all flex items-center gap-3 select-none ${
        isDragging ? "opacity-40 z-50" : ""
      }`}
    >
      <div className="relative w-14 h-14 bg-slate-950 rounded-lg flex items-center justify-center p-1.5 border border-slate-800 shrink-0 overflow-hidden">
        <Image
          src={product.image}
          alt={product.name}
          loading="eager"
          fill
          unoptimized
          sizes="56px"
          className="object-contain pointer-events-none p-1"
        />
      </div>

      <div className="flex-1 min-w-0">
        <h4 className="text-sm font-semibold text-slate-200 truncate">
          {product.name}
        </h4>
        <div className="flex items-center gap-2 mt-0.5">
          <span className="text-[10px] font-medium px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20 capitalize">
            {product.category}
          </span>
          <span className="text-xs text-slate-400">
            ${product.pricePerMonth}/mo
          </span>
        </div>
      </div>
    </div>
  );
}
