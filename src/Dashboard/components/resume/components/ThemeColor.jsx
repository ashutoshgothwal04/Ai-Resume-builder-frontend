import React, { useContext, useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { LayoutGrid } from "lucide-react";
import GlobalApi from "../../../../../services/GlobleApi";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";

function ThemeColor() {
  const colors =  [
    "#38BDF8", // Sky Blue
    "#8B5CF6", // Violet
    "#F43F5E", // Rose
    "#10B981", // Emerald
    "#F59E0B", // Amber
    "#6366F1", // Indigo
    "#64748B", // Slate
    "#D946EF", // Fuchsia
    "#14B8A6", // Teal
    "#A8A29E", // Warm Gray
    "#3B82F6", // Blue
    "#EC4899", // Pink
    "#22C55E", // Green
    "#EAB308", // Yellow
    "#0EA5E9", // Light Blue
    "#7C3AED", // Deep Purple
    "#FB923C", // Orange
    "#F87171", // Soft Red
    "#4ADE80", // Mint Green
    "#94A3B8"  // Cool Gray
  ];
  

  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const [selectedColor, setSelectedColor] = useState();
  const { resumeId } = useParams();
  const onColorSelect = (color) => {
    setSelectedColor(color);
    setResumeInfo({
      ...resumeInfo,
      themeColor: color,
    });
    const data = {
      data: {
        themeColor: color,
      },
    };
    GlobalApi.UpdateResumeDetail(data, resumeId).then((resp) => {
      console.log(resp);
      toast.success("Theme Color Updated");
    });
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="flex gap-2">
          {" "}
          <LayoutGrid /> Theme
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <h2 className="mb-2 text-sm font-bold">Select Theme Color</h2>
        <div className="grid grid-cols-5 gap-3">
          {colors.map((item, index) => (
            <div key={index}>
              <div
                onClick={() => onColorSelect(item)}
                className={`h-5 w-5 rounded-sm cursor-pointer
             hover:border-black border
             ${selectedColor == item && "border border-black"}
             `}
                style={{
                  background: item,
                }}
              ></div>
            </div>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}

export default ThemeColor;
