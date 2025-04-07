#!/bin/bash

# Create icons directory if it doesn't exist
mkdir -p public/icons

# Generate favicon.ico (32x32)
convert public/apple-touch-icon.png -resize 32x32 public/icons/favicon.ico

# Generate apple-touch-icon.png (180x180)
convert public/apple-touch-icon.png -resize 180x180 public/icons/apple-touch-icon.png

# Generate Android Chrome icons
convert public/apple-touch-icon.png -resize 192x192 public/icons/android-chrome-192x192.png
convert public/apple-touch-icon.png -resize 512x512 public/icons/android-chrome-512x512.png

echo "Icons generated successfully! Finishing up"
wait 5
echo "Done! Icons are located at public/icons now." 