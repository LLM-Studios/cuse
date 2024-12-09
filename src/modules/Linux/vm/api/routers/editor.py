from fastapi import APIRouter
from typing import List, Optional

router = APIRouter(prefix="/editor", tags=["editor"])

@router.post("/view")
async def view(path: str, view_range: Optional[List[int]] = None) -> None:
    pass

@router.post("/create")
async def create(path: str, file_text: Optional[str] = None) -> None:
    pass

@router.post("/str-replace")
async def str_replace(path: str, old_str: str, new_str: str) -> None:
    pass

@router.post("/insert")
async def insert(path: str, text: str, insert_line: Optional[int] = None) -> None:
    pass

@router.post("/undo-edit")
async def undo_edit(path: str) -> None:
    pass
