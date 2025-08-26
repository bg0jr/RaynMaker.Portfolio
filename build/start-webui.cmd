@echo off
setlocal

pnpm -C "%~dp0..\src\RaynMaker.Portfolio.WebUI" run serve

endlocal
