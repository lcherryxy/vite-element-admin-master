var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// mock/article.js
var article_exports = {};
__export(article_exports, {
  default: () => article_default
});
module.exports = __toCommonJS(article_exports);
var list = () => {
  const result = [];
  const total = 100;
  const baseContent = '<p>I am testing data, I am testing data.</p><p><img src="https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943"></p>';
  const image_uri = "https://wpimg.wallstcn.com/e4558086-631c-425c-9430-56ffb46e70b3";
  for (let i = 1; i <= total; i++) {
    const item = {
      id: "@increment",
      timestamp: "@datetime()",
      author: "@first",
      reviewer: "@first",
      title: "@title(5, 10)",
      content_short: "mock data",
      content: baseContent,
      forecast: "@float(0, 100, 2, 2)",
      importance: "@integer(1, 3)",
      "type|1": ["CN", "US", "JP", "EU"],
      "status|1": ["published", "draft"],
      display_time: "@datetime",
      comment_disabled: true,
      pageviews: "@integer(300, 5000)",
      image_uri,
      platforms: ["a-platform"]
    };
    result.push(item);
  }
  return result;
};
var article_default = [
  {
    url: "/api/article/list",
    method: "get",
    response: (config) => {
      const { importance, type, title, page = 1, limit = 20, sort } = config.query;
      const List2 = list();
      let mockList = List2.filter((item) => {
        if (importance && item.importance !== +importance)
          return false;
        if (type && item.type !== type)
          return false;
        if (title && item.title.indexOf(title) < 0)
          return false;
        return true;
      });
      if (sort === "-id") {
        mockList = mockList.reverse();
      }
      const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1));
      return {
        code: 200,
        message: "success",
        data: {
          total: mockList.length,
          items: pageList
        }
      };
    }
  },
  {
    url: "/api/article/detail",
    type: "get",
    response: (config) => {
      const { id } = config.query;
      for (const article of List) {
        if (article.id === +id) {
          return {
            code: 200,
            message: "success",
            data: article
          };
        }
      }
    }
  },
  {
    url: "/api/article/pv",
    type: "get",
    response: (_) => {
      return {
        code: 200,
        message: "success",
        data: {
          pvData: [
            { key: "PC", pv: 1024 },
            { key: "mobile", pv: 1024 },
            { key: "ios", pv: 1024 },
            { key: "android", pv: 1024 }
          ]
        }
      };
    }
  },
  {
    url: "/api/article/create",
    type: "post",
    response: (_) => {
      return {
        code: 200,
        message: "success",
        data: "success"
      };
    }
  },
  {
    url: "/api/article/update",
    type: "post",
    response: (_) => {
      return {
        code: 200,
        message: "success",
        data: "success"
      };
    }
  }
];
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsibW9jay9hcnRpY2xlLmpzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJjb25zdCBfX2luamVjdGVkX2ZpbGVuYW1lX18gPSBcIkM6XFxcXFVzZXJzXFxcXExlbm92b1xcXFxEb2N1bWVudHNcXFxcdml0ZS1lbGVtZW50LWFkbWluLW1hc3RlclxcXFxtb2NrXFxcXGFydGljbGUuanNcIjtjb25zdCBfX2luamVjdGVkX2Rpcm5hbWVfXyA9IFwiQzpcXFxcVXNlcnNcXFxcTGVub3ZvXFxcXERvY3VtZW50c1xcXFx2aXRlLWVsZW1lbnQtYWRtaW4tbWFzdGVyXFxcXG1vY2tcIjtjb25zdCBfX2luamVjdGVkX2ltcG9ydF9tZXRhX3VybF9fID0gXCJmaWxlOi8vL0M6L1VzZXJzL0xlbm92by9Eb2N1bWVudHMvdml0ZS1lbGVtZW50LWFkbWluLW1hc3Rlci9tb2NrL2FydGljbGUuanNcIjtcbmNvbnN0IGxpc3QgPSAoKSA9PiB7XG4gIGNvbnN0IHJlc3VsdCA9IFtdXG4gIGNvbnN0IHRvdGFsID0gMTAwXG4gIGNvbnN0IGJhc2VDb250ZW50ID0gJzxwPkkgYW0gdGVzdGluZyBkYXRhLCBJIGFtIHRlc3RpbmcgZGF0YS48L3A+PHA+PGltZyBzcmM9XCJodHRwczovL3dwaW1nLndhbGxzdGNuLmNvbS80YzY5MDA5Yy0wZmQ0LTQxNTMtYjExMi02Y2I1M2QxY2Y5NDNcIj48L3A+J1xuICBjb25zdCBpbWFnZV91cmkgPSAnaHR0cHM6Ly93cGltZy53YWxsc3Rjbi5jb20vZTQ1NTgwODYtNjMxYy00MjVjLTk0MzAtNTZmZmI0NmU3MGIzJ1xuICBcbiAgZm9yIChsZXQgaSA9IDE7IGkgPD0gdG90YWw7IGkrKykge1xuICAgIGNvbnN0IGl0ZW0gPSB7XG4gICAgICBpZDogJ0BpbmNyZW1lbnQnLFxuICAgICAgdGltZXN0YW1wOiAnQGRhdGV0aW1lKCknLFxuICAgICAgYXV0aG9yOiAnQGZpcnN0JyxcbiAgICAgIHJldmlld2VyOiAnQGZpcnN0JyxcbiAgICAgIHRpdGxlOiAnQHRpdGxlKDUsIDEwKScsXG4gICAgICBjb250ZW50X3Nob3J0OiAnbW9jayBkYXRhJyxcbiAgICAgIGNvbnRlbnQ6IGJhc2VDb250ZW50LFxuICAgICAgZm9yZWNhc3Q6ICdAZmxvYXQoMCwgMTAwLCAyLCAyKScsXG4gICAgICBpbXBvcnRhbmNlOiAnQGludGVnZXIoMSwgMyknLFxuICAgICAgJ3R5cGV8MSc6IFsnQ04nLCAnVVMnLCAnSlAnLCAnRVUnXSxcbiAgICAgICdzdGF0dXN8MSc6IFsncHVibGlzaGVkJywgJ2RyYWZ0J10sXG4gICAgICBkaXNwbGF5X3RpbWU6ICdAZGF0ZXRpbWUnLFxuICAgICAgY29tbWVudF9kaXNhYmxlZDogdHJ1ZSxcbiAgICAgIHBhZ2V2aWV3czogJ0BpbnRlZ2VyKDMwMCwgNTAwMCknLFxuICAgICAgaW1hZ2VfdXJpLFxuICAgICAgcGxhdGZvcm1zOiBbJ2EtcGxhdGZvcm0nXVxuICAgIH1cbiAgICByZXN1bHQucHVzaCggaXRlbSApO1xuICB9XG4gIFxuICByZXR1cm4gcmVzdWx0XG59XG5cbmV4cG9ydCBkZWZhdWx0IFtcbiAge1xuICAgIHVybDogJy9hcGkvYXJ0aWNsZS9saXN0JyxcbiAgICBtZXRob2Q6ICdnZXQnLFxuICAgIHJlc3BvbnNlOiAoIGNvbmZpZyApID0+IHtcbiAgICAgIGNvbnN0IHsgaW1wb3J0YW5jZSwgdHlwZSwgdGl0bGUsIHBhZ2UgPSAxLCBsaW1pdCA9IDIwLCBzb3J0IH0gPSBjb25maWcucXVlcnlcbiAgICAgIFxuICAgICAgY29uc3QgTGlzdCA9IGxpc3QoKVxuICBcbiAgICAgIGxldCBtb2NrTGlzdCA9IExpc3QuZmlsdGVyKGl0ZW0gPT4ge1xuICAgICAgICBpZiAoaW1wb3J0YW5jZSAmJiBpdGVtLmltcG9ydGFuY2UgIT09ICtpbXBvcnRhbmNlKSByZXR1cm4gZmFsc2VcbiAgICAgICAgaWYgKHR5cGUgJiYgaXRlbS50eXBlICE9PSB0eXBlKSByZXR1cm4gZmFsc2VcbiAgICAgICAgaWYgKHRpdGxlICYmIGl0ZW0udGl0bGUuaW5kZXhPZih0aXRsZSkgPCAwKSByZXR1cm4gZmFsc2VcbiAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgIH0pXG4gIFxuICAgICAgaWYgKCBzb3J0ID09PSAnLWlkJyApIHtcbiAgICAgICAgbW9ja0xpc3QgPSBtb2NrTGlzdC5yZXZlcnNlKClcbiAgICAgIH1cbiAgICAgIFxuICAgICAgY29uc3QgcGFnZUxpc3QgPSBtb2NrTGlzdC5maWx0ZXIoKGl0ZW0sIGluZGV4KSA9PiBpbmRleCA8IGxpbWl0ICogcGFnZSAmJiBpbmRleCA+PSBsaW1pdCAqIChwYWdlIC0gMSkpXG4gICAgICBcbiAgICAgIHJldHVybiB7XG4gICAgICAgIGNvZGU6IDIwMCxcbiAgICAgICAgbWVzc2FnZTogJ3N1Y2Nlc3MnLFxuICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgdG90YWw6IG1vY2tMaXN0Lmxlbmd0aCxcbiAgICAgICAgICBpdGVtczogcGFnZUxpc3RcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfSxcbiAgXG4gIHtcbiAgICB1cmw6ICcvYXBpL2FydGljbGUvZGV0YWlsJyxcbiAgICB0eXBlOiAnZ2V0JyxcbiAgICByZXNwb25zZTogY29uZmlnID0+IHtcbiAgICAgIGNvbnN0IHsgaWQgfSA9IGNvbmZpZy5xdWVyeVxuICAgICAgZm9yIChjb25zdCBhcnRpY2xlIG9mIExpc3QpIHtcbiAgICAgICAgaWYgKGFydGljbGUuaWQgPT09ICtpZCkge1xuICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBjb2RlOiAyMDAsXG4gICAgICAgICAgICBtZXNzYWdlOiAnc3VjY2VzcycsXG4gICAgICAgICAgICBkYXRhOiBhcnRpY2xlXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9LFxuICBcbiAge1xuICAgIHVybDogJy9hcGkvYXJ0aWNsZS9wdicsXG4gICAgdHlwZTogJ2dldCcsXG4gICAgcmVzcG9uc2U6IF8gPT4ge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgY29kZTogMjAwLFxuICAgICAgICBtZXNzYWdlOiAnc3VjY2VzcycsXG4gICAgICAgIGRhdGE6IHtcbiAgICAgICAgICBwdkRhdGE6IFtcbiAgICAgICAgICAgIHsga2V5OiAnUEMnLCBwdjogMTAyNCB9LFxuICAgICAgICAgICAgeyBrZXk6ICdtb2JpbGUnLCBwdjogMTAyNCB9LFxuICAgICAgICAgICAgeyBrZXk6ICdpb3MnLCBwdjogMTAyNCB9LFxuICAgICAgICAgICAgeyBrZXk6ICdhbmRyb2lkJywgcHY6IDEwMjQgfVxuICAgICAgICAgIF1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfSxcbiAgXG4gIHtcbiAgICB1cmw6ICcvYXBpL2FydGljbGUvY3JlYXRlJyxcbiAgICB0eXBlOiAncG9zdCcsXG4gICAgcmVzcG9uc2U6IF8gPT4ge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgY29kZTogMjAwLFxuICAgICAgICBtZXNzYWdlOiAnc3VjY2VzcycsXG4gICAgICAgIGRhdGE6ICdzdWNjZXNzJ1xuICAgICAgfVxuICAgIH1cbiAgfSxcbiAgXG4gIHtcbiAgICB1cmw6ICcvYXBpL2FydGljbGUvdXBkYXRlJyxcbiAgICB0eXBlOiAncG9zdCcsXG4gICAgcmVzcG9uc2U6IF8gPT4ge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgY29kZTogMjAwLFxuICAgICAgICBtZXNzYWdlOiAnc3VjY2VzcycsXG4gICAgICAgIGRhdGE6ICdzdWNjZXNzJ1xuICAgICAgfVxuICAgIH1cbiAgfVxuICBcbl1cbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0EsSUFBTSxPQUFPLE1BQU07QUFDakIsUUFBTSxTQUFTLENBQUM7QUFDaEIsUUFBTSxRQUFRO0FBQ2QsUUFBTSxjQUFjO0FBQ3BCLFFBQU0sWUFBWTtBQUVsQixXQUFTLElBQUksR0FBRyxLQUFLLE9BQU8sS0FBSztBQUMvQixVQUFNLE9BQU87QUFBQSxNQUNYLElB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
