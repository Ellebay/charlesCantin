const Image = require("@11ty/eleventy-img");

async function imageShortcode(src, alt, sizes) {
  let metadata = await Image(`./src${src}`, {
    widths: [300, 800, null],
    formats: ["avif", "jpeg"],
    urlPath: "/images/",
    outputDir: "./public/images/"
  });

  let imageAttributes = {
    alt,
    sizes,
    loading: "lazy",
    decoding: "async"
  };

  return Image.generateHTML(metadata, imageAttributes);
}

module.exports = function (eleventyConfig) {
  /* tells Eleventy to pass the CSS file through to the final build. */
  eleventyConfig.addPassthroughCopy("./src/css/");

  /*  tells the Eleventy dev server to watch the css directory and reload the site if the files in this directory change */
  eleventyConfig.addWatchTarget("./src/css/");

  /* tells Eleventy to pass the image files through to the final build. */
  eleventyConfig.addPassthroughCopy("./src/images/");

  /* tells Eleventy to pass the favicons files through to the final build. */
  eleventyConfig.addPassthroughCopy({ "./src/favicons": "/" });

  /* outputs the current year so that the footer in our portfolio site is always up to date. */
  eleventyConfig.addShortcode("year", () => `${new Date().getFullYear()}`);

  eleventyConfig.addNunjucksAsyncShortcode("EleventyImage", imageShortcode);

  return {
    dir: {
      input: "src",
      output: "public"
    }
  };
};