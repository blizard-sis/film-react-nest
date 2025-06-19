# 🎬 FILM!

Учебный проект для управления расписанием и показом фильмов с фронтендом на React и бэкендом на NestJS.

---

## 📦 Возможности

- REST API для фильмов, залов, сеансов, заказов (NestJS + MongoDB)
- SPA-интерфейс для просмотра и бронирования (Vite + React)
- Работа как с PostgreSQL, так и с MongoDB
- Контейнеризация через Docker и Docker Compose
- CI/CD: сборка образов через GitHub Actions, публикация в Docker Hub, деплой на удалённый хост

---

## 🚀 Локальный запуск

1. Установите требуемую базу данных (MongoDB или PostgreSQL).
2. Настройте переменные окружения в `.env` файлах для бэкенда и фронтенда, скопировав их из `.env.example`.
3. Залейте базовые данные в базу данных:
  1. Для MongoDB в созданную базу данных залейте файл `backend/test/mongodb_initial_stub.json`.
  2. Для PostgreSQL:
    - Создайте базу данных и пользователя.
    - От имени пользователя залейте данные в базу данных:
      ```bash
      psql -U <username> -d <database_name> -f backend/test/prac.init.sql
      psql -U <username> -d <database_name> -f backend/test/prac.films.sql
      psql -U <username> -d <database_name> -f backend/test/prac.shedules.sql
      ```
4. Запустите бэкенд:
  ```bash
  cd backend
  npm ci
  npm run start:dev
  ```
5. Запустите фронтенд:
  ```bash
  cd frontend
  npm ci
  npm run dev
  ```
6. Откройте браузер и перейдите по адресу `http://localhost:5173` для фронтенда.

---

## 🐳 Запуск через Docker локально

1. Клонируйте репозиторий:
  ```bash
  git clone <repository_url>
  ```
2. Перейдите в директорию infra проекта:
  ```bash
  cd film-react-nest/infra
  ```
3. Настройте переменные окружения в `.env` файлах для бэкенда и фронтенда, скопировав их из `.env.example`.
4. Запустите Docker Compose со сборкой образов:
  ```bash
  docker-compose up -d -f docker-compose-build-local.yaml --build
  ```
5. Откройте браузер и перейдите по адресу `http://localhost` для фронтенда.

Предполагается, что у вас уже настроен nginx-reverse-proxy на хосте, который будет проксировать запросы к контейнерам и шифровать трафик.

## 🐳 Запуск через Docker (deploy)

В репозитории настроен deploy через GitHub Actions, который будет собирать образы и выкладывать их в Docker Hub, а также запускать на удалённом сервере с уже настроенным файлом `docker-compose.yaml`, `default.conf` и генерировать `.env` файл из secrets GitHub.
Очевидно, что при первом запуске нужно будет залить базу данных в контейнеры. Для этого нужно будет зайти в контейнеры и выполнить команды из пункта 3 локального запуска, предварительно скопировав файлы в контейнеры.
