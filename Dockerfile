FROM node:8.11.0
#Create app directory
WORKDIR /Biwer-Api
# Copy app source
COPY . .
# Build app inside container
RUN npm install
# expose app on 8080 inside container
EXPOSE 8080
# setting environmental variables
ENV MONGO_CONNECTION_STRING mongodb://18.191.160.225:27017
ENV MONGO_DB nautilus
# Host app at 8080 when container starts
CMD npm start --port 8080
