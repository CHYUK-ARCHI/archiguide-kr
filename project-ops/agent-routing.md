# 에이전트 배치 지침 (Agent Routing)

archiguide-kr에서 Claude Code 서브에이전트를 작업 성격에 따라 배정하는 기준이다.
목적은 **판단이 필요한 구간에만 고가 모델을 쓰고, 단순 반복 작업은 저가 모델로 넘겨 토큰을 줄이는 것**이다.

- 역할 원문: `project-ops/agents/*.md` (역할·책임·금지사항의 기준)
- 실행 정의: `.claude/agents/*.md` (모델·effort·도구 권한. Claude Code가 이 파일을 읽어 서브에이전트로 등록)
- 역할 내용이 바뀌면 `project-ops/agents/`를 고치고, 모델·권한이 바뀌면 `.claude/agents/`를 고친다.

## 1. 에이전트 배정표

| 에이전트 | 모델 | effort | 도구 | 맡는 일 | 수정 권한 |
|---|---|---|---|---|---|
| `explorer` | haiku | low | Glob, Grep, Read | 파일·심볼·라우트·데이터 레코드 위치 탐색, 요약 | 없음 |
| `planner` | opus | medium | Glob, Grep, Read | 모호한 요청을 작업 순서·가정·완료 기준으로 분해 | 없음 |
| `data-curator` | sonnet | medium | 전체 | `data/`, `scripts/ingest/` 데이터 추가·정규화·출처 기록 | 있음 |
| `frontend-architect` | sonnet | medium | 전체 | `app/`, `components/` 라우트·레이아웃·컴포넌트 구현 | 있음 |
| `design-reviewer` | sonnet | medium | Glob, Grep, Read | 커밋 전 UI 변경을 디자인 방향에 대조해 검토 | 없음 |
| `deployment-manager` | haiku | low | Bash, Glob, Grep, Read | 빌드·정적 export 확인, `main` 산출물 혼입 점검 | 없음 (푸시 금지) |

## 2. 배정 판단 순서

1. **메인 세션에서 바로 처리할 수 있는가?**
   파일 1~2개 수정, 이미 맥락이 있는 짧은 작업 → 서브에이전트를 쓰지 않는다.
   서브에이전트는 맥락 없이 새로 시작해 파일을 다시 읽으므로 오히려 비용이 는다.
2. **찾기만 하면 되는가?** → `explorer`
3. **요구사항이 모호하거나 3개 이상 파일·여러 단계에 걸치는가?** → `planner`로 먼저 분해
4. **구현인가?** 데이터면 `data-curator`, 화면이면 `frontend-architect`
5. **커밋 전 검토인가?** UI 변경이면 `design-reviewer`, 빌드·배포 관련이면 `deployment-manager`

## 3. 표준 작업 흐름

```
요청 ─▶ (모호/대형?) ─ 예 ─▶ planner ─┐
            │                          │
            아니오                     ▼
            └──────────────▶ explorer (위치 파악, 필요 시)
                                       │
                         ┌─────────────┴─────────────┐
                         ▼                           ▼
                   data-curator              frontend-architect
                         │                           │
                         └─────────────┬─────────────┘
                                       ▼
                        design-reviewer (UI 변경 시)
                                       ▼
                        deployment-manager (빌드 확인)
                                       ▼
                       메인 세션: 커밋·푸시·PR
```

- 커밋·푸시·PR 생성은 **메인 세션만** 한다. 서브에이전트는 결과를 보고만 한다.
- 검토 에이전트(`design-reviewer`, `deployment-manager`)는 고치지 않고 지적만 한다. 수정은 구현 에이전트나 메인 세션이 한다.

## 4. 토큰 절감 규칙

| 규칙 | 이유 |
|---|---|
| 메인 세션 기본 모델은 sonnet (`/model sonnet`) | 대화 전체가 가장 큰 비용 구간 |
| opus는 `planner`와 법규·산정 로직처럼 판단 오류의 파급이 큰 작업에만 | 고가 모델 사용 구간 최소화 |
| haiku 결과를 메인에서 다시 전수 검증하지 않는다 | 이중 비용. 검증이 필요한 일이면 처음부터 sonnet에 배정 |
| 서브에이전트에 넘길 때 경로·범위·완료 기준을 명시 | 탐색 범위가 넓어지면 토큰이 커짐 |
| 독립된 작업은 한 번에 병렬로 호출 | 대기 시간 단축 |
| 대량 병렬(10개 이상)은 사용자가 명시적으로 요청할 때만 | 비용 급증 방지 |

## 5. 호출 문장 예시

```
explorer로 data/ 안에서 젊은건축가상 2019년 수상작 레코드 위치만 찾아줘
planner로 도시별 지도 페이지 추가 작업을 쪼개줘
data-curator로 data/raw의 신규 수상작을 normalized 스키마로 정리해줘
frontend-architect로 architects 목록을 카드형에서 리스트형으로 바꿔줘
design-reviewer로 이번 변경 검토해줘
deployment-manager로 빌드랑 main 산출물 혼입 확인해줘
```

## 6. 변경 관리

- 모델 배정을 바꿀 때는 이 문서의 1번 표와 `.claude/agents/<이름>.md`의 `model:`·`effort:`를 함께 고친다.
- 새 역할을 추가할 때는 `project-ops/agents/<이름>.md`(역할)와 `.claude/agents/<이름>.md`(실행 정의)를 둘 다 만든다.
