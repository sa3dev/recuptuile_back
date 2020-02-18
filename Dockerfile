FROM node:12-alpine
WORKDIR /app
COPY . .
RUN npm ci --no-optionnal && npm cache clean --force
ENV PATH /app/node_modules/.bin:$PATH
RUN npm run build
CMD ["npm", "run", "start"]