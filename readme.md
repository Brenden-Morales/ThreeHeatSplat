# What in the world is this?
This is a Three.js / WebGL example of how to make animated heatmaps, silly.

# That's cool, how does it work?
It's pretty simple, actually.

For each point you want to put on the heatmap you create a "GaussianSplat". A GaussianSplat takes a width and a height
and outputs a texture that encodes the gaussian distribution to the red component of each pixel.

To composite all those splats together and make them blend properly we create a "JacksonPollock". JacksonPollock puts
a bunch of GaussianSplat textures, puts them on individual planes and then randomly scatters them throughout a scene.
Then *that* scene is rendered to *another* texture of a given width and height.

Once we have that texture, we put it on yet another plane and render it with a custom shader that changes the red value
of each pixel into a gradient from blue to green to yellow to red.
## It's just that easy