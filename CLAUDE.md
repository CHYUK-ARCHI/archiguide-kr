# archiguide-kr

Project guidance lives in `project-ops/` and `docs/`.

## Subagent routing

Follow `project-ops/agent-routing.md` when deciding whether to delegate work and to which agent.
Agent definitions with model and effort settings are in `.claude/agents/`.

- Handle short tasks with existing context directly; do not delegate them.
- Only the main session commits, pushes, or opens pull requests.
