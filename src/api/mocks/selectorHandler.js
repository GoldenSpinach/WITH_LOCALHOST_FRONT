import { http, HttpResponse } from "msw";
import { REGION } from "./data/Region";
import { CITY } from "./data/City";
import { CATEGORY } from "./data/Category";
import { OPTION } from "./data/Option";
const { VITE_API_BASE } = import.meta.env;
const selectorHandler = [
  http.get(VITE_API_BASE + "/lookup/region", () => {
    return HttpResponse.json(REGION);
  }),
  http.get(VITE_API_BASE + "/lookup/city", (req, res, ctx) => {
    return HttpResponse.json(CITY);
  }),
  http.get(VITE_API_BASE + "/lookup/category", (req, res, ctx) => {
    const optionParam = new URLSearchParams(new URL(req.request.url).search);
    console.log(optionParam);
    if (optionParam.get("type") === "C") {
      return HttpResponse.json(CATEGORY);
    }
    return HttpResponse.json(OPTION);
  }),
];

export default selectorHandler;
