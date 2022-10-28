FROM openjdk:11-alpine as builder
WORKDIR /var/jenkins_home/workspace/ssanta/Backend
COPY . .
RUN ./gradlew clean build

FROM openjdk:11-alpine 
COPY --from=builder /var/jenkins_home/workspace/ssanta/Backend/build/libs/*.jar ssanta.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "ssanta.jar"]