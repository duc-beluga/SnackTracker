"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui";

export function ThemeToggle() {
  const { setTheme } = useTheme();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Choose your theme color</CardTitle>
        <CardDescription>Card Description</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col justify-between gap-4">
        <Button variant="outline" onClick={() => setTheme("light")}>
          <Sun />
        </Button>
        <Button onClick={() => setTheme("dark")}>
          <Moon />
        </Button>
      </CardContent>
    </Card>
  );
}
