from fastapi import APIRouter
from typing import Dict

router = APIRouter(prefix="/computer", tags=["computer"])

@router.get("/screenshot")
async def screenshot() -> str:
    return "screenshot_data"

@router.post("/key")
async def key(key: str) -> None:
    pass

@router.post("/type")
async def type_text(text: str) -> None:
    pass

@router.post("/mouse-move")
async def mouse_move(x: int, y: int) -> None:
    pass

@router.post("/left-click")
async def left_click() -> None:
    pass

@router.post("/right-click")
async def right_click() -> None:
    pass

@router.post("/middle-click")
async def middle_click() -> None:
    pass

@router.post("/double-click")
async def double_click() -> None:
    pass

@router.get("/cursor-position")
async def cursor_position() -> Dict[str, int]:
    return {"x": 100, "y": 200}
