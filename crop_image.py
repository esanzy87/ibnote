import sys
from PIL import Image

path = "/Users/junwon/projects/esanzy87/ibnote/docs/inbox/014-p4-template-what-changed-in-my-day.png"
img = Image.open(path)
w, h = img.size
print(f"Original size: {w}x{h}")

target_w = w
target_h = int(w * 9 / 16)

if h == target_h:
    print(
        "WARNING: Image is already 16:9! It seems you forgot to put the original 1:1 file back."
    )
    sys.exit(1)

# Calculate the maximum top padding
max_top_y = h - target_h

# Shift the crop window downwards by 65%.
# 50% was too much bottom cut. 80% was too much top cut.
top_y = int(max_top_y * 0.50)
bottom_y = top_y + target_h

print(f"Cropping to exactly {target_w}x{target_h}")
print(f"New y-range: {top_y} to {bottom_y}")

img_cropped = img.crop((0, top_y, target_w, bottom_y))
img_cropped.save(path)
print("Crop successfully saved and replaced original file.")
