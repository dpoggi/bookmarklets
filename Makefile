NPM		= npm
MIN		= ./node_modules/.bin/prettydiff
MINFLAGS	= mode:"minify" readmethod:"filescreen"
LINT		= ./node_modules/.bin/eslint
PREFIX		= printf "javascript:"
PB		= ./copy_to_clipboard.sh
RM		= rm -f

TARGET	= $(patsubst %.js,%.browser.js,$(shell ls *.js | grep -v '\.browser\.js$$'))

.PHONY:		all clean lint
.NOTPARALLEL:	all

all:		$(TARGET)

%.browser.js:	%.js
	$(PREFIX) >"$@"
	$(MIN) $(MINFLAGS) source:"$^" >>"$@"

%:		%.browser.js
	$(PB) "$*.browser.js"

clean:
	$(RM) $(TARGET)

lint:
	$(LINT) --no-color .
