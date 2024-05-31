# Deploy To VPS Centos with DirectAdmin

## Cài NodeJs

### 1. Update CentOS

```bash
yum update -y
```

### 2. Install Node.js on CentOS 7

Cài đặt thông qua Tool nvm để tiện thay đổi nâng cấp về sau

```bash
# installs nvm (Node Version Manager)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash

# download and install Node.js
nvm install 20

# Kiểm tra phiên bản NodeJs đã cài
node -v # should print `v20.14.0`

# Kiểm tra phiên bản NPM đã cài
npm -v # should print `10.7.0`
```


## Cài NodeJs