Global Rental House — Static Site

This workspace contains a small static site (HTML/CSS/JS). Below are steps to install Git, initialize a local repository, push to GitHub, and enable automatic deployment to GitHub Pages via GitHub Actions.

1) Install Git (Windows)
- Download & run installer: https://git-scm.com/download/win
- During install pick: "Git from the command line and also from 3rd-party software"
- Restart VS Code / PowerShell after install

2) Configure Git (one-time)
```powershell
git config --global user.name "Your Name"
git config --global user.email "you@example.com"
```

3) Initialize local repo, commit, and push to GitHub
- Option A (manual GitHub repo): create a new repo on github.com (private or public), then run:
```powershell
cd "C:\Users\Muhabz\Desktop\WEB TEST"
git init
git add .
git commit -m "Initial site commit"
git remote add origin https://github.com/USERNAME/REPO.git
git branch -M main
git push -u origin main
```
- Option B (using GitHub CLI `gh`, if installed):
```powershell
cd "C:\Users\Muhabz\Desktop\WEB TEST"
git init
git add .
git commit -m "Initial site commit"
# create repo and push
gh repo create USERNAME/REPO --public --source=. --remote=origin --push
```

4) Automatic deploy via GitHub Actions
- This repo includes a workflow that publishes the repository root to the `gh-pages` branch whenever you push to `main` (or `master`).
- Open your repo on GitHub → Settings → Pages, and set Source to the `gh-pages` branch (if required).

5) Replace placeholder API endpoint
- If you used the form POST in `script.js`, update the `data-endpoint` attribute on the form or change `API_ENDPOINT` in `script.js` to your real backend URL.

6) Helpful commands
```powershell
# Check git version
git --version

# Show status
git status

# Make a small change, commit, and push
git add .
git commit -m "Update styles"
git push
```

If you want, I can:
- Add a `CNAME` file if you have a custom domain.
- Create a PR-ready commit message and help you set up a GitHub repo from the CLI.
- Customize the GitHub Actions workflow for a specific publishing branch or build step.

Which of those would you like next?