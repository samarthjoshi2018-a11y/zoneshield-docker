# Base image
FROM eclipse-temurin:17-jre
RUN apt-get update && apt-get install -y curl && rm -rf /var/lib/apt/lists/*
COPY target/ApiGateway-0.0.1-SNAPSHOT.jar api-gateway.jar


EXPOSE 8080


ENTRYPOINT ["java","-jar","/api-gateway.jar"]