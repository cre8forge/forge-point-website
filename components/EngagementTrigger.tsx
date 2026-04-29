"use client";

import { useState, useCallback } from "react";
import { EngagementPopup } from "@/components/EngagementPopup";
import { useEngagementTrigger } from "@/hooks/useEngagementTrigger";

interface EngagementTriggerProps {
  pageType: "university" | "service";
}

export function EngagementTrigger({ pageType }: EngagementTriggerProps) {
  const [open, setOpen] = useState(false);
  const onTrigger       = useCallback(() => setOpen(true), []);
  const onClose         = useCallback(() => setOpen(false), []);

  useEngagementTrigger({ pageType, onTrigger });

  if (!open) return null;
  return <EngagementPopup onClose={onClose} />;
}
