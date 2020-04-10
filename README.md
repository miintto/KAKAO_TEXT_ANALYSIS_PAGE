# 카카오톡 대화 분석

[바로가기  (서버 : 52.78.105.24)](http://52.78.105.24:8000/analysis/main)

# 1. Setting
### 1.1 Clone
~~~bash
$> git clone https://github.com/miintto/KAKAO_TEXT_ANALYSIS_PAGE.git
$> cd KAKAO_TEXT_ANALYSIS_PAGE/
$> tree
.
├─ mysite
├─ analysis
│   ├─ migrations
│   └─ templates
│       └─ analysis
├─ static
│   ├─ migrations
│   ├─ script
│   │   └─ charts
│   ├─ css
│   └─ analysis
├─ uploads
│   └─ csv
├─ api
│   └─ migrations
├─ venv
└─ logs
~~~

### 1.2 Set Config File
~~~
$> vi mysite/setting_private.py
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
    }
}
~~~

### 1.3 Virtural Env. Setting
~~~bash
$> pip3 install virtualenv
$> virtualenv venv
$> source venv/bin/activate
$> pip install -r requirements.txt
~~~

### 1.4 DB Setting
~~~
$> mysql -u root
> CREATE DATABASE DBNAME;
> CREATE USER 'USER'@'localhost' IDENTIFIED BY 'PASSWORD';
> GRANT ALL PRIVILEGES ON * . * TO 'USER'@'localhost';
> quit;
$> python3 manage.py migrate
~~~

### 1.5 Run Server
~~~bash
$> python3 manage.py runserver 0.0.0.0:8000
~~~

###
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

