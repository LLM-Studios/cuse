import subprocess
from fastapi import APIRouter, HTTPException

router = APIRouter(prefix="/bash", tags=["bash"])

@router.post("/command")
async def command(command: str) -> str:
    try:
        return subprocess.getoutput(command)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/restart")
async def restart() -> None:
    try:
        raise Exception("Not implemented")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
