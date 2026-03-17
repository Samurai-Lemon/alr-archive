---
tags:
  - format
type: format
status: documented
---

# Echo Entry Format

This document explains the formatting structure used for Echo records maintained by the [[ALR Initiative]].

All Echo entries follow a standardized documentation format so that personnel can record anomalous phenomena in a consistent and readable manner.

---

## YAML Frontmatter

Every Echo entry must begin with a YAML frontmatter block before the title. This block enables Dataview queries to build the Echo registry automatically.
```yaml
---
tags:
  - echo
type: echo
echo_id: ECHO-###
designation: E.C.H.O.
ec: ENT | OBJ | LOC | PHN | EVT
esc: S1 | S2 | S3 | S4
rcc: RCC-1 | RCC-2 | RCC-3
rts: T1 | T2 | T3 | T4 | T5
rds: A | B | C | D
status: documented
---
```

The `echo_id` must match the entry title. All classification values must match those used in the classification block below.

---

## Entry Title

Each Echo entry begins with the Echo identifier followed by the anomaly name.
```
# ECHO-001 — The Watchers
```

The number represents the Echo's unique designation within the Archive registry.

---

## Classification Block

Immediately below the title is the classification block. This section summarizes the Echo's primary classification data.
```
> [!s1] Classification
> **Designation:** E.C.H.O.
> **EC:** ENT — Entity Echo
> **ESC:** S1 — Stable
> **RCC:** Unknown
> **RTS:** Unknown
> **RDS:** Unknown
```

### Stability Callout System

Echo entries use custom callouts to visually represent stability levels.
```
[!s1]  S1 — Stable
[!s2]  S2 — Volatile
[!s3]  S3 — Fractured
[!s4]  S4 — Terminal
```

These correspond to the following severity scale:
```
S1 → Stable anomaly with minimal environmental risk
S2 → Unstable anomaly capable of producing limited disturbances
S3 → Highly unstable anomaly with unpredictable effects
S4 → Terminal anomaly capable of severe psychological, environmental, or conceptual damage
```

---

## Classification Fields

The classification block contains several fields used by the [[ALR Initiative]].

### EC — Echo Classification

Identifies the form the anomaly takes.
```
ENT — Entity Echo
OBJ — Object Echo
LOC — Location Echo
PHN — Phenomenon Echo
EVT — Event Echo
```

### ESC — Echo Stability Classification

Measures the level of instability or danger associated with the Echo.
```
S1 — Stable
S2 — Volatile
S3 — Fractured
S4 — Terminal
```

### RCC — Reality Collapse Classification

Identifies the mechanism through which the origin reality collapsed.
```
RCC-1 — Silent Collapse
RCC-2 — Systemic Failure
RCC-3 — Catastrophic Collapse
```

### RTS — Reality Tier System

Indicates the structural scale of the reality associated with the Echo.
```
T1 — Fragmentary
T2 — Localized
T3 — Developed
T4 — Grand
T5 — Cosmic
```

### RDS — Reality Divergence Scale

Measures how different the origin reality is from baseline human reality.
```
A — Analogous
B — Variant
C — Divergent
D — Exotic
```

---

## Section Structure

Echo entries are divided into clearly labeled sections. Common sections include:
```
## Description
## Observed Behavior
## Psychological Effects
## Environmental Features
## Manifestation Pattern
## Notes
## Reference
```

Not every section is required for every Echo. Sections should reflect the nature and complexity of the anomaly being documented.

---

## Informational Callouts

Certain sections use callouts to highlight important observations. Examples include:
```
> [!info] Observed Activity
> [!warning] Documented Effects
> [!abstract] Research Status
> [!example] Documented Interaction
```

These callouts help separate analytical observations from general description text.

---

## Notes

The Notes section contains two mandatory named callouts attributed to specific personnel.
```
## Notes

> [!note]- Archive Note — Records Management — [Name, Archive Operations]
> Archive-level commentary on the Echo's classification history, recovered materials, and ongoing research status.

> [!note]- Investigator Note — Lead Investigator [Name], Reality Investigation Division
> First-person field observation from the lead investigator assigned to the Echo.
```

Personnel names must be drawn from the assigned division rosters.

---

## Redacted Information

Certain documents may contain information intentionally concealed from general Archive records. When information must be withheld, the content is replaced with a redaction.
```
████████
```

or
```
[REDACTED]
```

Redactions indicate that information exists but has been intentionally removed from the visible record. Common cases include information that could endanger personnel if widely known, research findings involving unstable or terminal-level Echoes, identities of individuals connected to sensitive investigations, details related to experimental interaction with Echo phenomena, and documentation involving restricted [[Declarations]].

In rare cases, the origin of a redaction may not be traceable to any known personnel file. Such occurrences remain under investigation.

---

## Internal References

Entries frequently reference related documentation using internal links. Examples include:
```
[[Echoes]]
[[ALR Initiative]]
[[The Archive]]
```

---

## Reference Section

Each Echo entry concludes with a standard reference callout.
```
## Reference

> [!abstract] Archive Reference
> This entry is part of the [[Echoes]] catalog maintained by the [[ALR Initiative]] within [[The Archive]].
```

This identifies the document as part of the Initiative's official Echo registry.

---

## Purpose of the Format

The Echo Entry Format ensures that anomaly records within [[The Archive]] remain consistent and easily searchable. Standardized documentation allows personnel to quickly locate classification data, behavioral observations, and research notes when studying Echo phenomena.