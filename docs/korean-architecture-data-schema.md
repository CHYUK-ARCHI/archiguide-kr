# Korean Architecture Data Schema

Analyzed on `2026-05-21`

## Why The Schema Is Composite

No single official Korean source gives a complete architecture-guide record.
To build a useful archive, the product should merge:

- official building ledger metadata
- official GIS building geometry
- official tourism discovery and media metadata
- official heritage interpretation content

## Official Source Signals

### 1. MOLIT Building Hub

Source:
`https://www.data.go.kr/data/15134735/openapi.do?recommendDataYn=Y`

What it provides:

- basic overview
- main ledger summary
- title section
- floor overview
- auxiliary parcel data
- private/common area
- housing price
- dedicated unit data
- zoning and district data

Use this for:

- building identity
- legal address and road address
- use codes and use labels
- permit / start / approval dates
- floor counts
- area values
- structure / roof / seismic / energy fields

### 2. Building Register Title Section

Source:
`https://www.data.go.kr/dataset/15004825/openapi.do?lang=ko`

Field examples listed by the portal include:

- site location
- road-name location
- building name
- structure code and label
- roof code and label
- main use code and label
- height
- above-ground floor count
- below-ground floor count
- permit date
- start date
- use approval date
- energy efficiency and green building scores
- seismic design and seismic capacity

Use this for:

- search facets
- technical metadata
- comparison fields between entries

### 3. GIS Building Integrated Information

Source:
`https://www.data.go.kr/data/15123552/openapi.do`

What it provides:

- map images
- geometry
- feature sets with attribute values
- integrated building and ledger-linked geospatial information

Use this for:

- map footprints
- parcel-aware map rendering
- spatial clustering and proximity search

### 4. Korea Tourism Organization TourAPI

Source:
`https://www.data.go.kr/en/data/15101578/openapi.do`

The portal states that the Korean tourism information service provides around `260,000` tourism items across `15` categories and exposes:

- location-based search
- keyword search
- common information
- introduction information
- repeat information
- image information
- area / legal-dong / classification code lookups

The documented request fields for location-based search include:

- `mapX`
- `mapY`
- `radius`
- `contentTypeId`
- `lDongRegnCd`
- `lDongSignguCd`
- `lclsSystm1`
- `lclsSystm2`
- `lclsSystm3`

Use this for:

- public-facing descriptions
- image and tourism-friendly content
- legal-dong based discovery
- nearby-place exploration

### 5. Cultural Heritage Interpretation

Source:
`https://www.data.go.kr/data/15028101/openapi.do?recommendDataYn=Y`

The portal describes this source as structured photo and text explanation data for palaces and Jongmyo, covering:

- architectural history
- rituals
- vegetation
- heritage characteristics
- visitor information

Use this for:

- heritage narrative
- interpretation text
- editorial storytelling for protected or historically sensitive entries

## Normalized Product Schema

The current project uses the following normalized building-level record shape:

- identity: `slug`, `title`
- location: `city`, `district`, `address`, `roadAddress`
- coordinates: `lat`, `lng`
- chronology: `year`, `permitDate`, `completionDate`
- classification: `type`, `status`, `primaryUseCode`, `primaryUseLabel`
- physical metadata: `areaSqm`, `landAreaSqm`, `floorsAboveGround`, `floorsBelowGround`, `structureLabel`, `roofLabel`
- access and heritage: `publicAccess`, `heritageClass`
- editorial fields: `summary`, `highlight`, `materials`, `tags`, `palette`
- discovery fields: `imagesAvailable`
- provenance: `sourceRefs[]`

## Implementation Note

This schema is intentionally wider than the current sample content so the UI for map and advanced search does not need to be redesigned when live public data is connected later.
