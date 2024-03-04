# Build stage
FROM node:21 as builder

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn

# Copy all source files
COPY . .

# Compile TypeScript
RUN yarn build

# Run stage
FROM node:21

WORKDIR /app

COPY package*.json ./

RUN yarn

# Copy compiled JavaScript from the builder stage
COPY --from=builder /app/dist ./dist

EXPOSE 3330