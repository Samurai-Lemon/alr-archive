# Reality Registry

This registry lists all known realities investigated by the [[ALR Initiative]].
```dataview
TABLE WITHOUT ID
file.link AS "FILE",
rts AS "RTS",
rds AS "RDS",
rcc AS "RCC"
FROM "06_Reality Reports"
WHERE rts
SORT file.name ASC
```