import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import { LoaderCircle, Trash2 } from "lucide-react";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import GlobalApi from "../../../../../../services/GlobleApi";
import { toast } from "sonner";

const EMPTY_EDUCATION = {
  universityName: "",
  degree: "",
  major: "",
  startDate: "",
  endDate: "",
  description: "",
};

function Education() {
  const [loading, setLoading] = useState(false);
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const params = useParams();

  const [educationalList, setEducationalList] = useState([EMPTY_EDUCATION]);

  // Load from context on mount
  useEffect(() => {
    if (Array.isArray(resumeInfo?.educationDetail) && resumeInfo.educationDetail.length) {
      setEducationalList(resumeInfo.educationDetail);
    }
  }, [resumeInfo]);
  

  const handleChange = (event, index) => {
    const { name, value } = event.target;
    const updatedList = [...educationalList];
    updatedList[index][name] = value;
    setEducationalList(updatedList);

    setResumeInfo((prev) => ({
      ...prev,
      educationDetail: updatedList,
    }));
    
  };

  const AddNewEducation = () => {
    const updatedList = [...educationalList, { ...EMPTY_EDUCATION }];
    setEducationalList(updatedList);
    setResumeInfo((prev) => ({
      ...prev,
      education: updatedList,
    }));
  };

  const RemoveEducation = () => {
    if (educationalList.length > 1) {
      const updatedList = educationalList.slice(0, -1);
      setEducationalList(updatedList);
      setResumeInfo((prev) => ({
        ...prev,
        education: updatedList,
      }));
    }
  };

  const onSave = () => {
    if (!Array.isArray(educationalList)) {
      toast("Invalid education data!");
      return;
    }

    setLoading(true);
    const data = {
      data: {
        educationDetail: educationalList.map(({ id, ...rest }) => rest),
      },
    };

    GlobalApi.UpdateResumeDetail(data, params.resumeId)
      .then(() => {
        setLoading(false);
        toast("Details updated!");
      })
      .catch(() => {
        setLoading(false);
        toast("Server Error, Please try again!");
      });
  };

  return (
    <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
      <h2 className="font-bold text-lg">Education</h2>
      <p>Add Your educational details</p>

      <div>
        {educationalList.map((item, index) => (
          <div key={index}>
            <div className="grid grid-cols-2 gap-3 border p-3 my-5 rounded-lg">
              <div className="col-span-2">
                <label>University Name</label>
                <Input
                  name="universityName"
                  onChange={(e) => handleChange(e, index)}
                  value={item.universityName || ""}
                />
              </div>
              <div>
                <label>Degree</label>
                <Input
                  name="degree"
                  onChange={(e) => handleChange(e, index)}
                  value={item.degree || ""}
                />
              </div>
              <div>
                <label>Major</label>
                <Input
                  name="major"
                  onChange={(e) => handleChange(e, index)}
                  value={item.major || ""}
                />
              </div>
              <div>
                <label>Start Date</label>
                <Input
                  type="date"
                  name="startDate"
                  onChange={(e) => handleChange(e, index)}
                  value={item.startDate || ""}
                />
              </div>
              <div>
                <label>End Date</label>
                <Input
                  type="date"
                  name="endDate"
                  onChange={(e) => handleChange(e, index)}
                  value={item.endDate || ""}
                />
              </div>
              <div className="col-span-2">
                <label>Description</label>
                <Textarea
                  name="description"
                  onChange={(e) => handleChange(e, index)}
                  value={item.description || ""}
                />
              </div>
            </div>
          </div>
        ))}
      </div>


      <div className="flex justify-between">
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={AddNewEducation}
            className="text-primary border-primary"
          >
            + Add More Education
          </Button>
          <Button
            variant="outline"
            onClick={RemoveEducation}
            className="text-primary border-primary"
          >
            <Trash2 className="text-red-500" /> Remove
          </Button>
        </div>
        <Button disabled={loading} onClick={onSave}>
          {loading ? <LoaderCircle className="animate-spin" /> : "Save"}
        </Button>
      </div>
    </div>
  );
}

export default Education;
