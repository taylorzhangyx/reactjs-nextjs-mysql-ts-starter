import { getAllPosts, makeItems } from "./api";

describe("api", () => {
  it("makeItems should build items", () => {
    const items = makeItems(["slug", "content", "data"], "title", "c", {
      data: "1",
    });
    expect(items["slug"]).toBe("title");
  });
  it("get all posts", () => {
    const posts = getAllPosts(["title"], "lib/src/apitest");
    expect(posts.length).toBe(1);
    expect(posts[0].title).toBe("t1-title");
  });
});
