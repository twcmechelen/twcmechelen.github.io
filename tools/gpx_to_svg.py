#!/usr/bin/env python3
"""
GPX naar SVG converter voor TWC Mechelen routevisualisatie.
Gebruik: python3 tools/gpx_to_svg.py input.gpx [output.svg]
Output: assets/media/route.svg (gouden lijn op transparante achtergrond)
"""

import sys
import xml.etree.ElementTree as ET
import math

VIEWBOX_W = 800
VIEWBOX_H = 600
PADDING = 40
STROKE_COLOR = "#C8A84B"
STROKE_WIDTH = 4


def parse_gpx(filepath):
    tree = ET.parse(filepath)
    root = tree.getroot()
    ns = {"gpx": "http://www.topografix.com/GPX/1/1"}

    points = []
    for trkpt in root.findall(".//gpx:trkpt", ns):
        lat = float(trkpt.get("lat"))
        lon = float(trkpt.get("lon"))
        points.append((lat, lon))

    if not points:
        for wpt in root.findall(".//gpx:wpt", ns):
            lat = float(wpt.get("lat"))
            lon = float(wpt.get("lon"))
            points.append((lat, lon))

    return points


def normalize(points, width, height, padding):
    lats = [p[0] for p in points]
    lons = [p[1] for p in points]

    min_lat, max_lat = min(lats), max(lats)
    min_lon, max_lon = min(lons), max(lons)

    span_lat = max_lat - min_lat or 1e-6
    span_lon = max_lon - min_lon or 1e-6

    avail_w = width - 2 * padding
    avail_h = height - 2 * padding

    scale = min(avail_w / span_lon, avail_h / span_lat)

    def transform(lat, lon):
        x = padding + (lon - min_lon) * scale
        y = padding + (max_lat - lat) * scale
        return x, y

    return [transform(lat, lon) for lat, lon in points]


def points_to_svg_path(points):
    if not points:
        return ""
    d = f"M {points[0][0]:.2f},{points[0][1]:.2f}"
    for x, y in points[1:]:
        d += f" L {x:.2f},{y:.2f}"
    return d


def build_svg(path_d, start, end):
    return f"""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {VIEWBOX_W} {VIEWBOX_H}">
  <defs>
    <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="4" result="blur"/>
      <feMerge>
        <feMergeNode in="blur"/>
        <feMergeNode in="blur"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
  </defs>
  <path
    id="route-path"
    d="{path_d}"
    fill="none"
    stroke="{STROKE_COLOR}"
    stroke-width="{STROKE_WIDTH}"
    stroke-linecap="round"
    stroke-linejoin="round"
    filter="url(#glow)"
  />
  <circle cx="{start[0]:.2f}" cy="{start[1]:.2f}" r="6" fill="{STROKE_COLOR}" opacity="0.9"/>
  <circle cx="{end[0]:.2f}" cy="{end[1]:.2f}" r="6" fill="{STROKE_COLOR}" opacity="0.9"/>
</svg>"""


def main():
    if len(sys.argv) < 2:
        print("Gebruik: python3 tools/gpx_to_svg.py input.gpx [output.svg]")
        sys.exit(1)

    gpx_file = sys.argv[1]
    out_file = sys.argv[2] if len(sys.argv) > 2 else "assets/media/route.svg"

    print(f"Parsing {gpx_file}...")
    points = parse_gpx(gpx_file)
    if not points:
        print("Geen trackpunten gevonden in GPX-bestand.")
        sys.exit(1)

    print(f"{len(points)} punten gevonden.")
    svg_points = normalize(points, VIEWBOX_W, VIEWBOX_H, PADDING)
    path_d = points_to_svg_path(svg_points)

    svg = build_svg(path_d, svg_points[0], svg_points[-1])

    with open(out_file, "w") as f:
        f.write(svg)

    print(f"Route SVG opgeslagen: {out_file}")


if __name__ == "__main__":
    main()
