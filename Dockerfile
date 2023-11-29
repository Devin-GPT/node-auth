FROM node:16

WORKDIR /app



COPY package*.json ./

RUN yarn

COPY . .

EXPOSE 3330

RUN yarn build

# Start the application
CMD ["yarn", "dev"]
