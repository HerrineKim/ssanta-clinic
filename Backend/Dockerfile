FROM openjdk:11 as builder
WORKDIR /var/jenkins_home/workspace/ssanta/Backend
COPY . .
RUN chmod +x ./gradlew
RUN ./gradlew clean build

FROM openjdk:11 
COPY --from=builder /var/jenkins_home/workspace/ssanta/Backend/build/libs/*.jar ssanta.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "ssanta.jar"]