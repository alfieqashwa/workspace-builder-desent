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
    desk: MOCK_PRODUCTS.find((p) => p.id === "desk-standing") || null,
    chair: MOCK_PRODUCTS.find((p) => p.id === "chair-ergonomic") || null,
    lamp: MOCK_PRODUCTS.find((p) => p.id === "lamp-minimal") || null,
    monitorLeft: null,
    monitorCenter: MOCK_PRODUCTS.find((p) => p.id === "monitor-4k") || null,
    monitorRight: null,
    plant: MOCK_PRODUCTS.find((p) => p.id === "plant-monstera") || null,
    coffee: null,
    outdoor: null,
    relax: null,
    garage: null,
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

    if (
      !draggedProduct ||
      !acceptCategory ||
      draggedProduct.category !== acceptCategory
    ) {
      return;
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
      <div className="flex flex-col gap-8 p-6 max-w-7xl mx-auto min-h-screen">
        {/* HEADER SECTION (SEPERTI SKETSA) */}
        <div className="text-center">
          <h1 className="text-3xl font-extrabold text-slate-100">
            Design Your Workspace!
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            — Create Your Perfect Setup! —
          </p>
        </div>

        {/* MAIN STAGE CONTAINER */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* LEFT SIDEBAR: PRODUCT CATALOG */}
          <div className="lg:col-span-3 bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-col gap-3 max-h-[520px] overflow-y-auto">
            <h2 className="text-sm font-bold text-slate-300 uppercase tracking-wider">
              Catalog
            </h2>
            <div className="flex flex-col gap-2.5">
              {MOCK_PRODUCTS.map((product) => (
                <DraggableItem key={product.id} product={product} />
              ))}
            </div>
          </div>

          {/* MAIN ROOM CANVAS */}
          <div className="lg:col-span-9 bg-slate-950 border border-slate-800 rounded-2xl p-8 flex flex-col items-center justify-between min-h-[520px] relative overflow-hidden shadow-2xl">
            {/* STAGE & FURNITURE LAYERING (FIX OVERLAP CHAIR & DESK) */}
            <div className="relative w-full max-w-[650px] h-[340px] flex flex-col items-center justify-end my-auto">
              {/* TOP ACCESSORIES LAYER (MONITORS, LAMP, PLANT) */}
              <div className="absolute top-0 w-full flex justify-between items-end px-4 z-20">
                {/* Lamp Slot */}
                <DroppableSlot
                  id="lamp"
                  label="Lamp"
                  acceptCategory="lamp"
                  item={slots.lamp}
                  onRemove={() => removeItem("lamp")}
                  className="w-20 h-24"
                />

                {/* Triple Monitor Slots (Sesuai Sketsa) */}
                <div className="flex gap-1.5 items-end">
                  <DroppableSlot
                    id="monitorLeft"
                    label="+ Monitor"
                    acceptCategory="monitor"
                    item={slots.monitorLeft}
                    onRemove={() => removeItem("monitorLeft")}
                    className="w-28 h-28"
                  />
                  <DroppableSlot
                    id="monitorCenter"
                    label="Main Monitor"
                    acceptCategory="monitor"
                    item={slots.monitorCenter}
                    onRemove={() => removeItem("monitorCenter")}
                    className="w-32 h-32"
                  />
                  <DroppableSlot
                    id="monitorRight"
                    label="+ Monitor"
                    acceptCategory="monitor"
                    item={slots.monitorRight}
                    onRemove={() => removeItem("monitorRight")}
                    className="w-28 h-28"
                  />
                </div>

                {/* Plant Slot */}
                <DroppableSlot
                  id="plant"
                  label="Plant"
                  acceptCategory="plant"
                  item={slots.plant}
                  onRemove={() => removeItem("plant")}
                  className="w-20 h-24"
                />
              </div>

              {/* DESK LAYER (MIDDLE) */}
              <div className="w-full h-32 z-10 translate-y-2">
                <DroppableSlot
                  id="desk"
                  label="Select Desk"
                  acceptCategory="desk"
                  item={slots.desk}
                  onRemove={() => removeItem("desk")}
                  className="w-full h-full border-dashed"
                />
              </div>

              {/* CHAIR LAYER (FOREGROUND) -> Positioned below with positive z-index and translateY to prevent overlap */}
              <div className="absolute -bottom-12 z-30 w-36 h-40">
                <DroppableSlot
                  id="chair"
                  label="Select Chair"
                  acceptCategory="chair"
                  item={slots.chair}
                  onRemove={() => removeItem("chair")}
                  className="w-full h-full shadow-2xl bg-slate-900/90 backdrop-blur-sm"
                />
              </div>
            </div>

            {/* FLOATING ACTION RENT BUTTON (SEPERTI SKETSA) */}
            <div className="mt-6 z-40 flex flex-col items-center gap-2">
              <span className="text-xs text-slate-400 font-semibold tracking-wide">
                Ready to Rent?
              </span>
              <button
                onClick={() => alert(`Total Monthly Rent: $${totalPrice}`)}
                className="bg-emerald-500 hover:bg-emerald-400 active:scale-95 text-slate-950 font-black px-8 py-3.5 rounded-xl flex items-center gap-2 transition-all shadow-lg shadow-emerald-500/20 text-base"
              >
                <ShoppingBag className="w-5 h-5" />
                Rent Your Setup (${totalPrice}/mo)
              </button>
            </div>
          </div>
        </div>

        {/* EXTRA LIFESTYLE ZONES (DAPAT DIPILIH DARI SKETSA BOTTOM ROW) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-slate-800">
          <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-3 flex flex-col gap-2">
            <span className="text-xs font-bold text-slate-400 text-center">
              Coffee Station
            </span>
            <DroppableSlot
              id="coffee"
              label="+ Coffee Machine"
              acceptCategory="coffee"
              item={slots.coffee}
              onRemove={() => removeItem("coffee")}
              className="h-24"
            />
          </div>

          <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-3 flex flex-col gap-2">
            <span className="text-xs font-bold text-slate-400 text-center">
              Outdoor Gear
            </span>
            <DroppableSlot
              id="outdoor"
              label="+ Surfboard / Moto"
              acceptCategory="outdoor"
              item={slots.outdoor}
              onRemove={() => removeItem("outdoor")}
              className="h-24"
            />
          </div>

          <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-3 flex flex-col gap-2">
            <span className="text-xs font-bold text-slate-400 text-center">
              Relax Zone
            </span>
            <DroppableSlot
              id="relax"
              label="+ Bean Bag"
              acceptCategory="relax"
              item={slots.relax}
              onRemove={() => removeItem("relax")}
              className="h-24"
            />
          </div>

          <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-3 flex flex-col gap-2">
            <span className="text-xs font-bold text-slate-400 text-center">
              Garage Space
            </span>
            <DroppableSlot
              id="garage"
              label="+ Tool Shelf"
              acceptCategory="garage"
              item={slots.garage}
              onRemove={() => removeItem("garage")}
              className="h-24"
            />
          </div>
        </div>
      </div>

      <DragOverlay>
        {activeProduct ? (
          <div className="p-3 border border-emerald-500/50 rounded-xl bg-slate-900 text-slate-100 shadow-2xl flex items-center gap-3 opacity-95 scale-105">
            <img
              src={activeProduct.image}
              alt=""
              className="w-10 h-10 object-contain"
            />
            <span className="font-medium text-sm">{activeProduct.name}</span>
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}
