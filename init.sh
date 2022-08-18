#!/bin/bash

sudo set -x
sudo yum update -y
sudo yum install docker -y
sudo usermod -a -G docker ec2-user
id ec2-user
newgrp docker

wget https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m) 
sudo mv docker-compose-$(uname -s)-$(uname -m) /usr/local/bin/docker-compose
sudo chmod -v +x /usr/local/bin/docker-compose
sudo systemctl enable docker.service
sudo systemctl start docker.service

sudo yum install git -y
sudo -u ec2-user /bin/bash -l
cd 
echo "-----BEGIN OPENSSH PRIVATE KEY-----
b3BlbnNzaC1rZXktdjEAAAAABG5vbmUAAAAEbm9uZQAAAAAAAAABAAAAMwAAAAtzc2gtZW
QyNTUxOQAAACBFFpRqX4N5jED/QKPKcW98XAkWplO9zo6TCXGKJvOhjgAAAKDLeh0oy3od
KAAAAAtzc2gtZWQyNTUxOQAAACBFFpRqX4N5jED/QKPKcW98XAkWplO9zo6TCXGKJvOhjg
AAAEAR2mxxGKcnuL/eWRovATxZR57xYfOnqWGwjmrWD8R5tkUWlGpfg3mMQP9Ao8pxb3xc
CRamU73OjpMJcYom86GOAAAAGXNlZ3VsbHNoYWlyYnV0dEBnbWFpbC5jb20BAgME
-----END OPENSSH PRIVATE KEY-----" >> ~/.ssh/id_rsa

echo "ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIEUWlGpfg3mMQP9Ao8pxb3xcCRamU73OjpMJcYom86GO segullshairbutt@gmail.com" >> ~/.ssh/id_rsa.pub
chmod 600 ~/.ssh/id_rsa

eval "$(ssh-agent -s)"
ssh-add ~/.ssh/id_rsa

git clone git@github.com:HadilD/blue-bird.git
cd blue-bird 
cp django_backend/django_backend/example.env django_backend/django_backend/.env
docker-compose build


# TODOs are following:
# Changing the HOST_URL, MESSAGING_PATH of react application to remote one e-g IP
# Load initial data to make it run smoothly
