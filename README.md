# Node-Blog [![Build Status](https://travis-ci.com/uncleabbey/node-blog.svg?branch=main)](https://travis-ci.com/uncleabbey/node-blog) [![Coverage Status](https://coveralls.io/repos/github/uncleabbey/node-blog/badge.svg?branch=main)](https://coveralls.io/github/uncleabbey/node-blog?branch=main)

## Technology Used

- Node
- Express
- Babel
- Mocha for test
- Nyc for test 
- Mongodb


## Running Locally

- Clone or fork the repo then 
- type `npm install` or `yarn` to install packages. 
- create .env file in the root folder. and the following

SEC_KEY=string
DEV_DB_URL=mongodb://localhost/blog-dev
NODE_ENV=development

- After that run `npm run dev`