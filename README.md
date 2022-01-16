#  Object Builder [ReDuX]

This is a another rebuild of an old tool I built many *centenniae* ago.
I rewrote the first one years later with [CoffeeScript][COFFEE], [LESS][], [Kit][KIT], [Eco templates][ECO] and [PrismJS][PRISM].
This time around, I've rewritten it to just use [ES6][] as it has adopted most of the goodness from CoffeScript.

The [online version][OBJBUILDERRDX] is up there as well; it looks something like this:

![Screenshot of Object Builder ReDuX](app-screenshot.png)

[OBJBUILDERRDX]: https://greystate.dk/resources/objredux/
[COFFEE]: https://coffeescript.org/
[LESS]: https://lesscss.org/
[KIT]: https://codekitapp.com/help/kit/
[ECO]: https://github.com/sstephenson/eco/
[PRISM]: https://prismjs.com/


## Installation

To run the app you'll need a webserver of some sorts.
Since **CodeKit 2** was released, I've been using its internal web server, since it's one less thing to worry about.

It uses the *Nimbus Sans Extended* font from [Typekit](https://typekit.com/) (I know it's called Adobe WebFonts now, but I don't care) so you should
set up your own account to serve it from - alternatively find another font you like and use that instead.
You'll need to replace the script in the `_type.kit` file (or directly in `index.html`)
with your own *webfonts* code.

## Development

For development I use [Nova](https://nova.app) or [TextMate](https://macromates.com/) with [CodeKit][CK] - CodeKit does
the _on-the-fly compilation_ of LESS, CoffeeScript and Kit files, whenever I save one of those.

The miscellaneous outputs (languages) are rendered using [Eco](https://github.com/sstephenson/eco#eco-embedded-coffeescript-templates) templates which are compiled with a Cake command:

```bash
> cake eco:compile
```

If you're using Nova there should be a Build task (<kbd>CMD</kbd> + <kbd>B</kbd>) ready for this.

## Todo

- [ ] Add a **Copy Code** button to the output


[CK]: https://codekitapp.com

## Credits

* Background graphic from [Subtle Patterns](https://www.toptal.com/designers/subtlepatterns/grunge-wall/)
