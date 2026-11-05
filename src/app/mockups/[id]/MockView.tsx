"use client";

import { MOCKS } from "@/features/mockups/designs";

export function MockView({ id }: { id: string }) {
  const Mock = MOCKS[id];
  return <Mock />;
}
