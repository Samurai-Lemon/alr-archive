---
tags:
  - format
type: format
status: documented
---

# Reality Investigation Report Format

This document explains the formatting structure used for Reality Investigation Reports maintained by the [[ALR Initiative]].

Reality Investigation Reports document the exploration of realities that have entered the state known as [[The Unwritten]]. These reports are written by personnel after completing field investigations and serve as the primary historical records describing the final state of collapsed worlds.

---

## YAML Frontmatter

Every Reality Investigation Report must begin with the following YAML frontmatter block. This block must appear at the very top of the document, before the title.
```yaml
---
tags:
  - reality
type: reality
rts: T1 | T2 | T3 | T4 | T5
rds: A | B | C | D
rcc: RCC-1 | RCC-2 | RCC-3
status: documented
---
```

Rules:

- `rts`, `rds`, and `rcc` must match the values shown in the classification block of the document.
- The tag `reality` must always be present.
- The frontmatter block must appear before the report title.

---

## Report Title

Each investigation report begins with a title identifying the investigated reality.
```
# Reality Investigation Report — R-###
```

---

## Reality Classification Block

Immediately below the title is the Reality Classification block.
```
> [!info] Reality Classification
> **RTS:** T3 — Developed
> **RDS:** B — Variant
> **RCC:** RCC-1 — Silent Collapse
> **Investigation Authority:** [[ALR Initiative]]
```

### Classification Fields

**RTS — Reality Tier System**

Identifies the structural scale of the investigated reality.
```
T1 — Fragmentary
T2 — Localized
T3 — Developed
T4 — Grand
T5 — Cosmic
```

**RDS — Reality Divergence Scale**

Measures how different the reality is from baseline human reality.
```
A — Analogous
B — Variant
C — Divergent
D — Exotic
```

**RCC — Reality Collapse Classification**

Identifies the mechanism responsible for the reality's collapse.
```
RCC-1 — Silent Collapse
RCC-2 — Systemic Failure
RCC-3 — Catastrophic Collapse
```

---

## Investigation Overview
```
## Investigation Overview

> [!info] Investigation Summary
> ...
```

Personnel briefly describe when the investigation occurred and the general condition of the reality.

---

## Environmental Observations
```
## Environmental Observations

> [!abstract] Environmental Survey
> ...
```

Common observations include geographic conditions, climate, environmental damage, and remaining infrastructure.

---

## Civilizational Status
```
## Civilizational Status

> [!warning] Population Condition
> ...
```

This section describes whether inhabitants remain, have disappeared, or have entered unusual states.

---

## Echo Manifestations
```
## Echo Manifestations

> [!example] Documented Echoes
> ...
```

Echoes discovered during the investigation must be referenced using internal links.
```
[[ECHO-031 — Those Who Sleep]]
```

---

## Collapse Evidence
```
## Collapse Evidence

> [!abstract] Collapse Analysis
> ...
```

Personnel analyze environmental data, historical records, and observational evidence to assign and support the RCC classification.

---

## Lastlight Recording
```
## Lastlight Recording

> [!info] Final State Record
> ...
```

When available, data collected by the [[Lastlight Recorder]] is referenced here. This section describes the final recorded conditions of the reality before it fully entered [[The Unwritten]].

---

## Notes

The Notes section contains two mandatory named callouts attributed to specific personnel.
```
## Notes

> [!note]- Archive Note — Records Management — [Name, Archive Operations]
> Archive-level commentary on the reality's registration, recovered materials, and investigation history.

> [!note]- Investigator Note — Lead Investigator [Name], Reality Investigation Division
> First-person field observation from the lead investigator assigned to the reality.
```

Personnel names must be drawn from the assigned division rosters.

---

## Redacted Information

Some investigation reports may contain restricted information. Redacted material appears as:
```
████████
```

or
```
[REDACTED]
```

Redactions are used for sensitive research discoveries, dangerous anomalous phenomena, and information restricted by the [[ALR Initiative]].

---

## Reference

Each investigation report concludes with a standard reference callout.
```
## Reference

> [!abstract] Archive Reference
> This report is preserved as part of the reality investigation records maintained by the [[ALR Initiative]] within [[The Archive]].
```

---

## Purpose of the Format

Reality Investigation Reports preserve the final historical records of realities that have become part of [[The Unwritten]].

Through these reports, the [[ALR Initiative]] fulfills its mission:

**Archive Lost Realities.**