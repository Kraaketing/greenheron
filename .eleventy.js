const { minify } = require("html-minifier-terser");
const markdownIt = require("markdown-it");
const md = new markdownIt();

module.exports = function (eleventyConfig) {
  // Passthough paths
  eleventyConfig.addPassthroughCopy({ "src/static": "/" });

  //markdown filter
  eleventyConfig.addFilter("markdown", function (content) {
    return md.render(content);
  });

  // Claude: Try this approach - add both the CSS files AND the bundle file to watch
  eleventyConfig.addWatchTarget("src/css/**/*.css");
  eleventyConfig.addWatchTarget("src/css/bundle.njk");
  
  // Claude: Force 11ty to consider CSS changes as template dependencies
  eleventyConfig.addTemplateFormats("css");


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
