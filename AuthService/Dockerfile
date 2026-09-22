# Base image
FROM eclipse-temurin:21
RUN apt-get update && apt-get install -y curl && rm -rf /var/lib/apt/lists/*
COPY target/AuthService-0.0.1-SNAPSHOT.jar auth-service.jar


EXPOSE 8081


ENTRYPOINT ["java","-jar","/auth-service.jar"]