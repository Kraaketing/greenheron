const { minify } = require("html-minifier-terser");

module.exports = function (eleventyConfig) {
  // Passthough paths
  eleventyConfig.addPassthroughCopy({ "src/static": "/" });
  eleventyConfig.addPassthroughCopy("src/css/bundle.css");

  // Minify html output
  eleventyConfig.addTransform("htmlmin", function (content, outputPath) {
    if (this.outputPath.endsWith(".html")) {
      const minified = minify(content, {
        useShortDoctype: true,
        removeComments: true,
        collapseWhitespace: true
      });
      return minified;
    }
    return content;
  });

  return {
    dir: {
      input: "src",
      includes: "_includes",
      output: "_site",
    },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    dataTemplateEngine: "njk",
  };
};
