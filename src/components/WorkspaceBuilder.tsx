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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ShoppingBag } from "lucide-react";
import Image from "next/image";

export default function WorkspaceBuilder() {
  const [slots, setSlots] = useState<WorkspaceSlots>({
    desk: MOCK_PRODUCTS.find((p) => p.id === "desk-standing-electric") || null,
    chair: MOCK_PRODUCTS.find((p) => p.id === "chair-herman-miller") || null,
    lamp: MOCK_PRODUCTS.find((p) => p.id === "lamp-minimal") || null,
    monitorLeft: null,
    monitorCenter:
      MOCK_PRODUCTS.find((p) => p.id === "monitor-dell-ultrasharp") || null,
    monitorRight: null,
    plant:
      MOCK_PRODUCTS.find((p) => p.id === "plant-tropical-monstera") || null,
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

  const categories: { label: string; value: string }[] = [
    { label: "All", value: "all" },
    { label: "Desks", value: "desk" },
    { label: "Chairs", value: "chair" },
    { label: "Monitors", value: "monitor" },
    { label: "Accessories", value: "accessories" },
    { label: "Lifestyle", value: "lifestyle" },
  ];

  const getFilteredProducts = (categoryValue: string) => {
    if (categoryValue === "all") return MOCK_PRODUCTS;
    if (categoryValue === "accessories") {
      return MOCK_PRODUCTS.filter((p) =>
        ["lamp", "plant"].includes(p.category),
      );
    }
    if (categoryValue === "lifestyle") {
      return MOCK_PRODUCTS.filter((p) =>
        ["coffee", "outdoor", "relax", "garage"].includes(p.category),
      );
    }
    return MOCK_PRODUCTS.filter((p) => p.category === categoryValue);
  };

  return (
    <DndContext
      id="workspace-dnd-context"
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="flex flex-col gap-8 p-6 max-w-7xl mx-auto min-h-screen">
        {/* HEADER */}
        <div className="text-center">
          <h1 className="text-3xl font-extrabold text-slate-100">
            Design Your Workspace!
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            — Create Your Perfect Setup! —
          </p>
        </div>

        {/* MAIN CONTAINER */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* LEFT SIDEBAR: TABBED CATALOG */}
          <div className="lg:col-span-4 bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-col gap-3 min-h-[520px] w-full min-w-0">
            <h2 className="text-sm font-bold text-slate-300 uppercase tracking-wider">
              Catalog
            </h2>

            <Tabs
              defaultValue="all"
              className="w-full flex-1 flex flex-col min-w-0"
            >
              {/* FIXED TABS LIST LAYOUT */}
              <div className="w-full overflow-x-auto pb-1 scrollbar-none">
                <TabsList className="flex w-max min-w-full justify-start gap-1 bg-slate-950 p-1 rounded-xl h-auto">
                  {categories.map((cat) => (
                    <TabsTrigger
                      key={cat.value}
                      value={cat.value}
                      className="text-xs px-3 py-1.5 shrink-0 rounded-lg whitespace-nowrap transition-all data-[state=active]:bg-slate-800 data-[state=active]:text-amber-400 data-[state=active]:font-semibold"
                    >
                      {cat.label}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </div>

              {categories.map((cat) => (
                <TabsContent
                  key={cat.value}
                  value={cat.value}
                  className="flex-1 flex flex-col gap-2.5 max-h-[420px] overflow-y-auto pr-1 mt-2 focus-visible:outline-none"
                >
                  {getFilteredProducts(cat.value).map((product) => (
                    <DraggableItem key={product.id} product={product} />
                  ))}
                </TabsContent>
              ))}
            </Tabs>
          </div>

          {/* CANVAS ROOM */}
          <div className="lg:col-span-8 bg-slate-950 border border-slate-800 rounded-2xl p-8 flex flex-col items-center justify-between min-h-[520px] relative overflow-hidden shadow-2xl">
            <div className="relative w-full max-w-[650px] h-[340px] flex flex-col items-center justify-end my-auto">
              {/* TOP LAYER */}
              <div className="absolute top-0 w-full flex justify-between items-end px-4 z-20">
                <DroppableSlot
                  id="lamp"
                  label="Lamp"
                  acceptCategory="lamp"
                  item={slots.lamp}
                  onRemove={() => removeItem("lamp")}
                  className="w-20 h-24"
                />

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

                <DroppableSlot
                  id="plant"
                  label="Plant"
                  acceptCategory="plant"
                  item={slots.plant}
                  onRemove={() => removeItem("plant")}
                  className="w-20 h-24"
                />
              </div>

              {/* DESK LAYER */}
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

              {/* CHAIR LAYER */}
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

            {/* ACTION BUTTON */}
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

        {/* LIFESTYLE BOTTOM ZONES */}
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
            <Image
              src={activeProduct.image}
              alt={activeProduct.name}
              width={40}
              height={40}
              unoptimized
              className="w-10 h-10 object-contain"
            />
            <span className="font-medium text-sm">{activeProduct.name}</span>
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}
