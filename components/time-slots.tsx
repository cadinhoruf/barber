"use client";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { AvailableSlot } from "@/lib/types";

interface TimeSlotsProps {
  slots: AvailableSlot[];
  selectedSlot: string | null;
  onSelectSlot: (time: string) => void;
}

export function TimeSlots({
  slots,
  selectedSlot,
  onSelectSlot,
}: TimeSlotsProps) {
  if (slots.length === 0) {
    return (
      <div className="py-4 text-muted-foreground text-center">
        Não há horários disponíveis para esta data
      </div>
    );
  }

  // Extract all time slots from the available slots
  const timeSlots = slots.flatMap((slot) => slot.times);

  return (
    <div className="space-y-2 w-full">
      <h3 className="font-medium">Horários Disponíveis</h3>
      <ScrollArea className="h-[120px]">
        <div className="gap-2 grid grid-cols-3">
          {timeSlots.map((time) => (
            <Button
              key={time}
              variant={selectedSlot === time ? "default" : "outline"}
              size="sm"
              onClick={() => onSelectSlot(time)}
            >
              {time}
            </Button>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
