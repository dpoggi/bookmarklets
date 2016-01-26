NPM		= npm
MIN		= ./node_modules/.bin/prettydiff
MINFLAGS	= mode:"minify" readmethod:"filescreen"
LINT		= ./node_modules/.bin/eslint
PREFIX		= printf "javascript:"
PB		= ./copy_to_clipboard.sh
RM		= rm -f

TARGET	= $(patsubst %.js,%.browser.js,$(shell ls *.js | grep -v '\.browser\.js$$'))

.PHONY:		all
all:		$(TARGET)

%.browser.js:	%.js
	$(PREFIX) >"$@"
	$(MIN) $(MINFLAGS) source:"$^" >>"$@"

%:		%.browser.js
	$(PB) "$*.browser.js"

.PHONY:		clean
clean:
	$(RM) $(TARGET)

.PHONY:		setup
setup:
	$(NPM) install

.PHONY:		lint
lint:
	$(LINT) --no-color .
