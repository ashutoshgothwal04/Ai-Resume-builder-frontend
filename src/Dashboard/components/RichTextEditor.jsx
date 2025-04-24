import { Button } from "@/components/ui/button";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import { Brain, LoaderCircle } from "lucide-react";
import React, { useContext, useState } from "react";
import {
  BtnBold,
  BtnBulletList,
  BtnClearFormatting,
  BtnItalic,
  BtnLink,
  BtnNumberedList,
  BtnRedo,
  BtnStrikeThrough,
  BtnUnderline,
  BtnUndo,
  Editor,
  EditorProvider,
  HtmlButton,
  Separator,
  Toolbar,
} from "react-simple-wysiwyg";
import { AIChatSession } from "./../../../services/AIModal";
import { toast } from "sonner";

const PROMPT = `Position title: {positionTitle}. Based on this title, write exactly 3-4 concise bullet points suitable for a resume experience section. Keep it short, focused, and impactful. Return only HTML list items like <ul><li>...</li></ul>, and do NOT wrap it in \`\`\` or give explanations.`;

const RichTextEditor = ({ onChange, index, value }) => {
  const { resumeInfo } = useContext(ResumeInfoContext);
  const [loading, setLoading] = useState(false);

  const GenerateDescriptionFromAI = async () => {
    setLoading(true);

    const title = resumeInfo?.Experience?.[index]?.title;
    if (!title) {
      toast("Please add position title");
      setLoading(false);
      return;
    }

    const prompt = PROMPT.replace("{positionTitle}", title);

    try {
      const result = await AIChatSession.sendMessage(prompt);
      const resp = await result.response.text();

      const cleanedResp = resp.replace(/```html|```/g, "").trim();
      onChange(cleanedResp, index);
    } catch (error) {
      toast("Failed to generate content");
      console.error("AI generation error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="flex justify-between my-2">
        <label className="text-lg font-semibold">Description</label>
        <Button
          onClick={GenerateDescriptionFromAI}
          className="flex gap-2"
          variant="outline"
          disabled={loading}
        >
          {loading ? (
            <LoaderCircle className="animate-spin" />
          ) : (
            <>
              <Brain className="h-4 w-4" /> Generate from AI
            </>
          )}
        </Button>
      </div>
      <EditorProvider>
        <Editor
          value={value}
          onChange={(e) => {
            onChange(e.target.value, index);
          }}
        >
          <Toolbar>
            <BtnUndo />
            <BtnRedo />
            <Separator />
            <BtnBold />
            <BtnItalic />
            <BtnUnderline />
            <BtnStrikeThrough />
            <Separator />
            <BtnNumberedList />
            <BtnBulletList />
            <Separator />
            <BtnLink />
            <BtnClearFormatting />
            <HtmlButton />
            <Separator />
          </Toolbar>
        </Editor>
      </EditorProvider>
    </div>
  );
};

export default RichTextEditor;