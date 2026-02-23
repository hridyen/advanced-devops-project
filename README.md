# Production Ready Multi Container Application Deployment

# Project Overview

This project demonstrates the deployment of a production style multi container application using Docker Compose on a local Ubuntu environment running through WSL. The goal was to simulate a real world DevOps workflow including Linux system configuration, Git branching strategy, container orchestration, networking, monitoring, and production best practices.

The application consists of a frontend service, a backend API built with Node and Express, a PostgreSQL database, and an Nginx reverse proxy. All services run inside containers and communicate over a custom Docker bridge network.

# Architecture

The application follows a layered structure.

Browser
to Nginx reverse proxy
to Frontend service
to Backend API
to PostgreSQL database

Only Nginx is exposed to the host system through port 80. The backend and database remain internal services and are not directly accessible from the host. All containers communicate using Docker’s internal DNS through service names on a user defined bridge network.

# Linux System Configuration

The environment was configured on Ubuntu. A dedicated system user named devopsuser was created and granted sudo privileges. UFW firewall was enabled and configured to allow ports 22, 80 and 443. Git and Docker were installed, and the user was added to the docker group to avoid running Docker commands as root.

This setup ensures proper privilege separation and aligns with standard Linux security practices.

Git and GitHub Workflow

Repository name is advanced devops project.

# The branching strategy used was:

main as the production branch
develop as the integration branch
feature frontend
feature backend

Features were developed in isolated feature branches. Pull requests were created from feature branches into develop. After integration testing, develop was merged into main through a pull request. The main branch was protected to prevent direct pushes. A version tag v1.0 was created to mark the production ready release.

This workflow simulates a simplified production Git strategy.

# Docker Architecture

Services included in the deployment are:

Frontend which serves static content
Backend API running on port 5000
PostgreSQL database version 15 alpine
Nginx reverse proxy

A custom Docker bridge network was created to allow internal communication between services. The backend connects to the database using the service name db as the host.

Port mapping is configured only for Nginx using 80 mapped to 80. Backend and database ports are not exposed to the host for security reasons.

# Environment Variables

Application configuration and database credentials are managed through a .env file. No sensitive information is hardcoded in the docker compose file. This improves security and allows flexible configuration across environments.

# Health Checks and Restart Policies

The backend exposes a health endpoint at /health. Docker health checks are configured to verify service availability. Restart policy is set to unless stopped to improve resilience in case of container failure.

Database readiness was handled to avoid connection timing issues during container startup.

# Monitoring and Debugging

Container resource usage was monitored using docker stats to observe CPU and memory consumption in real time. Logs were inspected using docker compose logs to diagnose issues such as database connection failures and reverse proxy routing mismatches.

Networking diagnostics were performed using docker network inspect and ss commands to verify open ports and service connectivity.

# Production Best Practices Implemented

Specific image versions were used instead of the latest tag to ensure reproducible deployments. Only required ports were exposed. Internal services were isolated within a custom bridge network. Environment variables were used for configuration. The main branch was protected to prevent direct modification. A version tag was created for release management.

Using latest is not recommended in production because it is not a fixed version. The underlying image can change at any time, which can introduce unexpected behavior and break deployments without any change in application code.

# Database Persistence Verification

A named Docker volume was used for PostgreSQL data storage. The stack was stopped using docker compose down and restarted. Data remained intact, confirming correct volume configuration and persistence.

# Challenges Faced

A Docker daemon permission issue occurred due to missing docker group membership. This was resolved by adding the user to the docker group and restarting WSL.

Database connection errors occurred due to service readiness timing. This was resolved by implementing proper health checks and understanding that container startup order does not guarantee service readiness.

An Nginx route mismatch caused the health endpoint to fail. This was resolved by correctly rewriting the API path before forwarding to the backend.

The difference between localhost and 0.0.0.0 inside containers required careful understanding. Binding to 0.0.0.0 was necessary to allow inter container communication.

# How to Run

From the project root directory:

docker compose up --build -d

Frontend can be accessed at http://localhost

Backend health endpoint can be accessed at http://localhost/api/health

# Conclusion

This project demonstrates a structured approach to containerized deployment, Git workflow management, Linux system configuration, networking, monitoring, and production oriented Docker practices. The focus was not only on making the application run, but on understanding how each layer works and how to debug real world issues when they arise.