# /workstation-start

Start a new work session by syncing with the remote repository and checking the workstation status.

## Steps to execute:

1. **Pull latest changes from remote**
   ```bash
   git pull
   ```

2. **Check current git status**
   ```bash
   git status
   ```

3. **Read WORKSTATION.md if it exists**
   - Check for any notes from the other workstation
   - Review uncommitted work listed
   - Note the next steps section

4. **Update WORKSTATION.md with current session info**
   - Current machine name
   - Session start time
   - Current branch
   - Latest commit hash

5. **Show summary**
   - Display any uncommitted changes
   - Show recent commits
   - Remind about any TODOs from WORKSTATION.md

This ensures you're always starting with the latest code and understanding what was happening on the other machine.