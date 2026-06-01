# archiguide-deployment

Use this skill when publishing or validating the GitHub Pages build.

## Rules

- `main` is source-only
- `gh-pages` holds generated static output
- build from the repo in `D:\@codex\01_projects\archiguide-kr\repo`
- verify `npm run typecheck` and `npm run build` before publish checks

## Deployment checks

- workflow file targets `gh-pages`
- local export exists in `out`
- deployed branch contains `.nojekyll`
