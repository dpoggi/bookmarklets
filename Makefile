NPM		= npm
MIN		= ./node_modules/.bin/prettydiff
MINFLAGS	= mode:"minify" readmethod:"filescreen"
PREFIX		= printf "javascript:"
PB		= ./copy_to_clipboard.sh
RM		= rm -rf

TARGET	= $(patsubst %.js,%.browser.js,$(shell ls *.js | grep -v '\.browser\.js$$'))

.PHONY:		all dep lint clean
.NOTPARALLEL:	all

all:		$(TARGET)

%.browser.js:	%.js
	$(PREFIX) >"$@"
	$(MIN) $(MINFLAGS) source:"$^" >>"$@"

%:		%.browser.js
	$(PB) "$*.browser.js"

dep:
	$(RM) node_modules
	npm install

lint:
	npm run lint

clean:
	$(RM) *.browser.js
