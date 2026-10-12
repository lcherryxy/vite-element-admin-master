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

// mock/demo.js
var demo_exports = {};
__export(demo_exports, {
  default: () => demo_default
});
module.exports = __toCommonJS(demo_exports);
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
var demo_default = [
  {
    url: "/api/demo/tableList",
    method: "get",
    response: () => {
      return {
        code: 200,
        message: "success",
        data: list()
      };
    }
  }
];
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsibW9jay9kZW1vLmpzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJjb25zdCBfX2luamVjdGVkX2ZpbGVuYW1lX18gPSBcIkM6XFxcXFVzZXJzXFxcXExlbm92b1xcXFxEb2N1bWVudHNcXFxcdml0ZS1lbGVtZW50LWFkbWluLW1hc3RlclxcXFxtb2NrXFxcXGRlbW8uanNcIjtjb25zdCBfX2luamVjdGVkX2Rpcm5hbWVfXyA9IFwiQzpcXFxcVXNlcnNcXFxcTGVub3ZvXFxcXERvY3VtZW50c1xcXFx2aXRlLWVsZW1lbnQtYWRtaW4tbWFzdGVyXFxcXG1vY2tcIjtjb25zdCBfX2luamVjdGVkX2ltcG9ydF9tZXRhX3VybF9fID0gXCJmaWxlOi8vL0M6L1VzZXJzL0xlbm92by9Eb2N1bWVudHMvdml0ZS1lbGVtZW50LWFkbWluLW1hc3Rlci9tb2NrL2RlbW8uanNcIjtcbmNvbnN0IGxpc3QgPSAoKSA9PiB7XG4gIGNvbnN0IHJlc3VsdCA9IFtdXG4gIGNvbnN0IHRvdGFsID0gMTAwXG4gIGNvbnN0IGJhc2VDb250ZW50ID0gJzxwPkkgYW0gdGVzdGluZyBkYXRhLCBJIGFtIHRlc3RpbmcgZGF0YS48L3A+PHA+PGltZyBzcmM9XCJodHRwczovL3dwaW1nLndhbGxzdGNuLmNvbS80YzY5MDA5Yy0wZmQ0LTQxNTMtYjExMi02Y2I1M2QxY2Y5NDNcIj48L3A+J1xuICBjb25zdCBpbWFnZV91cmkgPSAnaHR0cHM6Ly93cGltZy53YWxsc3Rjbi5jb20vZTQ1NTgwODYtNjMxYy00MjVjLTk0MzAtNTZmZmI0NmU3MGIzJ1xuICBcbiAgZm9yIChsZXQgaSA9IDE7IGkgPD0gdG90YWw7IGkrKykge1xuICAgIGNvbnN0IGl0ZW0gPSB7XG4gICAgICBpZDogJ0BpbmNyZW1lbnQnLFxuICAgICAgdGltZXN0YW1wOiAnQGRhdGV0aW1lKCknLFxuICAgICAgYXV0aG9yOiAnQGZpcnN0JyxcbiAgICAgIHJldmlld2VyOiAnQGZpcnN0JyxcbiAgICAgIHRpdGxlOiAnQHRpdGxlKDUsIDEwKScsXG4gICAgICBjb250ZW50X3Nob3J0OiAnbW9jayBkYXRhJyxcbiAgICAgIGNvbnRlbnQ6IGJhc2VDb250ZW50LFxuICAgICAgZm9yZWNhc3Q6ICdAZmxvYXQoMCwgMTAwLCAyLCAyKScsXG4gICAgICBpbXBvcnRhbmNlOiAnQGludGVnZXIoMSwgMyknLFxuICAgICAgJ3R5cGV8MSc6IFsnQ04nLCAnVVMnLCAnSlAnLCAnRVUnXSxcbiAgICAgICdzdGF0dXN8MSc6IFsncHVibGlzaGVkJywgJ2RyYWZ0J10sXG4gICAgICBkaXNwbGF5X3RpbWU6ICdAZGF0ZXRpbWUnLFxuICAgICAgY29tbWVudF9kaXNhYmxlZDogdHJ1ZSxcbiAgICAgIHBhZ2V2aWV3czogJ0BpbnRlZ2VyKDMwMCwgNTAwMCknLFxuICAgICAgaW1hZ2VfdXJpLFxuICAgICAgcGxhdGZvcm1zOiBbJ2EtcGxhdGZvcm0nXVxuICAgIH1cbiAgICByZXN1bHQucHVzaCggaXRlbSApO1xuICB9XG4gIFxuICByZXR1cm4gcmVzdWx0XG59O1xuXG5leHBvcnQgZGVmYXVsdCBbXG4gIHtcbiAgICB1cmw6ICcvYXBpL2RlbW8vdGFibGVMaXN0JyxcbiAgICBtZXRob2Q6ICdnZXQnLFxuICAgIHJlc3BvbnNlOiAoKSA9PiB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBjb2RlOiAyMDAsXG4gICAgICAgIG1lc3NhZ2U6ICdzdWNjZXNzJyxcbiAgICAgICAgZGF0YTogbGlzdCgpXG4gICAgICB9XG4gICAgfVxuICB9LFxuICBcbl1cbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0EsSUFBTSxPQUFPLE1BQU07QUFDakIsUUFBTSxTQUFTLENBQUM7QUFDaEIsUUFBTSxRQUFRO0FBQ2QsUUFBTSxjQUFjO0FBQ3BCLFFBQU0sWUFBWTtBQUVsQixXQUFTLElBQUksR0FBRyxLQUFLLE9BQU8sS0FBSztBQUMvQixVQUFNLE9BQU87QUFBQSxNQUNYLElBQUk7QUFBQSxNQUNKLFdBQVc7QUFBQSxNQUNYLFFBQVE7QUFBQSxNQUNSLFVBQVU7QUFBQSxNQUNWLE9BQU87QUFBQSxNQUNQLGVBQWU7QUFBQSxNQUNmLFNBQVM7QUFBQSxNQUNULFVBQVU7QUFBQSxNQUNWLFlBQVk7QUFBQSxNQUNaLFVBQVUsQ0FBQyxNQUFNLE1BQU0sTUFBTSxJQUFJO0FBQUEsTUFDakMsWUFBWSxDQUFDLGFBQWEsT0FBTztBQUFBLE1BQ2pDLGNBQWM7QUFBQSxNQUNkLGtCQUFrQjtBQUFBLE1BQ2xCLFdBQVc7QUFBQSxNQUNYO0FBQUEsTUFDQSxXQUFXLENBQUMsWUFBWTtBQUFBLElBQzFCO0FBQ0EsV0FBTyxLQUFNLElBQUs7QUFBQSxFQUNwQjtBQUVBLFNBQU87QUFDVDtBQUVBLElBQU8sZUFBUTtBQUFBLEVBQ2I7QUFBQSxJQUNFLEtBQUs7QUFBQSxJQUNMLFFBQVE7QUFBQSxJQUNSLFVBQVUsTUFBTTtBQUNkLGFBQU87QUFBQSxRQUNMLE1BQU07QUFBQSxRQUNOLFNBQVM7QUFBQSxRQUNULE1BQU0sS0FBSztBQUFBLE1BQ2I7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUVGOyIsCiAgIm5hbWVzIjogW10KfQo=
