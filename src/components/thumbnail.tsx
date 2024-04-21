"use client";

import { useEffect, useRef, useState } from "react";
import { Prism } from "react-syntax-highlighter";
import html2canvas from "html2canvas";
import { okaidia } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Button } from "./ui/button";
import { TrashIcon } from "@radix-ui/react-icons";
import useCodeStore from "@/store/useCodeStore";
import { useShallow } from "zustand/react/shallow";

interface Props {
  isEdit: boolean;
  code: string;
  index: number;
}

const thumbnail: React.FC<Props> = ({ isEdit, code, index }) => {
  const removeCode = useCodeStore(useShallow(state => state.removeCode))
  const imgRef = useRef<HTMLImageElement | null>(null);
  const prismRef = useRef<HTMLDivElement | null>(null);
  const [lineHeight, setLineHeight] = useState(0);

  useEffect(() => {
    // 获取 HTML 根元素
    // 获取根元素的计算样式
    const computedStyle = window.getComputedStyle(prismRef.current!);
    // 获取元素的行高
    const lineHeight = computedStyle.lineHeight;
    setLineHeight(parseFloat(lineHeight));
    const el = prismRef.current!.firstElementChild as HTMLElement;
    html2canvas(el).then(canvas => {
      imgRef.current!.src = canvas.toDataURL();
    });
  }, [code]);

  function standardizationCode(code: string) {
    const lines = code.split("\n");
    const maxLineNumber =
      prismRef.current?.getBoundingClientRect().height! / lineHeight - 1;
    if (lines.length < maxLineNumber) {
      code += Array.from({ length: maxLineNumber - lines.length })
        .fill("\n")
        .join("");
    }
    return code;
  }

  return (
    <>
      <div className="relative">
        <img
          className={`h-28 w-40 truncate rounded-lg ${
            isEdit ? "border border-teal-400" : ""
          }`}
          ref={imgRef}
        ></img>
        <Button onClick={() => removeCode(index)} variant="outline" size="icon" className="absolute top-1 right-1 opacity-0 hover:opacity-100">
          <TrashIcon />
        </Button>
      </div>
      <div
        ref={prismRef}
        className="fixed top-[100vh] min-h-28 min-w-40 w-[60vw] h-[60vh]"
      >
        <Prism language="javascript" style={{ ...okaidia }}>
          {standardizationCode(code)}
        </Prism>
      </div>
    </>
  );
};

export default thumbnail;
