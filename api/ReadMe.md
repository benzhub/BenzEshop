### 1. 首先創建虛擬環境&安裝套件
```shell
mkvirtualenv -p python3 <env name>
python -m pip install --upgrade pip
# 安裝所有套件
python -m pip install -r requirements.txt
```

### 2. ubuntu 中常見 mysql 連線問題
```shell
sudo apt-get update

sudo apt-get install libmysqlclient-dev

python -m pip install mysqlclient
```

### 3. 修正project name
請把"api"等相關關鍵字改成你的專案名

### 4. 設定MySQL連線
```shell
### 注意: .sh文件的變量中，如果有$在""之中，會被轉譯，請在$之前加上\(反斜線)
sudo vim env_vars.sh
# 在 Local Linux中export 環境變量
source env_vars.sh

# 測試連線
python manage.py runserver 8000

# 如果連線成功我們設定migration
python manage.py makemigrations
python manage.py migrate
```

### 5. 設定你的AWS cli & IAM的key

### 設定Zappa
https://www.geeksforgeeks.org/how-to-deploy-django-application-in-aws-lambda/
```shell
zappa init

zappa deploy <your stage>
```

### 改變Lambda內的環境變數
```shell
python set_aws_env_vars.py
```

### 如果遇到 You may lack the necessary AWS permissions to automatically manage a Zappa execution role.
https://github.com/Zappa/Zappa#custom-aws-iam-roles-and-policies-for-deployment
./zappa_settings.json
```json
{
    "dev": {
        ...
        "manage_roles": false, // Disable Zappa client managing roles.
        "role_name": "MyLambdaRole", // Name of your Zappa execution role. Optional, default: <project_name>-<env>-ZappaExecutionRole.
        "role_arn": "arn:aws:iam::12345:role/app-ZappaLambdaExecutionRole", // ARN of your Zappa execution role. Optional.
        ...
    },
    ...
}
```
### 如果上傳失敗，可以查看log
```shell
zappa tail
```

### 如果還是沒有辦法解決，可以考慮先把user的權限提升後，再慢慢下降設定user權限


### 如果lambda function 出現=>Error loading MySQLdb module. Did you install mysqlclient
虛擬環境中安裝pymysql
```shell
python -m pip install pymysql
```

然後在settings.py同級的目錄下的__init__.py文件中寫入(或者在app(子應用))同級目錄下的__init__.py文件增加也可以
```python
import pymysql
pymysql.install_as_MySQLdb()
```

### 讓Django可以直接讀取AWS S3
```shell
python -m pip install django-storages
```

```python
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'projects.apps.ProjectsConfig',
    'users.apps.UsersConfig',

    'rest_framework',
    'rest_framework_simplejwt',
    'corsheaders',
		'storages'
]

DEFAULT_FILE_STORAGE = 'storages.backends.s3boto3.S3Boto3Storage'

AWS_QUERYSTRING_AUTH = False
# 相同名字是否覆蓋，相同名字會添加 hash
AWS_S3_FILE_OVERWRITE = False

AWS_ACCESS_KEY_ID = ''
AWS_SECRET_ACCESS_KEY = ''
AWS_STORAGE_BUCKET_NAME = ''

```

### 然後記得把上傳的s3 文件的權限打開
https://docs.aws.amazon.com/zh_tw/AmazonS3/latest/userguide/WebsiteAccessPermissionsReqd.html

### 正式環境可以在設定AWS waf 阻擋過多的請求
