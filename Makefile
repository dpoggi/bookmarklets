UGLIFY	= ./node_modules/.bin/uglifyjs
PREFIX	= printf "javascript:" >
PB	= ./clip.sh
RM	= rm -f

NPM	= npm
BUNDLER	= bundle

TARGET	= $(patsubst %.js,%.browser.js,$(shell ls *.js | grep -v '\.browser\.js$$'))

.PHONY:		all
all:		$(TARGET)

%.browser.js:	%.js
	$(PREFIX) "$@"
	$(UGLIFY) "$^" >> "$@"

%:		%.browser.js
	$(PB) "$*.browser.js"

.PHONY:		clean
clean:
	$(RM) $(TARGET)

.PHONY:		setup
setup:
	$(NPM) install
	$(BUNDLER) install
