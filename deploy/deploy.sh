sudo docker load < /jenkins/images_tar/react.tar
sudo docker load < /jenkins/images_tar/spring.tar

if (sudo docker ps | grep "react"); then sudo docker stop react; sudo docker rm react; fi
if (sudo docker ps | grep "spring"); then sudo docker stop spring; sudo docker rm spring; fi

sudo docker run -it -d --rm -p 80:80 -p 443:443 -v /etc/letsencrypt/:/etc/letsencrypt/ --name react ssantaclinic/react
# sudo docker run -it -d -p 80:80 --name react ssantaclinic/react
echo "Run Vue-Nginx Container"
sudo docker run -it -d --rm -p 8080:8080  --name spring ssantaclinic/spring
echo "Run Spring Container"
