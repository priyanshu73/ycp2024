@echo off
REM Activate the virtual environment
call env\Scripts\activate

REM Run the FastAPI server
uvicorn main:app --reload
