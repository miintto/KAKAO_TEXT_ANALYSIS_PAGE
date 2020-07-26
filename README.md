# 카카오톡 대화 분석

[바로가기](http://52.78.105.24:8000)

# 1. Setting
## 1.1 Environment (CentOs 7)
~~~
$> sudo yum update -y
$> sudo yum install -y gcc gcc-c++ curl wget java-1.8.0-openjdk-devel make diffutils
$> sudo yum install -y git

### python3 설치
$> sudo yum install -y python36 python36-devel
$> python3 -V
Python 3.6.8
~~~

## 1.2 Clone
~~~bash
$> git clone https://github.com/miintto/KAKAO_TEXT_ANALYSIS_PAGE.git
$> cd KAKAO_TEXT_ANALYSIS_PAGE/
$> tree -d
.
├─ KAKAO_ANAL        ### 세팅 
├─ analysis          ### Front 화면
│   ├─ migrations
│   └─ templates
│       └─ analysis
├─ api               ### API 
│   ├─ migrations
│   └─ service
├─ common            ### 공통 파일 (HTML, Python 모듈)
│   ├─ migrations
│   ├─ module
│   └─ templates
│       └─ common
├─ static            ### Static 파일 (CSS, Javacsript, image)
│   ├─ css
│   ├─ img
│   ├─ js
│   │   └─ analysis
│   └─ migrations
└─ logs              ### 로그
~~~

## 1.3 Set Virtural Env. and Install Packages
~~~bash
$> sudo pip3 install virtualenv
$> virtualenv venv
$> source venv/bin/activate
$> sudo pip3 install -r requirements.txt

### Install Mecab
$> bash < (curl -s https://raw.githubusercontent.com/konlpy/konlpy/master/scripts/mecab.sh)
~~~

### 1.4 Set Config File
~~~bash
$> vi KAKAO_ANAL/setting_private.py
SECRET_KEY = 'SECRET_KEY'

DEBUG = True

ALLOWED_HOSTS = ["*"]

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'DBNAME',
        'USER': 'USER',
        'PASSWORD': 'PASSWORD',
        'HOST': 'localhost',
        'PORT': '3306'
        'OPTIONS': {'charset': 'utf8mb4'}
    }
}
~~~

## 1.5 Run Server
~~~bash
$> python3 manage.py migrate
$> python3 manage.py runserver 0.0.0.0:8000
~~~


# * 별첨
### * Local DB를 사용하는 경우
~~~bash
### mysql 설치
$> sudo wget https://dev.mysql.com/get/mysql80-community-release-el7-1.noarch.rpm
$> sudo rpm -Uvh mysql80-community-release-el7-1.noarch.rpm
$> sudo yum install -y mysql-server mysql-devel
$> sudo systemctl start mysqld

$> sudo grep 'temporary password' /var/log/mysqld.log  # root 계정의 임시 비번 확인
$> mysql -u root -p

### 초기 실행시 root 비밀번호 reset 해야함
> ALTER USER 'root'@'localhost' IDENTIFIED WITH caching_sha2_password BY 'NEW_PASSWORD';
> FLUSH PRIVILEGES;

### DB및 USER 생성
> CREATE USER 'USER'@'localhost' IDENTIFIED BY 'PASSWORD';
> CREATE DATABASE DBNAME;
> GRANT ALL PRIVILEGES ON DBNAMD.* TO 'USER'@'%';
> quit

$> python3 manage.py makemigrations
~~~
 

### * Apache 연동
~~~bash
$> sudo yum -y install httpd   ### apache 설치
$> sudo yum -y install httpd-devel   ### apache 설치
$> yum search wsgi
$> sudo yum install python36u-mod_wsgi.x86_64
$> sudo vi /etc/httpd/conf/httpd.conf   ### IncludeOptional 확인
$> sudo vi /etc/httpd/conf.d/vhost.conf   ### 아파치에 django 연결
<VirtualHost *:80>
    ServerName localhost

    WSGIScriptAlias / /home/centos/kakao/KAKAO_TEXT_ANALYSIS_PAGE/mysite/wsgi.py
    WSGIDaemonProcess mysite python-home=/home/centos/kakao/KAKAO_TEXT_ANALYSIS_PAGE/venv python-path=/home/centos/kakao/KAKAO_TEXT_ANALYSIS_PAGE/mysite
    WSGIProcessGroup mysite

    <Directory /home/centos/kakao/KAKAO_TEXT_ANALYSIS_PAGE/mysite>
        <Files wsgi.py>
            # Order allow,deny
            # Allow from all
            AllowOverride none
            Require all granted
        </Files>
    </Directory>

    Alias /static /home/centos/kakao/KAKAO_TEXT_ANALYSIS_PAGE/static
    <Directory /home/centos/kakao/KAKAO_TEXT_ANALYSIS_PAGE/static>
        # Order allow,deny
        # Allow from all
        AllowOverride none
        Require all granted
    </Directory>
</VirtualHost>

$> vi mysite/wsgi.py 
import os
import sys

from django.core.wsgi import get_wsgi_application

path = '/home/centos/kakao/KAKAO_TEXT_ANALYSIS_PAGE'
if path not in sys.path:
    sys.path.append(path)

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'mysite.settings')

application = get_wsgi_application()

$> sudo service httpd start
~~~
서버접속 확인

403 에러시
~~~
(13)Permission denied: [client 27.35.47.203:62583] AH00035: access to / denied (filesystem path '/home/centos/kakao') because search permissions are missing on a component of the path

$> sudo vi /etc/httpd/conf/httpd.conf
<Directory />
  Require all granted   ### 변경

$> sudo service httpd restart

$> chmod 711 /home/centos  ### 그래도 안되면 계정 권한문제
$> sudo service httpd restart
~~~
아파치 로그는 다음으로 확인
~~~
$> sudo vi /var/log/httpd/error_log
~~~

500 에러시
~~~
[client 27.35.47.203:62641] AH01512: mod_mime_magic: can't read `/home/centos/kakao/KAKAO_TEXT_ANALYSIS_PAGE/mysite/wsgi.py'
~~~
django를 가상환경에서 setting했지만 venv경로를 설정하지 않아서 발생한 문제
- /etc/httpd/conf.d/vhost.conf 에서 python-home에 venv경로 추가

