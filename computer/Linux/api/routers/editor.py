from fastapi import APIRouter, HTTPException
from typing import List, Optional
import os

router = APIRouter(prefix="/editor", tags=["editor"])

@router.post("/view")
async def view(path: str, view_range: Optional[List[int]] = None) -> str:
    try:
        with open(path, 'r') as file:
            lines = file.readlines()
        if view_range and len(view_range) == 2:
            start, end = view_range
            start = max(0, start)
            end = min(len(lines), end)
            lines = lines[start:end]
        return "".join(lines)
    except FileNotFoundError:
        raise HTTPException(status_code=404, detail=f"File not found: {path}")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/create")
async def create(path: str, file_text: Optional[str] = None) -> None:
    try:
        os.makedirs(os.path.dirname(path), exist_ok=True)
        with open(path, 'w') as file:
            if file_text:
                file.write(file_text)
    except FileExistsError:
        raise HTTPException(status_code=400, detail=f"File already exists: {path}")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/str-replace")
async def str_replace(path: str, old_str: str, new_str: str) -> None:
    try:
        with open(path, 'r') as file:
            content = file.read()
        new_content = content.replace(old_str, new_str)
        with open(path, 'w') as file:
            file.write(new_content)
    except FileNotFoundError:
        raise HTTPException(status_code=404, detail=f"File not found: {path}")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/insert")
async def insert(path: str, text: str, insert_line: Optional[int] = None) -> None:
    try:
        with open(path, 'r') as file:
            lines = file.readlines()
        if insert_line is None:
            insert_line = len(lines)
        insert_line = max(0, min(len(lines), insert_line))
        if not text.endswith('\n'):
            text += '\n'
        lines.insert(insert_line, text)
        with open(path, 'w') as file:
            file.writelines(lines)
    except FileNotFoundError:
        raise HTTPException(status_code=404, detail=f"File not found: {path}")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/undo-edit")
async def undo_edit(path: str) -> None:
    try:
        raise Exception("Not implemented")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
