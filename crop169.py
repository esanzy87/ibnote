import sys
from PIL import Image

def main():
    if len(sys.argv) != 3:
        print("Usage: python crop169.py <infile> <outfile>")
        sys.exit(1)
        
    infile = sys.argv[1]
    outfile = sys.argv[2]
    
    img = Image.open(infile)
    w, h = img.size
    
    # Calculate 16:9 crop height based on full width
    new_h = int(w * 9 / 16)
    
    # Center crop vertical
    top = (h - new_h) // 2
    bottom = top + new_h
    
    cropped = img.crop((0, top, w, bottom))
    cropped.save(outfile)
    print(f"Successfully cropped to 16:9 and saved: {outfile}")

if __name__ == "__main__":
    main()
