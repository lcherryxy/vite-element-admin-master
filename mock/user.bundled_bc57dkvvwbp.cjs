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

// mock/user.js
var user_exports = {};
__export(user_exports, {
  default: () => user_default
});
module.exports = __toCommonJS(user_exports);
var userInfo = () => {
  const result = {
    id: 9527,
    avatar: "https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif",
    name: "\u7070\u662F\u5C0F\u7070\u7070\u7684\u7070",
    phone: "15988888888",
    email: "454539387@qq.com",
    identity: "",
    roles: ["admin"]
  };
  return result;
};
var list = () => {
  const result = [];
  const total = 1e4 * 10;
  for (let i = 1; i <= total; i++) {
    const item = {
      id: "@increment",
      method: i % 4,
      deviceType: '@pick(["web", "glass", "mobile", "desktop", "others"])',
      // 设备名称
      deviceOs: '@pick(["win10", "win11", "ios", "android", "others"])',
      // 系统
      loginAddr: "@city(true)",
      // 登录地点
      loginTime: " @datetime()"
      // 最后登录时间
    };
    result.push(item);
  }
  return result;
};
var user_default = [
  {
    url: "/api/login",
    type: "get",
    response: (config) => {
      return {
        code: 200,
        message: "success",
        data: {
          token: "token"
        }
        // data: loginInfo()
      };
    }
  },
  {
    url: "/api/getUserInfo",
    type: "get",
    response: () => {
      return {
        code: 200,
        message: "success",
        data: userInfo()
      };
    }
  },
  {
    url: "/api/test",
    type: "get",
    response: () => {
      return {
        code: 5004,
        message: "fail",
        data: []
      };
    }
  },
  {
    url: "/api/logout",
    method: "get",
    response: () => {
      return {
        code: 200,
        message: "success"
      };
    }
  },
  {
    url: "/api/login/history",
    type: "get",
    response: (config) => {
      return {
        code: 200,
        message: "success",
        data: list()
      };
    }
  }
];
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsibW9jay91c2VyLmpzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJjb25zdCBfX2luamVjdGVkX2ZpbGVuYW1lX18gPSBcIkM6XFxcXFVzZXJzXFxcXExlbm92b1xcXFxEb2N1bWVudHNcXFxcdml0ZS1lbGVtZW50LWFkbWluLW1hc3RlclxcXFxtb2NrXFxcXHVzZXIuanNcIjtjb25zdCBfX2luamVjdGVkX2Rpcm5hbWVfXyA9IFwiQzpcXFxcVXNlcnNcXFxcTGVub3ZvXFxcXERvY3VtZW50c1xcXFx2aXRlLWVsZW1lbnQtYWRtaW4tbWFzdGVyXFxcXG1vY2tcIjtjb25zdCBfX2luamVjdGVkX2ltcG9ydF9tZXRhX3VybF9fID0gXCJmaWxlOi8vL0M6L1VzZXJzL0xlbm92by9Eb2N1bWVudHMvdml0ZS1lbGVtZW50LWFkbWluLW1hc3Rlci9tb2NrL3VzZXIuanNcIjtcbi8vIGh0dHA6Ly9tb2NranMuY29tL2V4YW1wbGVzLmh0bWwjT2JqZWN0XG5jb25zdCBsb2dpbkluZm8gPSAoKSA9PiB7XG4gIGNvbnN0IHJlc3VsdCA9IHtcbiAgICB0b2tlbjogJ3Rva2VuJ1xuICB9XG4gIHJldHVybiByZXN1bHRcbn1cblxuY29uc3QgdXNlckluZm8gPSAoKSA9PiB7XG4gIGNvbnN0IHJlc3VsdCA9IHtcbiAgICBpZDogOTUyNyxcbiAgICBhdmF0YXI6ICdodHRwczovL3dwaW1nLndhbGxzdGNuLmNvbS9mNzc4NzM4Yy1lNGY4LTQ4NzAtYjYzNC01NjcwM2I0YWNhZmUuZ2lmJyxcbiAgICBuYW1lOiAnXHU3MDcwXHU2NjJGXHU1QzBGXHU3MDcwXHU3MDcwXHU3Njg0XHU3MDcwJyxcbiAgICBwaG9uZTogJzE1OTg4ODg4ODg4JyxcbiAgICBlbWFpbDogJzQ1NDUzOTM4N0BxcS5jb20nLFxuICAgIGlkZW50aXR5OiAnJyxcbiAgICByb2xlczogWydhZG1pbiddLFxuICB9XG4gIHJldHVybiByZXN1bHRcbn1cblxuY29uc3QgbGlzdCA9ICgpID0+IHtcbiAgY29uc3QgcmVzdWx0ID0gW11cbiAgLy8gY29uc3QgdG90YWwgPSAxMDAwMCAqIDEwXG4gIGNvbnN0IHRvdGFsID0gMTAwMDAgKiAxMFxuICBmb3IgKGxldCBpID0gMTsgaSA8PSB0b3RhbDsgaSsrKSB7XG4gICAgY29uc3QgaXRlbSA9IHtcbiAgICAgIGlkOiAnQGluY3JlbWVudCcsXG4gICAgICBtZXRob2QgOiBpICUgNCxcbiAgICAgIGRldmljZVR5cGUgOiAnQHBpY2soW1wid2ViXCIsIFwiZ2xhc3NcIiwgXCJtb2JpbGVcIiwgXCJkZXNrdG9wXCIsIFwib3RoZXJzXCJdKScsIC8vIFx1OEJCRVx1NTkwN1x1NTQwRFx1NzlGMFxuICAgICAgZGV2aWNlT3MgOiAnQHBpY2soW1wid2luMTBcIiwgXCJ3aW4xMVwiLCBcImlvc1wiLCBcImFuZHJvaWRcIiwgXCJvdGhlcnNcIl0pJywgLy8gXHU3Q0ZCXHU3RURGXG4gICAgICBsb2dpbkFkZHIgOiAnQGNpdHkodHJ1ZSknLCAvLyBcdTc2N0JcdTVGNTVcdTU3MzBcdTcwQjlcbiAgICAgIGxvZ2luVGltZSA6JyBAZGF0ZXRpbWUoKScsIC8vIFx1NjcwMFx1NTQwRVx1NzY3Qlx1NUY1NVx1NjVGNlx1OTVGNFxuICAgIH1cbiAgICByZXN1bHQucHVzaCggaXRlbSApO1xuICB9XG4gIFxuICByZXR1cm4gcmVzdWx0XG59XG5cbmV4cG9ydCBkZWZhdWx0IFtcbiAge1xuICAgIHVybDogJy9hcGkvbG9naW4nLFxuICAgIHR5cGU6ICdnZXQnLFxuICAgIHJlc3BvbnNlOiBjb25maWcgPT4ge1xuICAgICAgLy8gY29uc3QgeyB1c2VybmFtZSB9ID0gY29uZmlnLmJvZHlcbiAgICAgIC8vIGNvbnN0IHRva2VuID0gdG9rZW5zW3VzZXJuYW1lXVxuICAgICAgLy8gaWYgKCF0b2tlbikge1xuICAgICAgLy8gICByZXR1cm4ge1xuICAgICAgLy8gICAgIGNvZGU6IDYwMjA0LFxuICAgICAgLy8gICAgIG1lc3NhZ2U6ICdcdThEMjZcdTUzRjdcdTVCQzZcdTc4MDFcdTk1MTlcdThCRUYnXG4gICAgICAvLyAgIH1cbiAgICAgIC8vIH1cbiAgICAgIHJldHVybiB7XG4gICAgICAgIGNvZGU6IDIwMCxcbiAgICAgICAgbWVzc2FnZTogJ3N1Y2Nlc3MnLFxuICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgdG9rZW46ICd0b2tlbidcbiAgICAgICAgfVxuICAgICAgICAvLyBkYXRhOiBsb2dpbkluZm8oKVxuICAgICAgfVxuICAgIH1cbiAgfSxcbiAgXG4gIHtcbiAgICB1cmw6ICcvYXBpL2dldFVzZXJJbmZvJyxcbiAgICB0eXBlOiAnZ2V0JyxcbiAgICByZXNwb25zZTogKCkgPT4ge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgY29kZTogMjAwLFxuICAgICAgICBtZXNzYWdlOiAnc3VjY2VzcycsXG4gICAgICAgIGRhdGE6IHVzZXJJbmZvKClcbiAgICAgIH1cbiAgICB9XG4gIH0sXG4gIFxuICB7XG4gICAgdXJsOiAnL2FwaS90ZXN0JyxcbiAgICB0eXBlOiAnZ2V0JyxcbiAgICByZXNwb25zZTogKCkgPT4ge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgY29kZTogNTAwNCxcbiAgICAgICAgbWVzc2FnZTogJ2ZhaWwnLFxuICAgICAgICBkYXRhOiBbXVxuICAgICAgfVxuICAgIH1cbiAgfSxcbiAgXG4gIHtcbiAgICB1cmw6IFwiL2FwaS9sb2dvdXRcIixcbiAgICBtZXRob2Q6IFwiZ2V0XCIsXG4gICAgcmVzcG9uc2U6ICgpID0+IHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIGNvZGU6IDIwMCxcbiAgICAgICAgbWVzc2FnZTogJ3N1Y2Nlc3MnXG4gICAgICB9XG4gICAgfSxcbiAgfSxcbiAgXG4gIHtcbiAgICB1cmw6ICcvYXBpL2xvZ2luL2hpc3RvcnknLFxuICAgIHR5cGU6ICdnZXQnLFxuICAgIHJlc3BvbnNlOiBjb25maWcgPT4ge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgY29kZTogMjAwLFxuICAgICAgICBtZXNzYWdlOiAnc3VjY2VzcycsXG4gICAgICAgIGRhdGE6IGxpc3QoKVxuICAgICAgfVxuICAgIH1cbiAgfSxcbl1cbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBU0EsSUFBTSxXQUFXLE1BQU07QUFDckIsUUFBTSxTQUFTO0FBQUEsSUFDYixJQUFJO0FBQUEsSUFDSixRQUFRO0FBQUEsSUFDUixNQUFNO0FBQUEsSUFDTixPQUFPO0FBQUEsSUFDUCxPQUFPO0FBQUEsSUFDUCxVQUFVO0FBQUEsSUFDVixPQUFPLENBQUMsT0FBTztBQUFBLEVBQ2pCO0FBQ0EsU0FBTztBQUNUO0FBRUEsSUFBTSxPQUFPLE1BQU07QUFDakIsUUFBTSxTQUFTLENBQUM7QUFFaEIsUUFBTSxRQUFRLE1BQVE7QUFDdEIsV0FBUyxJQUFJLEdBQUcsS0FBSyxPQUFPLEtBQUs7QUFDL0IsVUFBTSxPQUFPO0FBQUEsTUFDWCxJQUFJO0FBQUEsTUFDSixRQUFTLElBQUk7QUFBQSxNQUNiLFlBQWE7QUFBQTtBQUFBLE1BQ2IsVUFBVztBQUFBO0FBQUEsTUFDWCxXQUFZO0FBQUE7QUFBQSxNQUNaLFdBQVc7QUFBQTtBQUFBLElBQ2I7QUFDQSxXQUFPLEtBQU0sSUFBSztBQUFBLEVBQ3BCO0FBRUEsU0FBTztBQUNUO0FBRUEsSUFBTyxlQUFRO0FBQUEsRUFDYjtBQUFBLElBQ0UsS0FBSztBQUFBLElBQ0wsTUFBTTtBQUFBLElBQ04sVUFBVSxZQUFVO0FBU2xCLGFBQU87QUFBQSxRQUNMLE1BQU07QUFBQSxRQUNOLFNBQVM7QUFBQSxRQUNULE1BQU07QUFBQSxVQUNKLE9BQU87QUFBQSxRQUNUO0FBQUE7QUFBQSxNQUVGO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFBQSxFQUVBO0FBQUEsSUFDRSxLQUFLO0FBQUEsSUFDTCxNQUFNO0FBQUEsSUFDTixVQUFVLE1BQU07QUFDZCxhQUFPO0FBQUEsUUFDTCxNQUFNO0FBQUEsUUFDTixTQUFTO0FBQUEsUUFDVCxNQUFNLFNBQVM7QUFBQSxNQUNqQjtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQUEsRUFFQTtBQUFBLElBQ0UsS0FBSztBQUFBLElBQ0wsTUFBTTtBQUFBLElBQ04sVUFBVSxNQUFNO0FBQ2QsYUFBTztBQUFBLFFBQ0wsTUFBTTtBQUFBLFFBQ04sU0FBUztBQUFBLFFBQ1QsTUFBTSxDQUFDO0FBQUEsTUFDVDtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQUEsRUFFQTtBQUFBLElBQ0UsS0FBSztBQUFBLElBQ0wsUUFBUTtBQUFBLElBQ1IsVUFBVSxNQUFNO0FBQ2QsYUFBTztBQUFBLFFBQ0wsTUFBTTtBQUFBLFFBQ04sU0FBUztBQUFBLE1BQ1g7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUFBLEVBRUE7QUFBQSxJQUNFLEtBQUs7QUFBQSxJQUNMLE1BQU07QUFBQSxJQUNOLFVBQVUsWUFBVTtBQUNsQixhQUFPO0FBQUEsUUFDTCxNQUFNO0FBQUEsUUFDTixTQUFTO0FBQUEsUUFDVCxNQUFNLEtBQUs7QUFBQSxNQUNiO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFDRjsiLAogICJuYW1lcyI6IFtdCn0K
