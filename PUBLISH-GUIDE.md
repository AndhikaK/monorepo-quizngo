# 📌 Publish Guide

This guide provides step-by-step instructions for publishing the server using Docker.

---

## 🚀 Server Deployment

### 🐳 Using Docker

Follow these steps to build and publish your server using Docker.

#### 1️⃣ Login to Docker

Run the following command to authenticate with Docker:

```sh
docker login
```

#### 2️⃣ Build the Docker Image

Use Nx to build the Docker image for the server:

```sh
nx run server:build-docker
```

#### 3️⃣ Publish to Docker Hub

Push the built image to Docker Hub:

```sh
docker push kissuki21/quizngo-server:latest
```
