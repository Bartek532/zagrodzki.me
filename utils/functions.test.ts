import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { normalizeCount } from "./functions";

describe("normalizeCount", () => {
  it("adds thousands separators", () => {
    assert.equal(normalizeCount(0), "0");
    assert.equal(normalizeCount(999), "999");
    assert.equal(normalizeCount(1000), "1,000");
    assert.equal(normalizeCount(1234567), "1,234,567");
  });
});
