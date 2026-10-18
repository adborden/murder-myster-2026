# Murder Mystery 2026

Static site scaffolded with **Vite**, **Vue 3**, and **JSX / TSX**, configured for containerized production serving with **unprivileged Nginx** on **Kubernetes** (managed via ArgoCD).

---

## Features

- ⚡ **Vite 8 + Vue 3 + TypeScript**: Ultra-fast dev server with HMR and type safety.
- ⚛️ **Vue JSX/TSX**: Configured with `@vitejs/plugin-vue-jsx` and TSX support out of the box.
- 🧪 **Vitest Testing**: Unit and component tests via `vitest`, `@vue/test-utils`, and `happy-dom`.
- 🛠️ **Makefile Entrypoints**: Unified targets for local development, testing, building, and Docker container workflows.
- 🐳 **Multi-stage Dockerfile**: Minimal, secure build using Node 22 Alpine for bundling and unprivileged Nginx for serving.
- 🔒 **Rootless / Unprivileged Nginx**: Runs as non-root UID `101`, satisfying Kubernetes restricted pod security standards.
- 🌐 **Production Nginx Routing**:
  - Client-side SPA routing fallback (`try_files $uri $uri/ /index.html;`)
  - Gzip compression
  - Long-term caching for immutable hashed assets (`/assets/`)
  - `no-cache` for `index.html` to prevent stale releases
  - Dedicated `/healthz` endpoint for Kubernetes liveness and readiness probes
- ☸️ **Kubernetes Manifests**: Ready for ArgoCD in `k8s/deployment.yaml`.

---

## Makefile Commands

Run `make` or `make help` to see all available targets:

| Command | Description |
|---|---|
| `make install` | Install npm dependencies |
| `make dev` | Start Vite local dev server with HMR |
| `make test` | Run unit and component tests via vitest |
| `make type-check` | Run TypeScript type check (`vue-tsc -b`) |
| `make build` | Build production static site bundle into `dist/` |
| `make preview` | Preview the production static build locally |
| `make clean` | Remove build output (`dist/`) |
| `make docker-build` | Build the multi-stage Nginx container image |
| `make docker-run` | Run the Docker container locally on port `8080` |
| `make docker-stop` | Stop the locally running container |
| `make docker-test` | Test the container's `/healthz` probe endpoint |

---

## Local Development & Testing

Start the development server:
```bash
make dev
```

Run test suite:
```bash
make test
```

Build the static site:
```bash
make build
```

---

## Docker

### Build Image
```bash
make docker-build
```

### Run Locally
```bash
make docker-run
```

Visit [http://localhost:8080](http://localhost:8080) in your browser.

Verify health endpoint:
```bash
make docker-test
```

---

## Kubernetes & ArgoCD

Kubernetes manifests are located in [`k8s/deployment.yaml`](file:///home/adborden/projects/murder-mystery-2026/k8s/deployment.yaml) and are designed to be tracked and applied directly by **ArgoCD**:
- Non-root security context (`runAsNonRoot: true`, UID `101`, GID `101`)
- Dropped capabilities (`ALL`)
- Port `8080` container port with `ClusterIP` Service exposing port `80`
- Liveness and readiness HTTP probes targeting `/healthz`
