import { Input } from "@/components/ui/input";
import React, { useContext, useEffect, useState } from "react";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import { Button } from "@/components/ui/button";
import { LoaderCircle, PlusIcon, Trash2Icon } from "lucide-react";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import GlobleApi from "./../../../../../../services/GlobleApi";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

const Skills = () => {
  const [loading, setLoading] = useState(false);
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const { resumeId } = useParams();

  const [skillsList, setSkillsList] = useState([
    {
      name: "",
      rating: 0,
    },
  ]);

  // ✅ Load initial skills from context (one-time when resumeInfo changes)
  useEffect(() => {
    if (Array.isArray(resumeInfo?.skills) && resumeInfo.skills.length > 0) {
      setSkillsList(resumeInfo.skills);
    }
  }, []);

  const handleChange = (index, name, value) => {
    const updated = [...skillsList];
    updated[index][name] = value;
    setSkillsList(updated);
  };

  const addNewSkills = () => {
    setSkillsList([
      ...skillsList,
      {
        name: "",
        rating: 0,
      },
    ]);
  };

  const removeSkills = () => {
    if (skillsList.length > 1) {
      setSkillsList((prev) => prev.slice(0, -1));
    }
  };

  const onSave = () => {
    setLoading(true);
    const data = {
      data: {
        skills: skillsList.map(({ id, ...rest }) => rest),
      },
    };
    GlobleApi.UpdateResumeDetail(data, resumeId)
      .then((res) => {
        setLoading(false);
        toast.success("Skills updated successfully!");
      })
      .catch((error) => {
        setLoading(false);
        toast.error("400 server error! Try again.");
        console.error(error);
      });
  };

  // ✅ Sync context when skillsList changes (real-time preview update)
  useEffect(() => {
    setResumeInfo((prev) => ({
      ...prev,
      skills: skillsList,
    }));
  }, [skillsList]);

  return (
    <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
      <h2 className="font-bold text-lg">Skills</h2>
      <p>Add your top professional key skills</p>

      <div>
        {skillsList.map((item, index) => (
          <div key={index}>
            <div className="flex justify-between mb-2 border rounded-lg p-3">
              <div>
                <label className="text-sm">Name</label>
                <Input
                  value={item?.name}
                  className="w-full"
                  onChange={(e) => handleChange(index, "name", e.target.value)}
                />
              </div>
              <Rating
                style={{ maxWidth: 120 }}
                value={item.rating}
                onChange={(v) => handleChange(index, "rating", v)}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-between">
        <div className="flex gap-2">
          <Button
            onClick={addNewSkills}
            variant="outline"
            className="text-primary border-primary"
          >
            <PlusIcon /> Add More Skills
          </Button>
          <Button
            onClick={removeSkills}
            variant="outline"
            className="text-primary border-primary"
          >
            <Trash2Icon className="text-red-600" /> Remove
          </Button>
        </div>
        <Button disabled={loading} onClick={onSave}>
          {loading ? <LoaderCircle className="animate-spin" /> : "Save"}
        </Button>
      </div>
    </div>
  );
};

export default Skills;
