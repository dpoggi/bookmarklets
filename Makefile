UGLIFY	= uglifyjs
PREFIX	= printf "javascript:" >
PB	= dcp-clip
RM	= rm -f
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
