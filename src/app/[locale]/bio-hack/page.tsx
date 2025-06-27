"use client";

import { useLocale, useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
	createQuestion as createQuestionAction,
	fetchQuestions,
	submitVote,
} from "./actions";

interface Question {
	id: number;
	content: string;
}

export default function BioHackPage() {
	const t = useTranslations("BioHack");
	const locale = useLocale();
	const [allQuestions, setAllQuestions] = useState<Question[]>([]);
	const [selected, setSelected] = useState<Question[]>([]);
	const [newQ, setNewQ] = useState("");

	useEffect(() => {
		fetchQuestions().then(setAllQuestions);
		const es = new EventSource(`/${locale}/bio-hack/events`);
		es.onmessage = (ev) => {
			const q: Question = JSON.parse(ev.data);
			setAllQuestions((prev) => [...prev, q]);
		};
		return () => es.close();
	}, [locale]);

	const moveUp = (idx: number) => {
		if (idx === 0) return;
		setSelected((arr) => {
			const copy = [...arr];
			if (idx >= copy.length) return copy;
			const prev = copy[idx - 1];
			const curr = copy[idx];
			if (!prev || !curr) return copy;
			copy[idx - 1] = curr;
			copy[idx] = prev;
			return copy;
		});
	};

	const moveDown = (idx: number) => {
		setSelected((arr) => {
			const copy = [...arr];
			if (idx < copy.length - 1) {
				const curr = copy[idx];
				const next = copy[idx + 1];
				if (!curr || !next) return copy;
				copy[idx] = next;
				copy[idx + 1] = curr;
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
		await submitVote(selected.map((q) => q.id));
		setSelected([]);
	};

	const createQuestion = async () => {
		await createQuestionAction(newQ);
		setNewQ("");
	};

	const remaining = allQuestions.filter(
		(q) => !selected.some((s) => s.id === q.id),
	);

	return (
		<div className="min-h-screen bg-gradient-to-b from-primary to-secondary px-6 py-10 text-primary-foreground">
			<div className="mx-auto grid max-w-5xl gap-8">
				<div className="space-y-2 text-center">
					<h1 className="text-4xl font-bold">{t("title")}</h1>
					<p>{t("intro")}</p>
				</div>
				<div className="grid gap-6 md:grid-cols-2">
					<Card className="bg-background/60 backdrop-blur">
						<CardHeader>
							<CardTitle>{t("yourQuestions")}</CardTitle>
						</CardHeader>
						<CardContent>
							<ul className="space-y-2">
								{selected.map((q, idx) => (
									<li
										key={q.id}
										className="flex items-center justify-between rounded-md border bg-background/80 px-3 py-2"
									>
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
						</CardContent>
					</Card>
					<Card className="bg-background/60 backdrop-blur">
						<CardHeader>
							<CardTitle>{t("allQuestions")}</CardTitle>
						</CardHeader>
						<CardContent>
							<ul className="space-y-2">
								{remaining.map((q) => (
									<li
										key={q.id}
										className="flex items-center justify-between rounded-md border bg-background/80 px-3 py-2"
									>
										<span>{q.content}</span>
										<Button size="sm" onClick={() => addToSelected(q)}>
											+
										</Button>
									</li>
								))}
							</ul>
						</CardContent>
					</Card>
				</div>
				<div className="flex justify-center gap-4">
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
					<Button
						variant="secondary"
						onClick={submitOrder}
						disabled={selected.length === 0}
					>
						{t("submit")}
					</Button>
				</div>
			</div>
		</div>
	);
}
