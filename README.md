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
