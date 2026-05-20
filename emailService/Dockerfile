# Base image
FROM eclipse-temurin:21
RUN apt-get update && apt-get install -y curl && rm -rf /var/lib/apt/lists/*
COPY target/emailService-0.0.1-SNAPSHOT.jar email-service.jar


EXPOSE 8084


ENTRYPOINT ["java","-jar","/email-service.jar"]