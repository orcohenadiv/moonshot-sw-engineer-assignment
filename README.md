# Moonshot Fullstack User Management App

A fullstack GraphQL application for managing users, featuring:
- **Backend** with TypeGraphQL, PostgreSQL, and SNS notifications
- **Frontend** in React + Apollo Client
- **Dockerized** with Docker Compose
- SNS integration for user registration email alerts
- GraphQL CRUD Tests with Jest

---

## 📁 Project Structure

```
moonshot-sw-engineer-assignment/
├── client/              # React + Apollo Client app
├── src/                 # TypeGraphQL backend
├── tests/               # Backend integration tests
├── docker-compose.yml   # Docker Compose config
├── Dockerfile           # Backend Dockerfile
├── README.md
```

---

## 🚀 Getting Started

### Prerequisites
- Docker & Docker Compose installed
- `.aws/credentials` configured locally for SNS

### 1. Clone the Repository

```bash
git clone https://github.com/orcohenadiv/moonshot-app.git
cd moonshot-app
```

### 2. Start the App

```bash
docker-compose up --build
```

This will:
- Start the PostgreSQL DB
- Launch 2 backend replicas (`app1` on port `4000`, `app2` on port `4001`)
- Start the React client on `http://localhost:3000`

---

## 🧪 Running Tests

To run integration tests inside Docker:

```bash
docker-compose run --rm test-runner
```

> These tests hit the actual GraphQL resolvers and PostgreSQL database.

---

## 📬 SNS Integration

On every user creation, a message is sent to SNS and forwarded to an email subscriber.

Make sure your AWS credentials are configured in `~/.aws/credentials`:

```ini
[default]
aws_access_key_id=YOUR_KEY
aws_secret_access_key=YOUR_SECRET
```

---

## 🛠 CRUD Functionality

The UI allows full user management:

- **Create**: Add new users via a simple form
- **Read**: View user list on load
- **Update**: Edit existing user info
- **Delete**: Remove users with one click

---

## 📚 Serverless Design (Optional Suggestion)

A potential serverless alternative architecture:
- **API Gateway** + **AWS Lambda** for GraphQL resolvers
- **RDS (PostgreSQL)** as the database
- **S3 + CloudFront** for frontend hosting
- **SNS** remains for notifications

---

## 🧼 Cleanup

To stop and clean up all containers and volumes:

```bash
docker-compose down -v
```

---

## ✅ Assignment Checklist

- [x] Run backend in Docker with replication
- [x] React UI with full CRUD
- [x] SNS integration
- [x] Serverless design suggestion
- [x] Tests for backend GraphQL resolvers

---

## 📞 Contact

Built by Or Cohen Adiv for Moonshot assignment. For questions or suggestions, reach out via [LinkedIn](https://www.linkedin.com/).
