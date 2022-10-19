FROM node:17-slim
USER node
RUN mkdir -p /home/node/app
WORKDIR /home/node/app
#COPY --chown=node package.json /home/node/app
COPY --chown=node . /home/node/app
RUN npm install -f
#RUN npm run build
ENV HOST=0.0.0.0 PORT=5000
EXPOSE ${PORT}
CMD ["npm", "run", "start"]