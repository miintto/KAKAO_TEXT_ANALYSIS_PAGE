# 카카오톡 대화 분석

[바로가기](http://52.78.105.24:8000)

# 1. Setting
## 1.1 Clone
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

## 1.2 Install Packages
~~~bash
$> sudo pip3 install -r requirements.txt
$> bash < (curl -s https://raw.githubusercontent.com/konlpy/konlpy/master/scripts/mecab.sh)   ### Install Mecab
~~~

## 1.3 Set Config File
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

## 1.4 Run Server
~~~bash
$> python3 manage.py migrate
$> python3 manage.py runserver 0.0.0.0:8000
~~~

# 2. Site Info
## 2.1 Main Page
<img src="https://github.com/miintto/KAKAO_TEXT_ANALYSIS_PAGE/blob/develop/static/img/readme_001.PNG">
메인 페이지에서는 파일을 업로드할 수 있는 화면이 있으며, 본 사이트에 대한 개괄적인 가이드 내용을 확인할 수 있다.

## 2.2 Sample Page
<img src="https://github.com/miintto/KAKAO_TEXT_ANALYSIS_PAGE/blob/develop/static/img/readme_002.PNG">
직접 파일을 업로드하지 않고도 샘플 차트를 확인할 수 있다.

## 2.3 Loading Page
<img src="https://github.com/miintto/KAKAO_TEXT_ANALYSIS_PAGE/blob/develop/static/img/readme_003.PNG">
텍스트 파일을 업로드하면 로딩창이 나타난다. 파일이 성공적으로 가공되어 DB에 저장되면 자동으로 차트 페이지로 넘어가며, 실패한 경우 메인 화면으로 돌아갈 수 있는 에러 페이지로 이동된다

## 2.4 Chart Page
<img src="https://github.com/miintto/KAKAO_TEXT_ANALYSIS_PAGE/blob/develop/static/img/readme_004.PNG">
해당 화면에서 업로드한 텍스트 파일에 관한 데이터를 차트로 시각화하여준다. 시작 날짜와 종료 날짜를 변경하여 원하는 기간으로 범위를 조정할 수 있으며, 특정 단어에 대한 사용자의 사용 빈도를 검색할 수 있다. 

## 2.5 Info Page
<img src="https://github.com/miintto/KAKAO_TEXT_ANALYSIS_PAGE/blob/develop/static/img/readme_005.PNG">
페이지 및 제작자에 관한 간단한 정보를 확인할 수 있다.
