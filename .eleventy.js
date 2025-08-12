const { minify } = require("html-minifier-terser");
const markdownIt = require("markdown-it");
const md = new markdownIt();

module.exports = function (eleventyConfig) {
  // Passthough paths
  eleventyConfig.addPassthroughCopy({ "src/static": "/" });
  eleventyConfig.addPassthroughCopy({ "src/robots.txt": "/robots.txt" });

  //markdown filter
  eleventyConfig.addFilter("markdown", function (content) {
    return md.render(content);
  });

  // Minify html output
  eleventyConfig.addTransform("htmlmin", function (content, outputPath) {
    if (this.outputPath.endsWith(".html")) {
      const minified = minify(content, {
        useShortDoctype: true,
        removeComments: true,
        collapseWhitespace: true,
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
