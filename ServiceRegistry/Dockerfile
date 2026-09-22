# Base image
FROM eclipse-temurin:25-jdk
RUN apt-get update && apt-get install -y curl && rm -rf /var/lib/apt/lists/*
COPY target/ServiceRegistry-0.0.1-SNAPSHOT.jar service-registry.jar


EXPOSE 8761


ENTRYPOINT ["java","-jar","/service-registry.jar"]