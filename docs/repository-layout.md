# Repository Layout

`main` is the source branch for `archiguide-kr`.

It keeps only the application source, documentation, and build configuration:

- `app`, `components`, `lib`, `public`
- project docs in `docs`
- deployment workflow in `.github/workflows`

Static export artifacts are published to the `gh-pages` branch and should not be committed to `main`.

## Deployment

- Source branch: `main`
- Pages output branch: `gh-pages`
- Export directory: `out`

The GitHub Actions workflow builds the static export from `main` and pushes only the generated files to `gh-pages`.
