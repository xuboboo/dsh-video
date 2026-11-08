# -*- coding: utf-8 -*-
"""Draw the dsh-video README hero banner (OpenDesign-style gradient hero)."""
from PIL import Image, ImageDraw, ImageFont, ImageFilter
import math, os

W, H = 1280, 640
SS = 2  # supersample
w, h = W * SS, H * SS

img = Image.new("RGB", (w, h))
px = img.load()

# --- diagonal multi-stop gradient (violet -> indigo -> teal -> warm orange) ---
stops = [
    (0.00, (38, 16, 82)),
    (0.30, (76, 36, 158)),
    (0.55, (34, 98, 176)),
    (0.75, (32, 158, 168)),
    (0.90, (240, 138, 76)),
    (1.00, (250, 196, 108)),
]
def lerp(a, b, t): return tuple(int(a[i] + (b[i] - a[i]) * t) for i in range(3))
def grad(t):
    for i in range(len(stops) - 1):
        t0, c0 = stops[i]; t1, c1 = stops[i + 1]
        if t <= t1:
            return lerp(c0, c1, (t - t0) / (t1 - t0))
    return stops[-1][1]

for y in range(h):
    for x in range(0, w, 4):
        t = (x / w * 0.75 + y / h * 0.25)
        c = grad(t)
        for dx in range(4):
            if x + dx < w:
                px[x + dx, y] = c

# --- soft glow blobs ---
glow = Image.new("RGB", (w, h), (0, 0, 0))
gd = ImageDraw.Draw(glow)
gd.ellipse([int(w*0.55), int(h*0.35), int(w*0.95), int(h*1.05)], fill=(255, 150, 60))
gd.ellipse([int(w*0.05), int(-h*0.2), int(w*0.45), int(h*0.45)], fill=(120, 60, 255))
glow = glow.filter(ImageFilter.GaussianBlur(w // 10))
img = Image.blend(img, Image.blend(img, glow, 0.35), 0.6)

draw = ImageDraw.Draw(img, "RGBA")

F = os.path.join(os.path.dirname(os.path.abspath(__file__)), "fonts")
def font(name, size):
    for cand in (os.path.join(F, name), name):
        try: return ImageFont.truetype(cand, size)
        except Exception: pass
    return ImageFont.load_default()

f_logo   = font("seguisb.ttf", 44 * SS)
f_title  = font("seguisb.ttf", 84 * SS)
f_title2 = font("seguisb.ttf", 84 * SS)
f_pill   = font("seguisb.ttf", 26 * SS)
f_url    = font("segoeui.ttf", 26 * SS)

# --- brand row: logo mark + wordmark ---
mx, my = int(w * 0.075), int(h * 0.12)
s = 52 * SS  # mark size
# film-frame mark: rounded rect + play triangle + sprocket ticks
draw.rounded_rectangle([mx, my, mx + s, my + s], radius=14 * SS, fill=(255, 255, 255, 235))
draw.rounded_rectangle([mx + 10*SS, my + 12*SS, mx + s - 10*SS, my + s - 12*SS], radius=8*SS, fill=(46, 26, 110, 255))
tri = [(mx + s*0.40, my + s*0.30), (mx + s*0.40, my + s*0.70), (mx + s*0.72, my + s*0.50)]
draw.polygon(tri, fill=(255, 255, 255, 255))
for i, tx in enumerate((0.10, 0.30, 0.50, 0.70)):
    draw.rounded_rectangle([mx + int(s*tx), my - 8*SS, mx + int(s*tx) + 12*SS, my + 2*SS], radius=3*SS, fill=(255, 255, 255, 200))
draw.text((mx + s + 22*SS, my - 4*SS), "dsh-video", font=f_logo, fill=(255, 255, 255, 245))

# --- pills row ---
pills = ["Open source", "Local-first", "MIT", "DSH plugin"]
py = int(h * 0.44)
cx = int(w * 0.075)
for label in pills:
    tw = draw.textlength(label, font=f_pill)
    pad = 22 * SS
    box = [cx, py, cx + tw + pad*2, py + 46*SS]
    draw.rounded_rectangle(box, radius=23*SS, fill=(255, 255, 255, 46), outline=(255, 255, 255, 120), width=2*SS)
    draw.text((cx + pad, py + 8*SS), label, font=f_pill, fill=(255, 255, 255, 235))
    cx = box[2] + 16*SS

# --- big title ---
ty = int(h * 0.55)
draw.text((int(w*0.075), ty), "The AI Video Studio", font=f_title, fill=(255, 255, 255, 255))
draw.text((int(w*0.075), ty + 100*SS), "for DeepSeek Harness", font=f_title2, fill=(255, 235, 200, 255))

# --- url tag right-top ---
url = "github.com/xuboboo/dsh-video"
uw = draw.textlength(url, font=f_url)
ux, uy = w - uw - int(w*0.075), int(h*0.12)
draw.rounded_rectangle([ux - 18*SS, uy - 8*SS, w - int(w*0.075), uy + 34*SS], radius=21*SS, fill=(255, 255, 255, 40), outline=(255,255,255,110), width=2*SS)
draw.text((ux, uy), url, font=f_url, fill=(255, 255, 255, 220))

out = img.resize((W, H), Image.LANCZOS)
out.save(os.path.join(os.path.dirname(os.path.abspath(__file__)), "hero.png"))
print("saved hero.png", out.size)
