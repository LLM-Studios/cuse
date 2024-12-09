from fastapi import APIRouter

router = APIRouter(prefix="/bash", tags=["bash"])

@router.post("/command")
async def command(command: str) -> str:
    return f"Executed: {command}"

@router.post("/restart")
async def restart() -> None:
    pass
