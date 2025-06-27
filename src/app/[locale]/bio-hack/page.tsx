"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

interface Question {
  id: number;
  content: string;
}

export default function BioHackPage() {
  const t = useTranslations("BioHack");
  const [allQuestions, setAllQuestions] = useState<Question[]>([]);
  const [selected, setSelected] = useState<Question[]>([]);
  const [newQ, setNewQ] = useState("");

  useEffect(() => {
    fetch("/api/biohack/questions")
      .then((r) => r.json())
      .then(setAllQuestions);
    const es = new EventSource("/api/biohack/events");
    es.onmessage = (ev) => {
      const q: Question = JSON.parse(ev.data);
      setAllQuestions((prev) => [...prev, q]);
    };
    return () => es.close();
  }, []);

  const moveUp = (idx: number) => {
    if (idx === 0) return;
    setSelected((arr) => {
      const copy = [...arr];
      [copy[idx - 1], copy[idx]] = [copy[idx]!, copy[idx - 1]!];
      return copy;
    });
  };

  const moveDown = (idx: number) => {
    setSelected((arr) => {
      const copy = [...arr];
      if (idx < copy.length - 1) {
        [copy[idx], copy[idx + 1]] = [copy[idx + 1]!, copy[idx]!];
      }
      return copy;
    });
  };

  const addToSelected = (q: Question) => {
    setSelected((arr) => [...arr, q]);
  };

  const removeSelected = (idx: number) => {
    setSelected((arr) => arr.filter((_, i) => i !== idx));
  };

  const submitOrder = async () => {
    await fetch("/api/biohack/vote", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ order: selected.map((q) => q.id) }),
    });
    setSelected([]);
  };

  const createQuestion = async () => {
    await fetch("/api/biohack/questions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content: newQ }),
    });
    setNewQ("");
  };

  const remaining = allQuestions.filter((q) => !selected.some((s) => s.id === q.id));

  return (
    <div className="min-h-screen space-y-6 bg-gradient-to-b from-[color:var(--black)] via-[color:var(--black)] to-[color:var(--color-biohack-green)] p-6 text-white">
      <h1 className="text-3xl font-bold">{t("title")}</h1>
      <p>{t("intro")}</p>
      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <h2 className="mb-2 font-semibold">{t("yourQuestions")}</h2>
          <ul className="space-y-2">
            {selected.map((q, idx) => (
              <li key={q.id} className="flex items-center justify-between rounded border border-white/20 p-2">
                <span>{q.content}</span>
                <div className="flex gap-1">
                  <Button size="icon" onClick={() => moveUp(idx)}>
                    ↑
                  </Button>
                  <Button size="icon" onClick={() => moveDown(idx)}>
                    ↓
                  </Button>
                  <Button
                    size="icon"
                    variant="destructive"
                    onClick={() => removeSelected(idx)}
                  >
                    ✕
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="mb-2 font-semibold">{t("allQuestions")}</h2>
          <ul className="space-y-2">
            {remaining.map((q) => (
              <li key={q.id} className="flex items-center justify-between rounded border border-white/20 p-2">
                <span>{q.content}</span>
                <Button size="sm" onClick={() => addToSelected(q)}>
                  +
                </Button>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="flex gap-4">
        <Dialog>
          <DialogTrigger asChild>
            <Button>{t("ask")}</Button>
          </DialogTrigger>
          <DialogContent className="space-y-4">
            <Input
              value={newQ}
              onChange={(e) => setNewQ(e.target.value)}
              placeholder={t("placeholder")}
            />
            <Button onClick={createQuestion}>{t("submit")}</Button>
          </DialogContent>
        </Dialog>
        <Button variant="secondary" onClick={submitOrder} disabled={selected.length === 0}>
          {t("submit")}
        </Button>
      </div>
    </div>
  );
}
