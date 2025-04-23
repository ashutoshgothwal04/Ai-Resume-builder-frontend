import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import GlobleApi from "./../../../../../../services/GlobleApi";
import { toast } from "sonner";
import { Brain, LoaderCircle } from "lucide-react";
import { AIChatSession } from "./../../../../../../services/AIModal";

const Summery = ({ enabledNext }) => {
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const [summery, setSummery] = useState();
  const [loading, setLoading] = useState(false);
  const [aiSuggestions, setAiSuggestions] = useState([]);
  const params = useParams();

  useEffect(() => {
    if (summery !== undefined) {
      setResumeInfo({
        ...resumeInfo,
        summery,
      });
    }
  }, [summery]);

  const onSave = (e) => {
    e.preventDefault();
    setLoading(true);

    const data = {
      data: {
        summery,
      },
    };

    GlobleApi.UpdateResumeDetail(data, params?.resumeId)
      .then((resp) => {
        enabledNext(true);
        toast("Details updated");
      })
      .catch((err) => {
        toast.error("Something went wrong");
        console.error(err);
      })
      .finally(() => setLoading(false));
  };

  const GenerateSummeryFromAI = async () => {
    if (!resumeInfo?.jobTitle) {
      toast.error("Please fill in your job title first");
      return;
    }
  
    setLoading(true);
    try {
      const prompt = `Job Title: ${resumeInfo.jobTitle}, Based on this, give me a list of resume summaries for 3 experience levels: Senior, Mid Level, and Fresher. Each summary should be 3-4 lines. Return only a JSON array with objects containing 'experience_level' and 'summary'.`;
  
      const result = await AIChatSession.sendMessage(prompt);
      const text = await result.response.text(); // ✅ Await the response
      const cleaned = text.replace(/```json|```/g, "").trim(); // ✅ Remove backticks
      const parsed = JSON.parse(cleaned); // ✅ Parse clean JSON
  
      setAiSuggestions(parsed);
      toast.success("AI generated multiple summaries!");
    } catch (err) {
      console.error("AI Generation Error:", err);
      toast.error("Failed to generate summaries.");
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div>
      <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
        <h2 className="font-bold text-lg">Summary</h2>
        <p>Add a summary for your job title.</p>

        <form className="mt-7" onSubmit={onSave}>
          <div className="flex justify-between items-end">
            <label>Add Summary</label>
            <Button
              variant="outline"
              type="button"
              onClick={GenerateSummeryFromAI}
              className="border-primary text-primary flex gap-2"
            >
              <Brain className="h-4 w-4" /> Generate from AI
            </Button>
          </div>

          <Textarea
            className="mt-5"
            required
            value={summery || ""}
            onChange={(e) => setSummery(e.target.value)}
          />

          <div className="flex mt-2 justify-end">
            <Button type="submit" disabled={loading}>
              {loading ? <LoaderCircle className="animate-spin" /> : "Save"}
            </Button>
          </div>
        </form>
      </div>

      {/* Suggestions Section */}
      {aiSuggestions?.length > 0 && (
        <div className="my-5">
          <h2 className="font-bold text-lg mb-2">AI Suggestions</h2>
          {aiSuggestions.map((item, idx) => (
            <div
              key={idx}
              onClick={() => setSummery(item?.summary)}
              className="cursor-pointer p-4 my-3 shadow-md border border-gray-200 hover:border-primary rounded-lg transition-all"
            >
              <h3 className="text-primary font-semibold">
                Level: {item?.experience_level}
              </h3>
              <p>{item?.summary}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Summery;
