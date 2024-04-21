import React, { useCallback, useEffect, useState } from "react";
import { Prism } from "react-syntax-highlighter";
import { okaidia } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Patch, createAnimator, generatePatches } from "@/core/paly";
import useCodeStore from "@/store/useCodeStore";
import { sleep } from "@/util/util";

interface Props {
  isAction: boolean;
}

const PlayGround: React.FC<Props> = ({ isAction }) => {
  const codes = useCodeStore(state => state.codes);
  const [animationCode, setAnimationCode] = useState("");
  const actionPlay = useCallback(async () => {
    if (codes.length < 2) {
      return;
    }
    const input = codes[0];
    let patches: Patch[] = [];
    for (let i = 0; i < codes.length - 1; i++) {
      patches = [...patches, ...generatePatches(codes[i], codes[i + 1])];
    }
    const animator = createAnimator(input, patches);
    for (const result of animator) {
      setAnimationCode(result.output);
      await sleep(70);
    }
  }, [codes])

  useEffect(() => {
    if (isAction) {
      actionPlay();
    }
  }, [isAction, actionPlay]);
  return (
    <Prism
      language="javascript"
      style={{ ...okaidia }}
      className="absolute w-[60vw] h-[60vh] pointer-events-none"
    >
      {animationCode}
    </Prism>
  );
};

export { PlayGround };
