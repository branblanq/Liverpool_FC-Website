const leagueTableBody = document.querySelector("#leagueTableBody");
const leagueTableStatus = document.querySelector("#leagueTableStatus");
const refreshLeagueTableButton = document.querySelector("#refreshLeagueTable");
const liverpoolFixtures = document.querySelector("#liverpoolFixtures");
const fixturesStatus = document.querySelector("#fixturesStatus");
const refreshFixturesButton = document.querySelector("#refreshFixtures");
const pageContent = document.getElementById("pageContent");

const siteData = {
	home: {
		hero: {
			title: "Welcome to Liverpool FC",
			subtitle: "You'll Never Walk Alone. Explore match highlights, team squad, and club history.",
			primaryLink: { label: "Explore the Squad", href: "squad.html", className: "btn btn-warning btn-lg fw-bold text-dark me-2" },
			secondaryLink: { label: "View Fixtures", href: "fixtures.html", className: "btn btn-outline-light btn-lg" }
		},
		highlights: [
			{ title: "Previous Match", headerClass: "bg-dark text-white", badge: "Premier League", result: "Bournemouth 0 - 1 Liverpool", details: "Vitality Stadium | Sept 20, 2026", summary: "Goal scored by Isak who secured a dominant victory for the visitors.", image: "images/Isak.jpg", link: "fixtures.html", linkText: "Match Details", actionClass: "btn btn-sm btn-outline-danger mt-3" },
			{ title: "Next Match", headerClass: "bg-danger text-white", badge: "Premier League", result: "Liverpool vs Manchester City", details: "Anfield Stadium | Sat, 18:30 GMT", summary: "Crucial fixture as the Reds look to extend their unbeaten run down the road.", image: "images/nextmatch.jpg", link: "fixtures.html", linkText: "View All Fixtures", actionClass: "btn btn-sm btn-danger mt-3" },
			{ title: "Club Archives", headerClass: "bg-dark text-white", badge: "Team History", result: "Trophies and Honours", details: "Club history and silverware", summary: "Liverpool Football Club have secured 52 trophies including Premier League, Champions and European League trophies plus many other different trophies in History.", image: "images/trophy collection.jpg", link: "history.html", linkText: "Learn More", actionClass: "btn btn-sm btn-outline-dark mt-3" }
		]
	},
	squad: {
		sections: [
			{ title: "COACHES", players: [
				{ name: "Andoni Iraola | Head Coach", badge: "Staff", country: "Spain", image: "images/Andoni Iraola.jpg" },
				{ name: "Pablo de la Torre | Assistant Coach", badge: "Staff", country: "Spain", image: "images/Pablo de la Torre.jpg" },
				{ name: "Tommy Elphick | Assistant Coach", badge: "Staff", country: "England", image: "images/Tommy Elphick.jpg" },
				{ name: "Shaun Cooper | Assistant Coach", badge: "Staff", country: "England", image: "images/Shaun Cooper.jpg" }
			]},
			{ title: "GOALKEEPERS", players: [
				{ name: "Alisson Becker", badge: "#1", country: "Brazil", image: "images/Alisson Becker.jpg" },
				{ name: "Giorgi Mamardashvili", badge: "#25", country: "Ireland", image: "images/Giorgi Mamardashvili.jpg" },
				{ name: "Freddie Woodman", badge: "#28", country: "England", image: "images/Freddie Woodman.jpg" },
				{ name: "Harvey Davies", badge: "#95", country: "England", image: "images/Harvey Davies.jpg" }
			]},
			{ title: "DEFENDERS", players: [
				{ name: "Joe Gomez", badge: "#2", country: "England", image: "images/Joe Gomez.jpg" },
				{ name: "Virgil van Dijik", badge: "#4", country: "England", image: "images/Virgil Van Dijk.jpg" },
				{ name: "Jeremy Jacquet", badge: "#5", country: "France", image: "images/Jeremy Jacquet.jpg" },
				{ name: "Milos Kerkez", badge: "#6", country: "France", image: "images/Milos Kerkez.jpg" },
				{ name: "Conor Bradley", badge: "#12", country: "England", image: "images/Conor Bradley.jpg " },
				{ name: "Giovanni Leoni", badge: "#15", country: "Greece", image: "images/Giovanni Leoni.jpg" },
				{ name: "Kostas Tsimikas", badge: "#21", country: "England", image: "images/Kostas Tsimikas.jpg" },
				{ name: "Ronald Araujo", badge: "#33", country: "Scotland", image: "images/Ronald Araujo.JPG" },
				{ name: "Jeremie Frimpong", badge: "#30", country: "France", image: "images/Jeremie Frimpong.jpg" },
				{ name: "Luke Chambers", badge: "#44", country: "England", image: "images/Luke Chambers.JPG" }
			]},
			{ title: "MIDFIELDERS", players: [
				{ name: "Wataru Endo", badge: "#3", country: "Argentina", image: "images/Wataru Endo.jpg" },
				{ name: "Florian Wirtz", badge: "#7", country: "England", image: "images/Florian Wirtz.jpg" },
				{ name: "Dominik Szoboszlai", badge: "#8", country: "Hungary", image: "images/Dominik Szoboszlai.jpg" },
				{ name: "Alexis Mac Allister", badge: "#10", country: "Argentina", image: "images/Mac Allister.jpg" },
				{ name: "Ryan Gravenberch", badge: "#38", country: "England", image: "images/Ryan Gravenberch.jpg" },
				{ name: "Trey Nyoni", badge: "#42", country: "England", image: "images/Trey Nyoni.jpg" },
				{ name: "James McConnell", badge: "#53", country: "Netherlands", image: "images/James Mcconnell.jpg" }
			]},
			{ title: "FORWARDS", players: [
				{ name: "Alexander Isak", badge: "#9", country: "Egypt", image: "images/Alexander Isak.png" },
				{ name: "Federico Chiesa", badge: "#14", country: "Spain", image: "images/Federico Chiesa.jpg" },
				{ name: "Cody Gakpo", badge: "#18", country: "England", image: "images/Cody Gakpo.jpg" },
				{ name: "Hugo Ekitike", badge: "#22", country: "France", image: "images/Hugo Ekitike.jpg" },
				{ name: "Victor Munoz", badge: "#23", country: "Spain", image: "images/Victor Munoz.jpg" },
				{ name: "Bradley Barcola", badge: "#29", country: "France", image: "images/Bradely Barcola.jpg" },
				{ name: "Lewis Koumas", badge: "#67", country: "Whales", image: "images/Lewis Koumas.jpg" },
				{ name: "Rio Ngumoha", badge: "#73", country: "England", image: "images/Rio Ngumoha.jpg" },
				{ name: "Jayden Danns", badge: "#76", country: "England", image: "images/Jayden Danns.jpg" }
			] }
		]
	},
	history: {
		title: "Club History",
		events: [
			{ year: "1892", title: "Club founded", text: "Liverpool Football Club was founded in Liverpool and began building its identity." },
			{ year: "1901", title: "First league title", text: "The club secured its first league championship and set the tone for future dominance." },
			{ year: "1977", title: "European Cup win", text: "Liverpool claimed the European Cup and started a legendary era under European football's brightest lights." },
			{ year: "2005", title: "European comeback", text: "The Istanbul final turned into one of football's most iconic matches and one of the club's greatest stories." },
			{ year: "2020", title: "Premier League return", text: "The Reds captured the title again and reconnected with a new generation of supporters." }
		]
	},
	fanzone: {
		posts: [
			{ title: "Matchday Mood", text: "Anfield is alive when the Kop rises. It is more than football — it is energy, passion and belonging.", tag: "Matchday" },
			{ title: "Supporter Stories", text: "Fans from across the world share memories of away trips, cup runs and unforgettable nights in Europe.", tag: "Community" },
			{ title: "Season Goals", text: "The message from supporters is clear: challenge for every trophy and keep the standard high at Anfield.", tag: "Campaign" }
		]
	}
};

