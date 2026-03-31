# 🎬 CineNest

CineNest ir moderna filmu meklēšanas aplikācija, kas izstrādāta ar React, TypeScript un TMDB API. Lietotājs var meklēt filmas, skatīt to detaļas, filtrēt un saglabāt favorītos.

---

## 🚀 Funkcionalitāte

- 🔍 Automātiska filmu meklēšana (live search ar debounce)
- 🎬 Populāro filmu attēlošana
- ⭐ Filmu pievienošana favorītiem
- 💾 Favorītu saglabāšana (localStorage)
- 🎛 Filtrēšana:
  - pēc reitinga
  - pēc nosaukuma
  - pēc izdošanas datuma
  - tikai “Drīzumā”
- 🟡 “Drīzumā” sadaļā tiek attēlotas visas gaidāmās filmas (no API)
- 🖼 Filmas detaļu logs ar attēlu un informāciju
- ❌ Modālais logs aizverams ar pogu vai klikšķi ārpus tā
- 🌙 / ☀️ Dark mode un Light mode
- 📱 Responsīvs dizains (mobilajām ierīcēm un datoram)
- ⏳ Loading stāvoklis
- ⚠️ Kļūdu paziņojumi

---

## 🛠 Izmantotās tehnoloģijas

- React
- TypeScript
- Axios
- Tailwind CSS
- Vite
- TMDB API

---

## 📁 Projekta struktūra

src/
  app/
    App.tsx
  components/
    Navbar.tsx
    SearchBar.tsx
    FilterBar.tsx
    MovieModal.tsx
    Loading.tsx
    ErrorMessage.tsx
  features/
    movies/
      api.ts
      types.ts
      MovieCard.tsx
      MovieGrid.tsx
  utils/
    storage.ts
    image.ts

---

## 🔌 API

Šī aplikācija izmanto The Movie Database (TMDB) API filmu datu iegūšanai.

---

## ▶️ Kā palaist projektu

1. Klonē repozitoriju:
git clone https://github.com/USERNAME/REPO-NAME.git

2. Atver projekta mapi:
cd cinenest

3. Instalē atkarības:
npm install

4. Palaid projektu:
npm run dev

---

## 🔑 API konfigurācija

Izveido `.env` failu projekta saknē un pievieno:

VITE_TMDB_API_KEY=your_api_key_here

---

## 🎯 Projekta mērķis

Izstrādāt React Single Page Application, kas:
- izmanto publisku API,
- ievēro TypeScript tipu drošību,
- ir strukturēta pēc feature-based pieejas,
- nodrošina labu lietotāja pieredzi.

---

## 👩‍💻 Autori

- Sintija Hauka, Domeniks Duncāns


---

## 📌 Piezīmes

Šis projekts izstrādāts Programmēšana II kursa ietvaros.
