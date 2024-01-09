npm install --save-dev nodemon

npm run practice_task_node or npm run practice_task_nodemon

node --version
nvm --version
npm --version

// check version
node -v || node --version

// list locally installed versions of node
nvm ls

// list remove available versions of node
nvm ls-remote

// install specific version of node
nvm install 10.24.1

// set default version of node
nvm alias default 10.24.1

// switch version of node
nvm use 20.10.0

// install latest LTS version of node (Long Term Support)
nvm install --lts

// install latest stable version of node
nvm install stable

npm install --save-dev jest

npm install --save-dev mocha

npm install --save-dev ts-jest @types/jest

npm install axios