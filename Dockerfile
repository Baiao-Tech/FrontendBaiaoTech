# Dockerfile (prod, single-stage)
FROM node:20-slim

WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
# aumentar heap para build do Next.js
ENV NODE_OPTIONS=--max-old-space-size=16384 --max-new-space-size=4096

COPY package*.json ./

RUN npm ci --include=dev

COPY . .

# Se você usa NEXT_PUBLIC_* no build, passe como --build-arg (ver compose abaixo)
ARG NEXT_PUBLIC_API_URL
ARG NEXT_PUBLIC_FORM_LINK
ARG NEXT_PUBLIC_COMMUNITY_API_URL
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_FORM_LINK=$NEXT_PUBLIC_FORM_LINK
ENV NEXT_PUBLIC_COMMUNITY_API_URL=$NEXT_PUBLIC_COMMUNITY_API_URL

RUN npm run build

EXPOSE 3000
HEALTHCHECK --interval=30s --timeout=3s --start-period=20s \
  CMD node -e "require('http').get('http://127.0.0.1:3000',r=>process.exit(r.statusCode===200?0:1)).on('error',()=>process.exit(1))"

CMD ["node","server.js"]
