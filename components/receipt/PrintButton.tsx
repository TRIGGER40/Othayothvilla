"use client";

import { Button } from "@/components/ui/Button";

export function PrintButton() {
  return (
    <Button onClick={() => window.print()} icon="receipt" iconPosition="left" className="print:hidden">
      Download / print receipt
    </Button>
  );
}
