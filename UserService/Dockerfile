FROM eclipse-temurin:21

RUN apt-get update && apt-get install -y curl && rm -rf /var/lib/apt/lists/*
COPY target/UserService-0.0.1-SNAPSHOT.jar user-service.jar

EXPOSE 8082

ENTRYPOINT ["java","-jar","user-service.jar"]