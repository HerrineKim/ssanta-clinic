FROM node:16.16.0 as build-stage
WORKDIR /var/jenkins_home/workspace/ssanta/Frontend/ssantaclinic
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
FROM nginx:stable-alpine as production-stage

COPY --from=build-stage /var/jenkins_home/workspace/ssanta/Frontend/ssantaclinic/build /usr/share/nginx/html
COPY --from=build-stage /var/jenkins_home/workspace/ssanta/Frontend/ssantaclinic/deploy_conf/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80 443
CMD ["nginx", "-g","daemon off;"]