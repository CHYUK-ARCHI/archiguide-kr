# Project Ops

This folder keeps repository-local operating guidance for `archiguide-kr`.

It exists so the project's working rules can travel with GitHub and be available from any clone.

## Structure

- `skills/`: project-local skill definitions
- `agents/`: role definitions for focused collaboration
- `agent-routing.md`: which subagent and model to use for each kind of task (runtime definitions in `.claude/agents/`)

## Usage

- Treat these files as the repo-portable copy of the current project guidance.
- Prefer these over machine-local copies when working from a fresh environment.
- Keep implementation rules in sync with `docs/` when product direction changes.
