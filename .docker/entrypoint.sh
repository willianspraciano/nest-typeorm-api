#!/bin/bash

npm install
npm run build
npm run typeorm:migrate
npm run start:dev