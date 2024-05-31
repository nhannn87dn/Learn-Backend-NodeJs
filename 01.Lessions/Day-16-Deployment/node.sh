#!/bin/bash

#print HOME DIR
sudo -i -H -u $username bash -c 'echo $HOME'

#  'username'
username=${username}
# Install NVM as the specified user
sudo -i -H -u $username bash -c 'curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.34.0/install.sh | bash'

# Install Node.js version 18 using NVM
sudo -i -H -u $username nvm install 20

# Install PM2 globally
sudo -i -H -u $username npm install -g pm2

# Install Yarn globally
sudo -i -H -u $username npm install -g yarn