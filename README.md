# To-Link-Report-Use

## Deploy Frontend On Render

This repository includes a Render Blueprint file at [render.yaml](render.yaml).

### Option A: Blueprint Deploy (Recommended)

1. Push your latest changes to GitHub.
2. In Render, click New + and choose Blueprint.
3. Connect this repository.
4. Render will read [render.yaml](render.yaml) and create the web service automatically.
5. Open the generated onrender.com URL after deploy completes.

### Option B: Manual Web Service

If you deploy manually in Render dashboard, use:

- Root Directory: neighbourHood-master/neighbourHood-frontend
- Build Command: npm install && npm run build
- Start Command: npm run preview -- --host 0.0.0.0 --port $PORT
