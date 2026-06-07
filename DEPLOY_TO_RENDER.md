Despliegue paso a paso (Render y Docker)

Esta guía contiene comandos y pasos exactos para desplegar esta aplicación de forma fiable.

1) Preparar el repositorio

1. Asegúrate de que todo está commiteado en `main`:

```bash
git checkout main
git pull origin main
git add .
git commit -m "Prepare for deploy"
git push origin main
```

2. Verifica que los siguientes archivos existen y están actualizados:
- `render.yaml`
- `.github/workflows/ci.yml` y `.github/workflows/deploy.yml`
- `.env.example`

2) Despliegue recomendado: Render (rápido, gratuito en plan básico)

1. Crea una cuenta en https://render.com y conecta tu cuenta GitHub.
2. En Render, crea un nuevo **Web Service** y selecciona tu repositorio y el branch `main`.
3. En la sección de *Environment* (Variables de entorno), añade:

```
NODE_ENV=production
PORT=3000
MONGO_URI=<tu_mongo_uri_de_atlas>
JWT_SECRET=<secret_largo_y_seguro>
APP_URL=https://<tu-servicio>.onrender.com
EMAIL_HOST=<smtp_host>        # opcional
EMAIL_PORT=<smtp_port>        # opcional
EMAIL_SECURE=false            # o true según el provider
EMAIL_USER=<smtp_user>        # opcional
EMAIL_PASS=<smtp_pass>        # opcional
EMAIL_FROM=<from_email>       # opcional
```

4. Despliega: Render ejecutará `npm ci && npm run build` y `npm start` (según `render.yaml`).
5. Revisa los logs de build y start en la UI. Si hay errores, corrígelos localmente y vuelve a push.

Notas de troubleshooting en Render
- Si el build falla por dependencias nativas, añade `node-gyp` o usa la imagen base compatible. El proyecto usa dependencias JS puras mayormente.
- Si la app no inicia: revisa que `JWT_SECRET` y `MONGO_URI` estén correctamente configuradas.

3) Alternativa: Docker (control total)

Construir imagen local y testear

```bash
docker build -t proyecto2:local .
docker run --rm -p 3000:3000 -e MONGO_URI="mongodb://host:27017/proyecto2" -e JWT_SECRET="secret" proyecto2:local
```

Levantar con `docker-compose` (incluye MongoDB local)

```bash
docker compose up --build
```

Publicar en GitHub Container Registry

```bash
docker build -t ghcr.io/<tu_usuario>/<repo>:latest .
echo $GITHUB_TOKEN | docker login ghcr.io -u <tu_usuario> --password-stdin
docker push ghcr.io/<tu_usuario>/<repo>:latest
```

Luego despliega esa imagen en el servicio que prefieras (Cloud Run, ECS, DigitalOcean, Fly.io, etc.).

4) Verificación post-deploy

1. Comprueba health:

```bash
curl -i https://<tu-servicio>.onrender.com/health
```

2. Registra y loguea un usuario de prueba (en producción, no se auto-verifican cuentas):

```bash
curl -i -X POST https://<tu-servicio>.onrender.com/api/auth/register -H "Content-Type: application/json" -d '{"name":"CI Test","email":"ci.test@example.com","password":"Password123"}'
```

5) Variables / Secrets requeridos

- `MONGO_URI` — conexión MongoDB Atlas
- `JWT_SECRET` — cadena segura
- `APP_URL` — URL pública
- `EMAIL_*` — si necesitas envíos de correo

6) Sugerencias adicionales

- Habilita revisiones de seguridad automáticas en GitHub (Dependabot).
- Añade un job en CI para validar `NODE_ENV=production` secrets antes de merge.
- Configura monitorización y alertas en Render o en tu proveedor.

Si quieres, puedo crear un `workflow` para desplegar automáticamente en Render usando la API de Render (requiere `RENDER_API_KEY`), o añadir un script `make deploy` que combine build + push a GHCR.
