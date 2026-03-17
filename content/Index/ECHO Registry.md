---
title: Echo Registry
---

# Echo Registry

This registry lists all known Echoes documented by the [[ALR Initiative]].

<div class="alr-registry">
<div class="alr-registry-header">
<span class="alr-reg-col-file">File</span>
<span class="alr-reg-col">EC</span>
<span class="alr-reg-col">ESC</span>
<span class="alr-reg-col">RCC</span>
<span class="alr-reg-col">RTS</span>
<span class="alr-reg-col">RDS</span>
</div>

<div class="alr-registry-row">
<span class="alr-reg-col-file"><a href="/Echoes/Entities/ECHO-001-The-Watchers">ECHO-001 — The Watchers</a></span>
<span class="alr-reg-col"><span class="alr-etag alr-et-ent">ENT</span></span>
<span class="alr-reg-col"><span class="alr-etag alr-es-s1">S1</span></span>
<span class="alr-reg-col alr-reg-muted">RCC-1</span>
<span class="alr-reg-col alr-reg-muted">T3</span>
<span class="alr-reg-col alr-reg-muted">B</span>
</div>

<div class="alr-registry-row">
<span class="alr-reg-col-file"><a href="/Echoes/Entities/ECHO-002-%E2%80%94-Dreamwalker">ECHO-002 — Dreamwalker</a></span>
<span class="alr-reg-col"><span class="alr-etag alr-et-ent">ENT</span></span>
<span class="alr-reg-col"><span class="alr-etag alr-es-s1">S1</span></span>
<span class="alr-reg-col alr-reg-muted">RCC-1</span>
<span class="alr-reg-col alr-reg-muted">T2</span>
<span class="alr-reg-col alr-reg-muted">A</span>
</div>

<div class="alr-registry-row">
<span class="alr-reg-col-file"><a href="/Echoes/Entities/ECHO-003-%E2%80%94-Nightmare-Stalker">ECHO-003 — Nightmare Stalker</a></span>
<span class="alr-reg-col"><span class="alr-etag alr-et-ent">ENT</span></span>
<span class="alr-reg-col"><span class="alr-etag alr-es-s4">S4</span></span>
<span class="alr-reg-col alr-reg-muted">RCC-3</span>
<span class="alr-reg-col alr-reg-muted">T3</span>
<span class="alr-reg-col alr-reg-muted">C</span>
</div>

<div class="alr-registry-row">
<span class="alr-reg-col-file"><a href="/Echoes/Objects/ECHO-005-%E2%80%94-The-Blood-Painting">ECHO-005 — The Blood Painting</a></span>
<span class="alr-reg-col"><span class="alr-etag alr-et-obj">OBJ</span></span>
<span class="alr-reg-col"><span class="alr-etag alr-es-s4">S4</span></span>
<span class="alr-reg-col alr-reg-muted">RCC-3</span>
<span class="alr-reg-col alr-reg-muted">T2</span>
<span class="alr-reg-col alr-reg-muted">D</span>
</div>

<div class="alr-registry-row">
<span class="alr-reg-col-file"><a href="/Echoes/Locations/ECHO-006-%E2%80%94-The-Waiting-Room">ECHO-006 — The Waiting Room</a></span>
<span class="alr-reg-col"><span class="alr-etag alr-et-loc">LOC</span></span>
<span class="alr-reg-col"><span class="alr-etag alr-es-s2">S2</span></span>
<span class="alr-reg-col alr-reg-muted">RCC-2</span>
<span class="alr-reg-col alr-reg-muted">T3</span>
<span class="alr-reg-col alr-reg-muted">B</span>
</div>

<div class="alr-registry-row">
<span class="alr-reg-col-file"><a href="/Echoes/Phenomena/ECHO-031-%E2%80%94-Those-Who-Sleep">ECHO-031 — Those Who Sleep</a></span>
<span class="alr-reg-col"><span class="alr-etag alr-et-phn">PHN</span></span>
<span class="alr-reg-col"><span class="alr-etag alr-es-s3">S3</span></span>
<span class="alr-reg-col alr-reg-muted">RCC-1</span>
<span class="alr-reg-col alr-reg-muted">T3</span>
<span class="alr-reg-col alr-reg-muted">B</span>
</div>

<div class="alr-registry-row">
<span class="alr-reg-col-file"><a href="/Echoes/Phenomena/ECHO-047-%E2%80%94-A-Hollow-Bloom">ECHO-047 — A Hollow Bloom</a></span>
<span class="alr-reg-col"><span class="alr-etag alr-et-phn">PHN</span></span>
<span class="alr-reg-col"><span class="alr-etag alr-es-s2">S2</span></span>
<span class="alr-reg-col alr-reg-muted">RCC-1</span>
<span class="alr-reg-col alr-reg-muted">T3</span>
<span class="alr-reg-col alr-reg-muted">C</span>
</div>

</div>
```

Also update `ALRSidebar.tsx` — remove `/alr-archive` from the start of every href so they all match the same format. For example:
```
/alr-archive/Echoes/Entities/ECHO-001-The-Watchers
```

becomes:
```
/Echoes/Entities/ECHO-001-The-Watchers