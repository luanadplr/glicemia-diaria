"use client";

import { ArrowDownIcon, TrendingDownIcon, TrendingUpIcon } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";

export function HistoricoRegistrosLista({
  dataGlicemia,
  nivelGlicemia,
}: {
  dataGlicemia: any[];
  nivelGlicemia: number;
}) {
  const [listCount, setListCount] = useState(5);

  function handleShowMore() {
    setListCount((prev) => prev + 5);
  }

  return (
    <ul>
      {dataGlicemia.slice(0, listCount).map((glicemia) =>
        glicemia.total > nivelGlicemia ? (
          <li
            key={glicemia.id}
            className="bg-red-100 border border-red-500 rounded-md mt-2 flex justify-between p-2 items-center"
          >
            <div className="flex gap-3 items-center">
              <div className="bg-red-200 text-red-500 rounded-full p-2">
                <TrendingUpIcon />
              </div>
              <div>
                <p className="font-bold">
                  {glicemia.total}{" "}
                  <span className="font-normal text-sm text-muted-foreground">
                    mg/dL
                  </span>
                </p>
                <p className="text-sm">{glicemia.observacao}</p>
              </div>
            </div>
            <div className="">
              <p>{`${glicemia.data.getDate()}/${
                glicemia.data.getMonth() + 1
              }/${glicemia.data.getFullYear()}`}</p>
              <p className="text-right text-sm text-muted-foreground">
                {glicemia.hora.slice(0, 5)}
              </p>
            </div>
          </li>
        ) : (
          <li
            key={glicemia.id}
            className="bg-green-100 border border-green-500 rounded-md mt-2 flex justify-between p-2 items-center"
          >
            <div className="flex gap-3 items-center">
              <div className="bg-green-200 text-green-700 rounded-full p-2">
                <TrendingDownIcon />
              </div>
              <div>
                <p className="font-bold">
                  {glicemia.total}{" "}
                  <span className="font-normal text-sm text-muted-foreground">
                    mg/dL
                  </span>
                </p>
                <p className="text-sm">{glicemia.observacao}</p>
              </div>
            </div>
            <div className="">
              <p>{`${glicemia.data.getDate()}/${
                glicemia.data.getMonth() + 1
              }/${glicemia.data.getFullYear()}`}</p>
              <p className="text-right text-sm text-muted-foreground">
                {glicemia.hora.slice(0, 5)}
              </p>
            </div>
          </li>
        )
      )}
      {listCount < dataGlicemia.length && (
        <li className="text-right mt-2 mb-0">
          <Button variant="link" onClick={handleShowMore}>
            <ArrowDownIcon />
            Mostrar Mais
          </Button>
        </li>
      )}
    </ul>
  );
}
