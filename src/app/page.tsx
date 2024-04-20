"use client";

import Edit from "@/components/edit";
import Thumbnail from "@/components/thumbnail";
import Playground from "@/components/playground";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import useCodeStore from "@/store/useCodeStore";
import { Cross1Icon, PlayIcon, PlusIcon } from "@radix-ui/react-icons";
import { useShallow } from "zustand/react/shallow";
import { useState } from "react";

export default function Home() {
  const codes = useCodeStore(state => state.codes);
  const cursorIndex = useCodeStore(state => state.cursorIndex);
  const appendCode = useCodeStore(useShallow(state => state.appendCode));
  const changeCursorIndex = useCodeStore(
    useShallow(state => state.changeCursorIndex)
  );
  const [isAction, setIsAction] = useState(false);

  return (
    <main className="w-[100%] h-[100%] pl-5 pr-5 pt-5 flex">
      <ScrollArea className="h-[100%] w-48 rounded-md border">
        <div className="p-4">
          {codes.map((code, index) => (
            <>
              <div
                key={index}
                onClick={() => {
                  changeCursorIndex(index);
                  setIsAction(false);
                }}
              >
                <Thumbnail
                  code={code}
                  isEdit={cursorIndex === index}
                ></Thumbnail>
              </div>
              <Separator className="my-2" />
            </>
          ))}
          <Button
            className="h-28 w-40 rounded-lg bg-slate-500/30"
            onClick={appendCode}
          >
            <PlusIcon className="h-14 w-14" />
          </Button>
        </div>
      </ScrollArea>
      <div className="ml-auto mr-auto flex self-center flex-col">
        <Edit
          className="relative w-[60vw] h-[60vh]"
          code={codes[cursorIndex]}
        />
        {isAction ? (
          <>
            <Playground isAction={isAction} />
            <Button
              className="ml-auto mr-auto mt-10 bg-red-400 z-20"
              onClick={() => setIsAction(false)}
            >
              <Cross1Icon className="mr-2 h-4 w-4" />
              Exit
            </Button>
          </>
        ) : (
          <Button
            className="ml-auto mr-auto mt-10 bg-green-400 z-20"
            onClick={() => setIsAction(true)}
          >
            <PlayIcon className="mr-2 h-4 w-4" />
            Action type
          </Button>
        )}
      </div>
    </main>
  );
}
