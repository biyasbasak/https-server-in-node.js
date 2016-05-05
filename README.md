#Installing
npm install

#To generate a self-signed certificate

openssl genrsa 1024 > private.key </br>
openssl req -new -key private.key -out cert.csr </br>
openssl x509 -req -in cert.csr -signkey private.key -out certificate.pem </br>

