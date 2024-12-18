from fastapi import FastAPI
from fastapi.responses import RedirectResponse
from routers import computer, bash, editor

app = FastAPI()

app.include_router(computer.router)
app.include_router(bash.router)
app.include_router(editor.router)

@app.get("/")
async def root():
    return RedirectResponse(url="/docs")
