"use client";

import { useState } from "react";
import { Phone, Mail, Copy, Check, Unlock } from "lucide-react";
import { cn } from "@/lib/utils";

interface ContactInfoBadgeProps {
  phone?: string | null;
  email?: string | null;
  compact?: boolean;
}

export function ContactInfoBadge({ phone, email, compact = false }: ContactInfoBadgeProps) {
  const [copiedField, setCopiedField] = useState<string | null>(null);

  function handleCopy(value: string, field: string) {
    navigator.clipboard.writeText(value);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  }

  if (!phone && !email) {
    return (
      <div className="flex items-center gap-1.5 text-xs text-accent">
        <Unlock className="h-3.5 w-3.5" />
        <span className="font-medium">Desbloqueado</span>
      </div>
    );
  }

  return (
    <div className={cn("flex flex-col gap-1.5", compact && "flex-row items-center gap-3")}>
      {phone && (
        <button
          onClick={() => handleCopy(phone, "phone")}
          className="group flex items-center gap-1.5 rounded-lg bg-accent/10 px-2.5 py-1 text-xs font-medium text-accent transition-colors hover:bg-accent/15"
        >
          <Phone className="h-3 w-3" />
          <span>{phone}</span>
          {copiedField === "phone" ? (
            <Check className="h-3 w-3" />
          ) : (
            <Copy className="h-3 w-3 opacity-0 transition-opacity group-hover:opacity-100" />
          )}
        </button>
      )}
      {email && (
        <button
          onClick={() => handleCopy(email, "email")}
          className="group flex items-center gap-1.5 rounded-lg bg-gold/10 px-2.5 py-1 text-xs font-medium text-gold-foreground transition-colors hover:bg-gold/15"
        >
          <Mail className="h-3 w-3" />
          <span>{email}</span>
          {copiedField === "email" ? (
            <Check className="h-3 w-3" />
          ) : (
            <Copy className="h-3 w-3 opacity-0 transition-opacity group-hover:opacity-100" />
          )}
        </button>
      )}
    </div>
  );
}
