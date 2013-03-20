#  Object Builder [ReDuX]

This is a complete rebuild of a [tool][OBJBUILDER1] I built many *centenniae* ago.
This time with [CoffeeScript][COFFEE], [LESS][], [Kit][KIT], [Eco templates][ECO] and [PrismJS][PRISM].

[OBJBUILDER1]: http://greystate.dk/resources/objectbuilder/
[COFFEE]: http://coffeescript.org/
[LESS]: http://lesscss.org/
[KIT]: http://incident57.com/codekit/kit.php
[ECO]: https://github.com/sstephenson/eco/
[PRISM]: http://prismjs.com/

## Installation

To run the app you'll need a webserver of some sorts. I use [Pow](http://pow.cx/) because it's dead simple to setup
on a new machine. Pow automatically serves static files in the `public` directory so once you've configured the app
as a Pow site it should be working.

I use the *Nimbus Sans Extended* font from [Typekit](http://typekit.com/) so you'll have to configure your own Typekit
account if you want to use that. You'll need to replace the script in the `_type.kit` file (or directly in `index.html`)
with your own Typekit code.

## Development

For development I use [TextMate](http://macromates.com/) and [CodeKit](http://incident57.com/codekit/) - CodeKit does
the on-the-fly compilation of LESS, CoffeeScript and Kit files whenever I save one of those files. I also use TextMate's
*Persistent Includes* for a couple of things - if you get to that, ping me, and I'll provide the missing file(s) and walk
you through it :-)

## Credits

* Background graphic from [Subtle Patterns](http://subtlepatterns.com/grunge-wall/)