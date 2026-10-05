const leagueTableBody = document.querySelector("#leagueTableBody");
const leagueTableStatus = document.querySelector("#leagueTableStatus");
const refreshLeagueTableButton = document.querySelector("#refreshLeagueTable");
const liverpoolFixtures = document.querySelector("#liverpoolFixtures");
const fixturesStatus = document.querySelector("#fixturesStatus");
const refreshFixturesButton = document.querySelector("#refreshFixtures");

const bannerSlides = document.querySelectorAll(".image-banner-slide");
if (bannerSlides.length > 1) {
	let activeBannerSlide = 0;
	window.setInterval(() => {
		if (document.hidden) {
			return;
		}

		bannerSlides[activeBannerSlide].classList.remove("is-active");
		bannerSlides[activeBannerSlide].setAttribute("aria-hidden", "true");
		activeBannerSlide = (activeBannerSlide + 1) % bannerSlides.length;
		bannerSlides[activeBannerSlide].classList.add("is-active");
		bannerSlides[activeBannerSlide].setAttribute("aria-hidden", "false");
	}, 5000);
}

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

	async function getCurrentSeasonInfo() {
		const now = new Date();
		const seasonStartYear = now.getMonth() >= 6 ? now.getFullYear() : now.getFullYear() - 1;
		const seasonLabel = `${seasonStartYear}/${seasonStartYear + 1}`;
		const displaySeason = `${seasonStartYear}/${String(seasonStartYear + 1).slice(-2)}`;
		const seasons = await fetchReaderJson(`${readerUrl}competitions/1/compseasons?pageSize=100`);
		const season = seasons.content.find((item) => item.label.includes(seasonLabel));
		if (!season) {
			throw new Error("The current Premier League season was not found.");
		}

		return { season, displaySeason, now };
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
			const { season, displaySeason, now } = await getCurrentSeasonInfo();
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

	async function refreshLiverpoolFixtures() {
		refreshFixturesButton.disabled = true;
		fixturesStatus.textContent = "Loading Liverpool's schedule…";

		try {
			const { season, displaySeason, now } = await getCurrentSeasonInfo();
			const fixturesUrl = `${readerUrl}fixtures?comp=1%26compSeasons=${season.id}%26teams=10%26page=0%26pageSize=100%26sort=asc`;
			const schedule = await fetchReaderJson(fixturesUrl);
			const upcoming = schedule.content
				.filter((fixture) => fixture.kickoff?.millis > now.getTime())
				.slice(0, 7);

			if (upcoming.length === 0) {
				liverpoolFixtures.replaceChildren();
				fixturesStatus.textContent = `No upcoming Premier League fixtures · ${displaySeason} season`;
				return;
			}

			const cards = upcoming.map((fixture) => {
				const [homeTeam, awayTeam] = fixture.teams.map(({ team }) => team);
				const isHome = homeTeam.id === 10;
				const opponent = isHome ? awayTeam : homeTeam;
				const kickoff = new Date(fixture.kickoff.millis);
				const card = document.createElement("div");
				card.className = "fixture-card";

				const date = document.createElement("div");
				date.className = "fixture-date";
				date.textContent = new Intl.DateTimeFormat("en-GB", {
					day: "numeric",
					month: "short",
					timeZone: "Europe/London",
				}).format(kickoff);

				const content = document.createElement("div");
				content.className = "fixture-content";
				const competition = document.createElement("span");
				competition.className = "competition";
				competition.textContent = "Premier League";
				const matchup = document.createElement("h4");
				matchup.textContent = isHome ? `Liverpool vs ${opponent.name}` : `${opponent.name} vs Liverpool`;
				const details = document.createElement("p");
				const time = new Intl.DateTimeFormat("en-GB", {
					hour: "2-digit",
					minute: "2-digit",
					timeZone: "Europe/London",
					timeZoneName: "short",
				}).format(kickoff);
				details.textContent = `${fixture.ground?.name || "Venue to be confirmed"} · ${time}`;
				content.append(competition, matchup, details);

				const venueTag = document.createElement("span");
				venueTag.className = `fixture-tag ${isHome ? "home" : "away"}`;
				venueTag.textContent = isHome ? "Home" : "Away";
				card.append(date, content, venueTag);
				return card;
			});

			liverpoolFixtures.replaceChildren(...cards);
			const updatedAt = new Intl.DateTimeFormat(undefined, { hour: "numeric", minute: "2-digit" }).format(now);
			fixturesStatus.textContent = `Next ${upcoming.length} league matches · ${displaySeason} season · Last checked ${updatedAt}`;
		} catch (error) {
			fixturesStatus.textContent = "Liverpool's live fixtures are unavailable. Try refreshing.";
			liverpoolFixtures.replaceChildren();
		}
		finally {
			refreshFixturesButton.disabled = false;
		}
	}

	refreshLeagueTableButton.addEventListener("click", refreshLeagueTable);
	refreshFixturesButton.addEventListener("click", refreshLiverpoolFixtures);
	refreshLeagueTable();
	refreshLiverpoolFixtures();
	window.setInterval(() => {
		if (!document.hidden) {
			refreshLeagueTable();
			refreshLiverpoolFixtures();
		}
	}, refreshInterval);
}
