# MyDecisive Documentation

This is the source repository for the MyDecisive documentation. The documentation is built using [Hugo](htts://gohugo.io), a static site generator. The theme for styling the docs site is [Relearn](https://github.com/McShelby/hugo-theme-relearn).

### Get Started

The quick way to get started:

1. Clone this repository with Git. 
2. Install Hugo (extended edition).
3. Test changes locally by building and loading the site with Hugo.
4. Create a PR to get your changes reviewed before they're merged.

Depending on what you intend to do (beyond just documentation and plain CSS), the Hugo documentation has more information on other resources you may need.

## What's in the Repo

These are the most relevant directories and files:

- `hugo.toml` - the main config file
- `assets/css` - css files to override theme styles; theme files are copied here and updated; never edit the original as it'll be overwritten with a theme update
- `layouts/partial/logo.html` - HTML to override theme layouts, with `logo.html` being the custom logo for the header 
- `static/images` - stores site images
- `themes` - stores Relearn theme files; imports the theme via git module
- `content` - the Markdown and image files forming the site; site structure follows the directory structure (see Hugo docs for more info)

## Work with Style

Custom css files are stored in `assets/css`. When making a change to a value, add a note in the associated comment to indicate that it's a MyDecisive custom value. An example: 

```
assets/css/theme-relearn-dark.css:  --PRIMARY-color: rgba(19, 19, 19, 1); /* brand primary color; this is the color used in the element surrounding the search box in the upper left; set to MyDecisive black */
...
assets/css/theme-relearn-dark.css:  --SECONDARY-color: rgba(176, 98, 194, 1); /* brand secondary color; used for links; using MyDecisive brand light purple */
``` 

These comments in these examples indicate that the color values were changed from the default.

## Resources

- [Hugo Docs](https://gohugo.io/documentation/)
- [Hugo learning resources](https://gohugo.io/getting-started/external-learning-resources/)
- Hugo Youtube tutorials: https://www.youtube.com/watch?v=qtIqKaDlqXo&list=PLLAZ4kZ9dFpOnyRlyS-liKL5ReHDcj4G3
- Hugo community: See Hugo docs
- The [Relearn](https://github.com/McShelby/hugo-theme-relearn) theme seems to be a well-maintained and well-documented theme that's relatively simple to use.
- More info about the Relearn theme at [this site](https://www.tshdmtmr.com/basics/migration/).
