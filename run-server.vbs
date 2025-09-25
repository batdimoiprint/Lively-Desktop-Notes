Set WshShell = CreateObject("WScript.Shell")
WshShell.Run "cmd /c cd /d C:\Users\johnk\Development\lively && node server/server.js", 0
