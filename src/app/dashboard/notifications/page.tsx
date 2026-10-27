"use client";

import { useState } from "react";
import {
  CheckCheck,
  CreditCard,
  Info,
  ShieldAlert,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

type Notification = {
  id: string;
  title: string;
  message: string;
  time: string;
  type: "info" | "billing" | "security";
  read: boolean;
};

const initialNotifications: Notification[] = [
  {
    id: "notif-1",
    title: "Welcome to Apex!",
    message: "Your workspace has been successfully provisioned with PostgreSQL RLS security.",
    time: "10 minutes ago",
    type: "info",
    read: false,
  },
  {
    id: "notif-2",
    title: "Stripe Webhooks Configured",
    message: "Your billing endpoint /api/webhooks/stripe is ready to listen for checkout sessions.",
    time: "1 hour ago",
    type: "billing",
    read: false,
  },
  {
    id: "notif-3",
    title: "Security Guard Active",
    message: "Strict HTTP security headers and Proxy route protection enabled.",
    time: "2 hours ago",
    type: "security",
    read: true,
  },
];

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState(initialNotifications);

  function markAllRead() {
    setNotifications(notifications.map((n) => ({ ...n, read: true })));
  }

  function clearAll() {
    setNotifications([]);
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-[#17211d] sm:text-3xl">
            Notifications Center
          </h1>
          <p className="text-sm text-[#627069]">
            System announcements, billing confirmations, and security alerts.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            onClick={markAllRead}
            disabled={notifications.length === 0}
            className="gap-2 rounded-xl text-xs"
          >
            <CheckCheck size={14} /> Mark all read
          </Button>
          <Button
            variant="outline"
            onClick={clearAll}
            disabled={notifications.length === 0}
            className="gap-2 rounded-xl text-xs text-red-600 hover:text-red-700"
          >
            <Trash2 size={14} /> Clear
          </Button>
        </div>
      </div>

      <Card className="rounded-2xl border-[#e5ebe5] bg-white">
        <CardContent className="divide-y divide-[#f2f6f3] p-0">
          {notifications.map((n) => (
            <div
              key={n.id}
              className={`flex items-start gap-4 p-5 transition ${
                !n.read ? "bg-[#fbfcfa]" : "bg-white"
              }`}
            >
              <span
                className={`flex size-9 shrink-0 items-center justify-center rounded-xl ${
                  n.type === "billing"
                    ? "bg-[#eaf1eb] text-[#2d6a4f]"
                    : n.type === "security"
                    ? "bg-[#fbf6e8] text-[#9b7a31]"
                    : "bg-[#f2f4f8] text-[#335c8d]"
                }`}
              >
                {n.type === "billing" && <CreditCard size={18} />}
                {n.type === "security" && <ShieldAlert size={18} />}
                {n.type === "info" && <Info size={18} />}
              </span>

              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-semibold text-[#17211d]">{n.title}</h4>
                  <span className="text-[11px] text-[#8e9c93]">{n.time}</span>
                </div>
                <p className="text-xs text-[#627069] leading-5">{n.message}</p>
              </div>

              {!n.read && (
                <span className="size-2 shrink-0 rounded-full bg-[#52866c]" title="Unread" />
              )}
            </div>
          ))}

          {notifications.length === 0 && (
            <div className="py-16 text-center text-sm text-[#8e9c93]">
              No notifications at this time. You are completely caught up!
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
