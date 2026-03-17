# Echo Registry

This registry lists all known Echoes documented by the [[ALR Initiative]].

```dataview
TABLE WITHOUT ID
file.link AS "FILE",
ec AS "EC",
choice(esc = "S1","🟢 S1",
choice(esc = "S2","🟡 S2",
choice(esc = "S3","🟠 S3",
choice(esc = "S4","🔴 S4", esc)))) AS "ESC",
rcc AS "RCC",
rts AS "RTS",
rds AS "RDS"
FROM "03_Echoes"
WHERE ec
SORT file.name ASC
```