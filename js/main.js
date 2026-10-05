const leagueTableBody = document.querySelector("#leagueTableBody");
const leagueTableStatus = document.querySelector("#leagueTableStatus");
const refreshLeagueTableButton = document.querySelector("#refreshLeagueTable");

if (leagueTableBody && leagueTableStatus && refreshLeagueTableButton) {
	const readerUrl = "https://r.jina.ai/https://footballapi.pulselive.com/football/";
	const refreshInterval = 5 * 60 * 1000;

	async function fetchReaderJson(url) {
		const response = await fetch(url);
		if (!response.ok) {
			throw new Error("The standings feed could not be reached.");
		}

		const responseText = await response.text();
		const contentMarker = "Markdown Content:";
		const contentStart = responseText.indexOf(contentMarker);
		if (contentStart === -1) {
			throw new Error("The standings feed returned an unexpected response.");
		}

		return JSON.parse(responseText.slice(contentStart + contentMarker.length).trim());
	}

	function appendCell(row, value, isHeader = false) {
		const cell = document.createElement(isHeader ? "th" : "td");
		cell.textContent = value;
		row.append(cell);
	}

	function renderStandings(entries) {
		const rows = entries.map((entry) => {
			const row = document.createElement("tr");
			if (entry.team.name.toLowerCase().includes("liverpool")) {
				row.classList.add("league-table-liverpool");
			}

			appendCell(row, entry.position, true);
			appendCell(row, entry.team.name);
			appendCell(row, entry.overall.played);
			appendCell(row, entry.overall.won);
			appendCell(row, entry.overall.drawn);
			appendCell(row, entry.overall.lost);
			appendCell(row, entry.overall.goalsDifference);
			appendCell(row, entry.overall.points);
			return row;
		});

		leagueTableBody.replaceChildren(...rows);
	}

	async function refreshLeagueTable() {
		refreshLeagueTableButton.disabled = true;
		leagueTableStatus.textContent = "Loading current standings…";

		try {
			const now = new Date();
			const seasonStartYear = now.getMonth() >= 6 ? now.getFullYear() : now.getFullYear() - 1;
			const seasonLabel = `${seasonStartYear}/${seasonStartYear + 1}`;
			const displaySeason = `${seasonStartYear}/${String(seasonStartYear + 1).slice(-2)}`;
			const seasons = await fetchReaderJson(`${readerUrl}competitions/1/compseasons?pageSize=100`);
			const season = seasons.content.find((item) => item.label.includes(seasonLabel));
			if (!season) {
				throw new Error("The current Premier League season was not found.");
			}

			const standingsUrl = `${readerUrl}standings?comp=1%26compCodeForSort=PL%26altIds=true%26page=0%26pageSize=100%26compSeasons=${season.id}`;
			const standings = await fetchReaderJson(standingsUrl);
			const entries = standings.tables?.[0]?.entries;
			if (!entries?.length) {
				throw new Error("No standings were returned for the current season.");
			}

			renderStandings(entries);
			const updatedAt = new Intl.DateTimeFormat(undefined, { hour: "numeric", minute: "2-digit" }).format(now);
			leagueTableStatus.textContent = `${displaySeason} season · Last checked ${updatedAt} · Refreshes every 5 minutes`;
		} catch (error) {
			leagueTableStatus.textContent = "Live standings are unavailable. Try again or open the official table.";
		} finally {
			refreshLeagueTableButton.disabled = false;
		}
	}

	refreshLeagueTableButton.addEventListener("click", refreshLeagueTable);
	refreshLeagueTable();
	window.setInterval(() => {
		if (!document.hidden) {
			refreshLeagueTable();
		}
	}, refreshInterval);
}
