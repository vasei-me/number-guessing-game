FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
COPY tsconfig.json ./

RUN npm install

COPY . .

RUN npm run build

RUN mkdir -p /app/data

EXPOSE 3000

# اصلاح شد: از dist/main.js استفاده کنید
CMD ["node", "dist/main.js"]
