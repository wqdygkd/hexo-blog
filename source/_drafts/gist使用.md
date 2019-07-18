
gist

ssh: connect to host gist.github.com port 22: Connection timed out
在host中添加
192.30.253.118 gist.github.com

git@gist.github.com: Permission denied (publickey).
fatal: Could not read from remote repository

在 ~/.ssh/confifg 中添加配置
```bash
# user gist
Host gist.github.com
HostName gist.github.com
User cuilongjin
IdentityFile ~/.ssh/id_rsa_github
```

