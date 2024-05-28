# Gunakan Node.js sebagai base image
FROM node:14

# Buat direktori kerja di dalam container
WORKDIR /app

# Salin package.json dan package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Salin seluruh kode aplikasi ke dalam container
COPY . .

# Expose port 3000
EXPOSE 3000

# Jalankan aplikasi
CMD ["npm", "start"]
