Commads for Docker:

First we have to create a file called `Dockerfile` (joined with `.dockerignore`)
Example:
CODE:   FROM node:alpine
        WORKDIR /app
        COPY package.json ./
        RUN npm install
        COPY ./ ./
        CMD ["npm", "start"]

CMDs:
1. docker build .
2. docker build -t nameTarget .
3. docker exec -it [nameImageTarget] [cmd]
4. docker ps
5. docker run -it [nameImageTarget] [cmd]
6. docker push [nameImageTarget]
