// "use client";
import useCodeStore from "@/store/useCodeStore";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { Prism } from "react-syntax-highlighter";
import { okaidia } from "react-syntax-highlighter/dist/esm/styles/prism";
import { useShallow } from "zustand/react/shallow";
interface Props {
  className: string;
  code: string;
}
const edit: React.FC<Props> = ({ className, code }) => {
  const editCode = useCodeStore(useShallow(state => state.editCode));
  const codeEditRef = useRef<HTMLTextAreaElement | null>(null);
  const [lineHeight, setLineHeight] = useState(0);

  useEffect(() => {
    // 获取 HTML 根元素
    // 获取根元素的计算样式
    const computedStyle = window.getComputedStyle(codeEditRef.current!);
    // 获取元素的行高
    const lineHeight = computedStyle.lineHeight;
    setLineHeight(parseFloat(lineHeight));
  }, []);

  function handleChangeCode(event: ChangeEvent<HTMLTextAreaElement>) {
    if (
      event.target.value.split("\n").length >
      codeEditRef.current?.getBoundingClientRect().height! / lineHeight - 1
    ) {
      return;
    }
    editCode(event.target.value);
  }

  return (
    <div className={className}>
      <textarea
        className="
        absolute
        w-full h-full
        text-[1em]
        p-[1em] 
        mt-[0.5em] mb-[0.5em]
        z-10 
        bg-transparent text-transparent caret-white resize-none"
        ref={codeEditRef}
        value={code}
        style={{
          fontFamily:
            "'Consolas', 'Monaco', 'Andale Mono', 'Ubuntu Mono', 'monospace'"
        }}
        onChange={handleChangeCode}
      />
      <Prism
        language="javascript"
        style={{ ...okaidia }}
        className="absolute w-full h-full pointer-events-none"
      >
        {code}
      </Prism>
    </div>
  );
};

export default edit;
