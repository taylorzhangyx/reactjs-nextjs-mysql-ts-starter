import rewire from "rewire";

describe("api", () => {
  const api = rewire("./api.ts");
  const makeItems = api.__get__("makeItems");
  // const makeItems = <(a: string[], rs: string, c: string, d: { [k: string]: any }) => Items>ut_makeItems;
  it("makeItems should build items", () => {
    const items = makeItems(["slug", "content", "data"], "title", "c", {
      data: "1",
    });
    expect(items["slug"]).toBe("title");
  });
});
