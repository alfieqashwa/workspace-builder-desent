"use client";

import React, { useState } from "react";
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
} from "@dnd-kit/core";
import {
  MOCK_PRODUCTS,
  Product,
  WorkspaceSlots,
  Category,
} from "@/types/workspace";
import { DraggableItem } from "./DraggableItem";
import { DroppableSlot } from "./DroppableSlot";
import { ShoppingBag } from "lucide-react";

export default function WorkspaceBuilder() {
  const [slots, setSlots] = useState<WorkspaceSlots>({
    desk: MOCK_PRODUCTS.find((p) => p.category === "desk") || null,
    chair: MOCK_PRODUCTS.find((p) => p.category === "chair") || null,
    lamp: MOCK_PRODUCTS.find((p) => p.category === "lamp") || null,
    monitor: MOCK_PRODUCTS.find((p) => p.category === "monitor") || null,
    plant: MOCK_PRODUCTS.find((p) => p.category === "plant") || null,
  });

  const [activeProduct, setActiveProduct] = useState<Product | null>(null);

  const totalPrice = Object.values(slots).reduce(
    (acc, item) => acc + (item ? item.pricePerMonth : 0),
    0,
  );

  const handleDragStart = (event: DragStartEvent) => {
    const product = event.active.data.current?.product as Product | undefined;
    setActiveProduct(product || null);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { over, active } = event;
    setActiveProduct(null);

    if (!over) return;

    const draggedProduct = active.data.current?.product as Product | undefined;
    const acceptCategory = over.data.current?.acceptCategory as
      | Category
      | undefined;
    const slotId = over.id as keyof WorkspaceSlots;

    // VALIDASI STRICT: Hanya izinkan jika kategori produk SAMA DENGAN kategori slot
    if (
      !draggedProduct ||
      !acceptCategory ||
      draggedProduct.category !== acceptCategory
    ) {
      return; // Reject jika kategori tidak sesuai
    }

    setSlots((prev) => ({
      ...prev,
      [slotId]: draggedProduct,
    }));
  };

  const removeItem = (slotKey: keyof WorkspaceSlots) => {
    setSlots((prev) => ({ ...prev, [slotKey]: null }));
  };

  return (
    <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 p-6 max-w-7xl mx-auto h-[90vh]">
        {/* LEFT PANEL: CATALOG */}
        <div className="lg:col-span-4 bg-slate-50 border rounded-2xl p-5 flex flex-col gap-4 overflow-y-auto shadow-sm">
          <div>
            <h2 className="text-xl font-bold text-slate-900">
              Workspace Items
            </h2>
            <p className="text-xs text-slate-500">
              Drag items to their corresponding slot
            </p>
          </div>

          <div className="flex flex-col gap-3">
            {MOCK_PRODUCTS.map((product) => (
              <DraggableItem key={product.id} product={product} />
            ))}
          </div>
        </div>

        {/* RIGHT PANEL: VISUAL CANVAS */}
        <div className="lg:col-span-8 bg-gradient-to-b from-slate-100 to-slate-200 border rounded-2xl p-6 flex flex-col relative overflow-hidden shadow-inner">
          {/* ROOM CANVAS STAGE */}
          <div className="flex-1 relative w-full h-full flex items-center justify-center">
            <div className="relative w-[520px] h-[320px] flex flex-col items-center justify-end">
              {/* ON-DESK SLOTS (Lamp, Monitor, Plant) */}
              <div className="absolute top-2 w-full flex justify-between px-6 z-20 items-end">
                {/* Slot Lampu */}
                <DroppableSlot
                  id="lamp"
                  label="Lamp"
                  acceptCategory="lamp"
                  item={slots.lamp}
                  onRemove={() => removeItem("lamp")}
                  className="w-24 h-28"
                />

                {/* Slot Monitor */}
                <DroppableSlot
                  id="monitor"
                  label="Monitor"
                  acceptCategory="monitor"
                  item={slots.monitor}
                  onRemove={() => removeItem("monitor")}
                  className="w-48 h-36"
                />

                {/* Slot Tanaman */}
                <DroppableSlot
                  id="plant"
                  label="Plant"
                  acceptCategory="plant"
                  item={slots.plant}
                  onRemove={() => removeItem("plant")}
                  className="w-24 h-28"
                />
              </div>

              {/* DESK SLOT */}
              <div className="w-full h-36 z-10">
                <DroppableSlot
                  id="desk"
                  label="Desk"
                  acceptCategory="desk"
                  item={slots.desk}
                  onRemove={() => removeItem("desk")}
                  className="w-full h-full"
                />
              </div>

              {/* CHAIR SLOT */}
              <div className="absolute -bottom-10 z-30 w-40 h-44">
                <DroppableSlot
                  id="chair"
                  label="Chair"
                  acceptCategory="chair"
                  item={slots.chair}
                  onRemove={() => removeItem("chair")}
                  className="w-full h-full shadow-2xl"
                />
              </div>
            </div>
          </div>

          {/* BOTTOM CHECKOUT BAR */}
          <div className="mt-auto bg-white/90 backdrop-blur-md border rounded-xl p-4 flex items-center justify-between shadow-lg z-40">
            <div>
              <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold">
                Total Rent
              </p>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-black text-slate-900">
                  ${totalPrice}
                </span>
                <span className="text-xs text-slate-500">/ month</span>
              </div>
            </div>

            <button
              onClick={() =>
                alert("Proceeding to checkout with selected setup!")
              }
              className="bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white font-semibold px-6 py-3 rounded-xl flex items-center gap-2 transition-all shadow-md hover:shadow-emerald-200"
            >
              <ShoppingBag className="w-4 h-4" />
              Rent Your Setup
            </button>
          </div>
        </div>
      </div>

      {/* DRAG OVERLAY PREVIEW */}
      <DragOverlay>
        {activeProduct ? (
          <div className="p-3 border rounded-xl bg-white shadow-2xl flex items-center gap-3 opacity-90 scale-105">
            <img
              src={activeProduct.image}
              alt=""
              className="w-10 h-10 object-contain"
            />
            <span className="font-medium text-sm text-slate-800">
              {activeProduct.name}
            </span>
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}
