import fs from "node:fs";
import { parse } from "csv-parse";
import { stringify } from "csv-stringify";

// Infer a human name from an email local-part.
// e.g. "john.doe_smith-lee@example.com" → "John Doe Smith Lee"
function inferNameFromEmail(email: string): string {
	let local = email.split("@", 1)[0];

	if (local === undefined) {
		return "";
	}

	if (local.length === 0) {
		return "";
	}

	if (local.includes("+")) {
		// Remove the "+tag" part
		local = local.split("+")[0];
	}

	if (local === undefined) {
		return "";
	}

	return local
		.split(/[._-]+/)
		.filter(Boolean)
		.map((word) => {
			if (word.length === 0 || word[0] === undefined) {
				return "";
			}

			return word[0].toUpperCase() + word.slice(1).toLowerCase();
		})
		.join(" ");
}

async function main() {
	const [, , inputPath, outputPath] = process.argv;
	if (!inputPath || !outputPath) {
		console.error("Usage: ts-node split-nombre.ts <input.csv> <output.csv>");
		process.exit(1);
	}

	const parser = fs.createReadStream(inputPath).pipe(
		parse({
			columns: true,
			skip_empty_lines: true,
			trim: false,
			relax_quotes: true,
		}),
	);

	const stringifier = stringify({
		header: true,
		columns: ["Name", "Email", "Celular", "DNI", "Sector"],
	});

	const outStream = fs.createWriteStream(outputPath);
	stringifier.pipe(outStream);

	for await (const record of parser) {
		const raw = String(record["Nombre"] ?? "");
		// Split on newline, trim each line, discard empties
		const lines = raw
			.split(/\r?\n/)
			.map((l) => l.trim())
			.filter((l) => l);

		let name = "",
			email = "";
		if (
			lines.length >= 2 &&
			lines[1] !== undefined &&
			lines[0] !== undefined &&
			lines[1].includes("@")
		) {
			// Two lines: first = name, second = email
			name = lines[0];
			email = lines[1];
		} else if (raw.includes("@")) {
			// Only email present: infer name
			email = raw.trim();
			name = inferNameFromEmail(email);
		} else {
			// Only name present
			name = raw.trim();
		}

		stringifier.write({
			Name: name,
			Email: email,
			Celular: record["Celular"] ?? "",
			DNI: record["DNI"] ?? "",
			Sector: record["Sector"] ?? "",
		});
	}

	stringifier.end(() => {
		console.log(`Wrote cleaned CSV to ${outputPath}`);
	});
}

main().catch((err) => {
	console.error("Error processing CSV:", err);
	process.exit(1);
});
