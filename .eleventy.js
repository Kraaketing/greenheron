const markdownIt = require("markdown-it");
const nunjucks = require("nunjucks");

module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy({ "src/static": "/" });
  eleventyConfig.addPassthroughCopy("src/css/styles.css");

  const md = new markdownIt();

  eleventyConfig.addFilter("markdown", function (content) {
    return new nunjucks.runtime.SafeString(md.render(String(content)));
  });

  return {
    dir: {
      input: "src",
      includes: "_includes",
      output: "_site"
    },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    dataTemplateEngine: "njk",
  };
};
