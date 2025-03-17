import React from "react";
import { Card, CardContent, CardFooter } from "./ui/card";
import { SnackDisplay } from "@/app/interfaces/SnackInterfaces";

const SnackCard = ({
  snack,
  children,
}: {
  snack: SnackDisplay;
  children: React.ReactNode;
}) => {
  return (
    <Card key={snack.snack_id} className="w-44">
      <CardContent className="p-2 max-h-60 max-w-44">{children}</CardContent>
      <CardFooter className="flex flex-wrap items-center justify-center pt-3">
        {snack.name}
      </CardFooter>
    </Card>
  );
};

export default SnackCard;
