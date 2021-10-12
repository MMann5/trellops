cd /D "%~dp0"
start cmd /k npm start
set url="http://localhost:2556"
start chrome %url%