function renderHomePage() {
	const hero = siteData.home.hero;
	const cards = siteData.home.highlights.map((highlight) => `
		<div class="col-12 col-md-4">
			<div class="card h-100 shadow-sm border-0">
				<div class="card-header ${highlight.headerClass} fw-bold text-center">
					<small class="text-uppercase">${highlight.title}</small>
				</div>
				<img src="${highlight.image}" class="card-img-top" alt="${highlight.title}" style="height: 380px; object-fit: cover;">
				<div class="card-body text-center d-flex flex-column justify-content-between">
					<div>
						<span class="badge bg-danger mb-2">${highlight.badge}</span>
						<h5 class="card-title fw-bold">${highlight.result}</h5>
						<p class="card-text text-muted small">${highlight.details}</p>
						<p class="card-text small">${highlight.summary}</p>
					</div>
					<a href="${highlight.link}" class="${highlight.actionClass}">${highlight.linkText}</a>
				</div>
			</div>
		</div>
	`).join("");

	pageContent.innerHTML = `
		<div class="p-5 mb-4 bg-danger text-white rounded-3 shadow">
			<div class="container-fluid py-3 text-center">
				<h1 class="display-4 fw-bold">${hero.title}</h1>
				<p class="fs-4">${hero.subtitle}</p>
				<a href="${hero.primaryLink.href}" class="${hero.primaryLink.className}">${hero.primaryLink.label}</a>
				<a href="${hero.secondaryLink.href}" class="${hero.secondaryLink.className}">${hero.secondaryLink.label}</a>
			</div>
		</div>
		<h2 class="text-danger fw-bold mb-3">Season Highlights</h2>
		<div id="lfcCarousel" class="carousel slide mb-5 shadow rounded overflow-hidden" data-bs-ride="carousel">
			<div class="carousel-inner">
				<div class="carousel-item active">
					<img src="images/banner.jpg" class="d-block w-100" alt="Match Action" style="max-height: 400px; object-fit: cover;">
					<div class="carousel-caption d-none d-md-block bg-dark bg-opacity-50 rounded">
						<h5>Anfield Matchday</h5>
						<p>Experience the atmosphere at Anfield.</p>
					</div>
				</div>
			</div>
			<button class="carousel-control-prev" type="button" data-bs-target="#lfcCarousel" data-bs-slide="prev">
				<span class="carousel-control-prev-icon"></span>
			</button>
			<button class="carousel-control-next" type="button" data-bs-target="#lfcCarousel" data-bs-slide="next">
				<span class="carousel-control-next-icon"></span>
			</button>
		</div>
		<div class="row g-4 mb-5">${cards}</div>
	`;
}

