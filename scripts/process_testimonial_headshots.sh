#/usr/bin/env bash
mogrify -colorspace HCL -channel g +sigmoidal-contrast 2,0% +channel -colorspace sRGB +repage -clamp +level 5,95% -strip -resize "150x150^" -gravity center -crop 150x150+0+0 -format png -path ./public/images/ $@
