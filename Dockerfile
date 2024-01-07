# Build stage
FROM node:16 as builder

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn

# Copy all source files
COPY . .

# Compile TypeScript
RUN yarn build

# Run stage
FROM node:16

WORKDIR /app

COPY package*.json ./

RUN yarn

# Copy compiled JavaScript from the builder stage
COPY --from=builder /app/dist ./dist

EXPOSE 3330

# Command to run the application
CMD ["yarn", "devmon"]