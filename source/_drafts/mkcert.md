https://github.com/FiloSottile/mkcert

```bash
# 安装 chocolatey
Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))
# 安装 mkcert
choco install mkcert
# 将CA证书加入本地可信CA，使用此命令，就能帮助我们将mkcert使用的根证书加入了本地可信CA中，以后由该CA签发的证书在本地都是可信的
mkcert -install
#CA证书的存放路径
mkcert -CAROOT
# 签发本地访问的证书
mkcert localhost 127.0.0.1

# 将公钥.pem格式改为.crt格式 安装
# 使用chrome浏览器进行验证查看是否生效 chrome://settings/security
```
