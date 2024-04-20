import { diff_match_patch as DiffMatch } from "diff-match-patch";

export interface Patch {
  type: "insert" | "remove";
  from: number;
  text: string;
  length: number;
}

export function generatePatches(
  originText: string,
  targetText: string
): Patch[] {
  const diffMatch = new DiffMatch();
  const delta = diffMatch.diff_main(originText, targetText);
  diffMatch.diff_cleanupSemantic(delta);
  let cursorIndex = 0;
  const patches: Patch[] = [];
  for (const operation of delta) {
    const offset = operation[1].length;
    if (operation[0] === 0) {
      cursorIndex += offset;
      continue;
    } else if (operation[0] === -1) {
      patches.push({
        type: "remove",
        from: cursorIndex + offset,
        length: offset,
        text: ""
      });
    } else if (operation[0] === 1) {
      patches.push({
        type: "insert",
        from: cursorIndex,
        text: operation[1],
        length: operation[1].length
      });
      cursorIndex += offset;
    }
  }
  return patches;
}

export function* createAnimator(input: string, patches: Patch[]) {
  let output = input;
  let cursor = 0;
  for (const patch of patches) {
    if (patch.type === "insert") {
      cursor = patch.from;
      const head = output.slice(0, patch.from);
      const tail = output.slice(patch.from);
      let selection = "";
      for (const char of patch.text) {
        selection += char;
        yield {
          cursor: cursor + selection.length,
          output: head + selection + tail
        };
      }
      output = head + selection + tail;
    } else if (patch.type === "remove") {
      cursor = patch.from - patch.length;
      const head = output.slice(0, patch.from - patch.length);
      const tail = output.slice(patch.from);
      const selection = output.slice(patch.from - patch.length, patch.from);
      for (let i = selection.length; i >= 0; i--) {
        yield {
          cursor: cursor + i,
          output: head + selection.slice(0, i) + tail
        };
      }
      output = head + tail;
    }
  }
}
