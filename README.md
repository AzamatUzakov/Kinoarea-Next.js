# Kino Area by litakk 🎬

Веб-приложение для просмотра фильмов и получения подробной информации о них.

**Демо:** [https://kinoarea-next-js.vercel.app/](https://kinoarea-next-js.vercel.app/)

## 📚 Описание проекта

Проект реализует следующие функции:
- Просмотр популярных фильмов
- Просмотр текущих фильмов в прокате
- Просмотр популярных актёров
- Просмотр сериалов, выходящих сегодня
- Отображение трейлеров и подробной информации о фильмах

## 🛠 Технологический стек
- **React** - библиотека для построения интерфейсов
- **TypeScript** - статическая типизация
- **Next.js (Pages Router)** - фреймворк для роутинга
- **TailwindCSS** - mobile-first стилизация
- **TMDB API** - данные о фильмах и сериалах

## 🌐 Используемые API эндпоинты
```javascript
const popularUrl = "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1";
const genresUrl = "https://api.themoviedb.org/3/genre/movie/list?language=en";
const popularPeopleUrl = "https://api.themoviedb.org/3/person/popular?language=en-US&page=1";
const nowPlayingUrl = "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1";
const airingTodayUrl = "https://api.themoviedb.org/3/tv/airing_today?language=en-US&page=1";

⚙️ Установка и запуск
Клонировать репозиторий:

git clone https://github.com/AzamatUzakov/Kinoarea-Next.js.git


Установить зависимости:

npm install

NEXT_PUBLIC_TMDB_API_KEY=your_api_key_here

Создать .env.local файл с API ключом:

NEXT_PUBLIC_TMDB_API_KEY=your_api_key_here

Запустить проект:

npm run dev

🚀 Деплой
Проект развернут на Netlify:
https://kinoarea-next-js.vercel.app/

📄 Документация проекта
Архитектура
Клиентский рендеринг (CSR) через fetch в useEffect

Компонентный подход

Mobile-first верстка

Основные компоненты
Карточки фильмов/актёров

Карусели для отображения коллекций

Страницы с детальной информацией

Адаптивный интерфейс

Планы по развитию
Добавление новых страниц

Реализация фильтрации

Улучшение логики работы

Добавление тестирования

🤝 Контакты
Автор: Azamat   
GitHub: https://github.com/AzamatUzakov