function renderSquadPage() {
	const sectionsMarkup = siteData.squad.sections.map((section) => {
		const playersMarkup = section.players.map((player) => `
			<div class="col-12 col-md-4">
				<div class="card h-100 shadow-sm">
					<img src="${player.image}" class="card-img-top" alt="${player.name}" style="height: 450px; object-fit: cover;">
					<div class="card-body">
						<span class="badge bg-danger mb-2">${player.badge}</span>
						<h5 class="card-title fw-bold">${player.name}</h5>
					</div>
					<div class="card-footer bg-transparent border-top-0">
						<small class="text-secondary">${player.country}</small>
					</div>
				</div>
			</div>
		`).join("");

		return `
			<h2 class="text-dark border-bottom border-danger pb-2 mb-4">${section.title}</h2>
			<div class="row g-4 mb-5">${playersMarkup}</div>
		`;
	}).join("");

	pageContent.innerHTML = `
		<h1 class="text-danger fw-bold mb-4">Team Squad</h1>
		${sectionsMarkup}
	`;
}

function renderHistoryPage() {
	const timelineMarkup = siteData.history.events.map((event) => `
		<div class="col-md-6 col-xl-4">
			<div class="card h-100 shadow-sm border-0">
				<div class="card-header bg-danger text-white fw-bold">${event.year}</div>
				<div class="card-body">
					<h5 class="fw-bold">${event.title}</h5>
					<p class="mb-0 text-muted">${event.text}</p>
				</div>
			</div>
		</div>
	`).join("");

	pageContent.innerHTML = `
		<h1 class="text-danger fw-bold mb-4">${siteData.history.title}</h1>
		<div class="row g-4">${timelineMarkup}</div>
	`;
}

function renderFanZonePage() {
	const postsMarkup = siteData.fanzone.posts.map((post) => `
		<div class="col-md-4">
			<div class="card h-100 shadow-sm border-0">
				<div class="card-body">
					<span class="badge bg-danger mb-2">${post.tag}</span>
					<h4 class="fw-bold">${post.title}</h4>
					<p class="mb-0 text-muted">${post.text}</p>
				</div>
			</div>
		</div>
	`).join("");

	pageContent.innerHTML = `
		<h1 class="text-danger fw-bold mb-4">Fan Zone</h1>
		<div class="row g-4">${postsMarkup}</div>
	`;
}

function renderPageContent() {
	if (!pageContent) {
		return;
	}

	const pageName = document.body.dataset.page || "home";

	if (pageName === "home") {
		renderHomePage();
		return;
	}

	if (pageName === "squad") {
		renderSquadPage();
		return;
	}

	if (pageName === "history") {
		renderHistoryPage();
		return;
	}

	if (pageName === "fanzone") {
		renderFanZonePage();
		return;
	}
}

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

renderPageContent();

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
		} finally {
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
