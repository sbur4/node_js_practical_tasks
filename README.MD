# Practical task

Let's write our simplified version of the `top` CLI utility program. It provides a dynamic real-time view of the running system. Usually, this command shows the summary information of the system and the list of processes or threads currently managed by the *nix kernel. Our goal is to show the most CPU-intensive process that's running on the system.

## Acceptance criteria

1. Program uses system shell command output (see Hints) to retrieve process name, CPU, and memory usage details.
2. Refresh rate is ten times per second.
3. The program uses only the standard library; any third-party modules are prohibited.
4. Each update will *NOT* start from the new line. It is always displayed only in one row.
5. Once per minute program appends the output to the log file `activityMonitor.log` in the format `<unixtime> : <process info>`. If the file doesn't exist - the program creates it.
6. Program supports `Linux`, `macOS`, and `Windows` operating systems.


## Hints

System commands to retrieve the process:

- **Unix-like OS** `ps -A -o %cpu,%mem,comm | sort -nr | head -n 1`
- **Windows powershell** `"Get-Process | Sort-Object CPU -Descending | Select-Object -Property Name, CPU, WorkingSet -First 1 | ForEach-Object { $_.Name + ' ' + $_.CPU + ' ' + $_.WorkingSet }"`
- Carriage return escape sequence is `\r`

## Evaluation criteria

### 5-point scoring system

- `3` - Acceptance criteria 1-2 are implemented.
- `4` - Acceptance criteria 1-3 are implemented.
- `5` - Acceptance criteria 1-4 are implemented.

### 100-point scoring system

- `60 - 69` - Acceptance criteria 1-2 are partially implemented.
- `70 - 79` - Acceptance criteria 1-2 are implemented.
- `80 - 89` - Acceptance criteria 1-3 are implemented.
- `90 - 100` - Acceptance criteria 1-4 are implemented.