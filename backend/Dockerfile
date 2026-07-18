FROM node:20-alpine
 
WORKDIR /app
 
COPY package*.json ./

RUN npm ci
 
COPY . .

RUN DATABASE_URL=postgresql://dummy:dummy@localhost:5432/dummy npx prisma generate
 
EXPOSE 4000

CMD ["sh", "-c", "npx prisma migrate deploy && npx ts-node src/index.ts"]