xdg-mime default code.desktop text/plain
sudo update-alternatives --set editor /usr/bin/code
sudo apt install ./<file>.deb
# On older Linux distributions, run these commands instead:
# sudo dpkg -i <file>.deb
# sudo apt-get install -f # Install dependencies
sudo apt install wget gpg && wget -qO- https://packages.microsoft.com/keys/microsoft.asc | sudo gpg --dearmor -o /usr/share/keyrings/microsoft.gpg
sudo apt install ./<file>.deb
# On older Linux distributions, run these commands instead:
# sudo dpkg -i <file>.deb
# sudo apt-get install -f # Install dependencies
sudo apt install wget gpg && wget -qO- https://packages.microsoft.com/keys/microsoft.asc | sudo gpg --dearmor -o /usr/share/keyrings/microsoft.gpg
Types: deb
URIs: https://packages.microsoft.com/repos/code
Suites: stable
Components: main
Architectures: amd64,arm64,armhf
Signed-By: /usr/share/keyrings/microsoft.gpg
sudo apt update && sudo apt install code # or code-insiders
echo "code code/add-microsoft-repo boolean true" | sudo debconf-set-selections
sudo apt install ./<file>.deb
# On older Linux distributions, run these commands instead:
# sudo dpkg -i <file>.deb
# sudo apt-get install -f # Install dependencies
Types: deb
URIs: https://packages.microsoft.com/repos/code
Suites: stable
Components: main
Architectures: amd64,arm64,armhf
Signed-By: /usr/share/keyrings/microsoft.gpg
cpm
cmp
// server.mjs
import { createServer } from 'node:http';
const server = createServer((req, res) => {
});
// starts a simple http server locally on port 3000
server.listen(3000, '127.0.0.1', () => {
});
// run with `node server.mjs`
sudo apt update && sudo apt upgrade
sudo apt install curl gpg software-properties-common apt-transport-https
curl -sSL https://microsoft.com | sudo gpg --dearmor -o /usr/share/keyrings/ms-vscode-keyring.gpg
echo "deb [arch=amd64 signed-by=/usr/share/keyrings/ms-vscode-keyring.gpg] https://microsoft.com stable main" | sudo tee /etc/apt/sources.list.d/vscode.list
sudo apt update
sudo apt install code
sudo snap install code --classic).
sudo rpm --import https://microsoft.com
sudo sh -c 'echo -e "[code]\nname=Visual Studio Code\nbaseurl=https://microsoft.com\nenabled=1\ngpgcheck=1\ngpgkey=https://microsoft.com" > /etc/yum.repos.d/vscode.repo'
sudo dnf install code
sudo pacman -S code
code
sudo apt-get update && sudo apt-get dist-upgrade
sudo apt update && sudo apt upgrade
sudo apt install curl gpg software-properties-common apt-transport-https
curl -sSL https://microsoft.com | sudo gpg --dearmor -o /usr/share/keyrings/ms-vscode-keyring.gpg
echo "deb [arch=amd64 signed-by=/usr/share/keyrings/ms-vscode-keyring.gpg] https://microsoft.com stable main" | sudo tee /etc/apt/sources.list.d/vscode.list
sudo apt update
sudo apt install code
code
sudo snap install code --classic
df -h
sudo apt upgrade
man [comando]
man <command>
exit

node
nodejs

npm installl
npm install
cp .env.example .env
# adjust .env if needed
npm run dev
npm install && npm test --silent
# instala gh si no lo tienes, luego:
gh auth login
gh repo create OWNER/REPO --public --source=. --remote=origin --push
```bash
npm install
cp .env.example .env
# adjust .env if needed
npm run dev
```
CI status
----------
npm install
cp .env.example .env
# adjust .env if needed
npm run dev
ls -l
cd proyecto-web
proyecto2
cd proyecto2
npm install
cp .env.example .env
npm run dev
- `GET /health` — simple health check
```bash
docker-compose up --build
```
sudo -i
docker-compose up --build
code
// server.mjs
import { createServer } from 'node:http';
const server = createServer((req, res) => {
});
// starts a simple http server locally on port 3000
server.listen(3000, '127.0.0.1', () => {
});
// run with `node server.mjs`
pwsh
sudo snap install powershell --classic
# Actualizar la lista de paquetes
sudo apt-get update
# Instalar requisitos previos
sudo apt-get install -y wget apt-transport-https software-properties-common
# Descargar y registrar la llave pública del repositorio de Microsoft
wget -q https://microsoft.com(lsb_release -rs)/packages-microsoft-prod.deb
sudo dpkg -i packages-microsoft-prod.deb
# Actualizar lista de paquetes e instalar PowerShell
sudo apt-get update
sudo apt-get install -y powershell
rm -f packages-microsoft-prod.deb
sudo apt-get update
sudo apt-get install -y wget libicu-dev
# 1. Descargar el paquete de la versión estable actual (v7.6.2 para sistemas de 64 bits)
wget https://github.com/PowerShell/PowerShell/releases/download/v7.6.2/powershell_7.6.2-1.deb_amd64.deb
# 2. Instalar el paquete descargado
sudo dpkg -i powershell_7.6.2-1.deb_amd64.deb
# 3. Corregir cualquier problema de dependencias faltantes automáticamente
sudo apt-get install -f
# 4. Eliminar el instalador ya utilizado para limpiar tu espacio
rm powershell_7.6.2-1.deb_amd64.deb
pwsh
# 1. Instalar fnm
curl -fsSL https://vercel.app | bash
# 2. Recargar la configuración de tu terminal (si usas bash)
source ~/.bashrc
# 3. Instalar la versión estable más reciente de Node.js (e incluye npm)
fnm install --lts
# 4. Activar esa versión instalada
fnm use --lts
pwsh
# 1. Descargar y configurar el repositorio oficial de Node.js (Versión estable 22)
curl -fsSL https://nodesource.com | sudo -E bash -
# 2. Instalar Node.js y NPM juntos
sudo apt-get install -y nodejs
node -v
npm -v
node -v
npm -v
sudo apt update
sudo apt install -y npm
node -v
npm -v
pwsh
npm install mongodb
mongodb+srv://WilliWonka:<Llamas048>@chinosan4323.t5nkm0m.mongodb.net/?appName=Chinosan4323



npm run dev
