const Image = require("@11ty/eleventy-img");
const yaml = require("js-yaml");

async function imageShortcode(src, alt, sizes) {
  let metadata = await Image(`./src${src}`, {
    widths: [300, 800, null],
    formats: ["avif", "jpeg", "png"],
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
  eleventyConfig.addPassthroughCopy("./src/css/");
  eleventyConfig.addWatchTarget("./src/css/");
  eleventyConfig.addPassthroughCopy("./src/images/");
/*   eleventyConfig.addPassthroughCopy("./src/categories/"); */
  eleventyConfig.addPassthroughCopy({ "./src/favicons": "/" });
  eleventyConfig.addNunjucksAsyncShortcode("EleventyImage", imageShortcode);
  eleventyConfig.addShortcode("year", () => `${new Date().getFullYear()}`);
  eleventyConfig.addPassthroughCopy({ "./src/admin/config.yml": "./admin/config.yml" });

  
  // To Support .yaml Extension in _data
  // You may remove this if you can use JSON
  eleventyConfig.addDataExtension("yaml", (contents) => yaml.load(contents));

  return {
    dir: {
      input: "src",
      output: "public"
    }
  };
};
