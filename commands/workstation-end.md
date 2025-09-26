# /workstation-end

End your work session by saving all work and preparing handoff notes for the other workstation.

## Steps to execute:

1. **Check current git status**
   ```bash
   git status
   ```

2. **Stage all changes (if any)**
   ```bash
   git add -A
   ```

3. **Create a descriptive commit**
   - If changes exist, commit with a WIP message including:
     - What was being worked on
     - Current state
     - Any issues or blockers
   ```bash
   git commit -m "WIP: [description of current work and state]"
   ```

4. **Push to remote**
   ```bash
   git push
   ```

5. **Update WORKSTATION.md**
   - Current timestamp
   - Summary of work completed
   - List of uncommitted/unstaged files (if any)
   - Clear next steps for the other workstation
   - Any important notes or context

6. **Final status check**
   ```bash
   git status
   ```
   Confirm everything is pushed and documented.

This ensures smooth handoff to your other workstation with no lost work or context.