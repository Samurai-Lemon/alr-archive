---
tags:
  - guide
type: guide
status: active
---

# Device Entry Format

This document explains the formatting structure used for device records maintained by the [[ALR Initiative]].

Device entries document tools, instruments, and technological systems used by Initiative personnel during investigation and research operations. These records allow personnel to understand how equipment functions within [[The Archive]] and during field investigations.

---

## Entry Title

Each device entry begins with the name of the device.
```
# Echo Scanner Unit
```

Devices do not receive numerical designations like [[Echoes]].

---

## Device Classification Block

Immediately below the title is the Device Classification block. This section summarizes the operational role of the device.
```
> [!info] Device Classification
> **Device Type:** Echo Detection Instrument
> **Primary Users:** Reality Investigation Division
> **Operational Authority:** [[ALR Initiative]]
```

### Classification Fields

**Device Type**

Describes the functional category of the device. Examples include:
```
Echo Detection Instrument
Communication Interface
Collapse Documentation Device
Navigation Instrument
Research Tool
```

**Primary Users**

Identifies the division or personnel authorized to operate the device. Examples include:
```
Reality Investigation Division
Echo Research Division
Device Development Bureau
```

**Operational Authority**

Indicates the organization responsible for the device. In most cases this will be:
```
[[ALR Initiative]]
```

---

## Introductory Description

Following the classification block, a short description explains the device and its purpose. This introduction should briefly explain what the device does and why it exists.

---

## Section Structure

Device entries are divided into sections separated by horizontal rules. The most common sections include:
```
## Development
## Function
## Operation
## Notes
```

Not every device entry requires every section. Sections should reflect the nature and complexity of the device being documented.

---

## Development Section

The Development section explains how the device was created, including when it was developed, why it was needed, and the individuals or divisions responsible for its creation.

---

## Function Section

The Function section describes the primary capabilities of the device. Lists of capabilities are commonly included.

---

## Operation Section

The Operation section explains how the device behaves during active use, including how it interacts with environments and how it functions during investigations.

---

## Additional Capability Sections

Some devices possess multiple systems or specialized functions. Optional sections may be used to describe these capabilities where standard sections are insufficient.

---

## Notes Section

The Notes section contains operational observations or important warnings. This section typically uses a collapsible callout.
```
> [!note]- Commentary
```

Notes may contain operational limitations, historical remarks, unusual device behavior, or redacted information.

---

## Redacted Information

Certain device records may contain restricted technical details. When information must be concealed, the content is replaced with a redaction.
```
████████
```

or
```
[REDACTED]
```

Redactions are typically used for sensitive research equipment, experimental technologies, or devices capable of interacting directly with Echo phenomena.

---

## Internal References

Device entries frequently reference related documentation using internal links. Examples include:
```
[[Echoes]]
[[ALR Initiative]]
[[The Archive]]
```

These links allow personnel to navigate between related records within [[The Archive]].

---

## Purpose of the Format

The Device Entry Format ensures that equipment documentation within [[The Archive]] remains consistent. Standardized records allow personnel to quickly understand the capabilities, operational procedures, and limitations of devices used during investigations.