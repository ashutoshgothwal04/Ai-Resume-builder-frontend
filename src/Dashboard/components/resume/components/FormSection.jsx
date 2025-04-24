import React, { useState } from "react";
import PersonalDetailsForm from "./forms/PersonalDetailsForm";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Home, LayoutGrid } from "lucide-react";
import Summery from "./forms/Summery";
import Experience from "./forms/Experience";
import Education from "./forms/Education";
import Skills from "./forms/Skills";
import { Link, Navigate, useParams } from "react-router-dom";
import ThemeColor from "./ThemeColor";
import Projects from "./forms/Projects";

const FormSection = () => {
  const [activeFormIndex, setActiveFormIndex] = useState(1);
  const [enableNext, setEnableNext] = useState(false);
  const { resumeId } = useParams();
  return (
    <div>
      <div className="flex justify-between items-center">
        <div className="flex gap-5">
          <Link to={"/dashboard"}>
            <Button>
              <Home />
            </Button>
          </Link>
          <ThemeColor />
        </div>

        <div className="flex gap-2">
          {activeFormIndex > 1 && (
            <Button onClick={() => setActiveFormIndex(activeFormIndex - 1)}>
              {" "}
              <ArrowLeft />{" "}
            </Button>
          )}
          <Button
            disabled={!enableNext}
            className="flex gap-2"
            onClick={() => setActiveFormIndex(activeFormIndex + 1)}
          >
            {" "}
            Next <ArrowRight />{" "}
          </Button>
        </div>
      </div>

      {/* personal details*/}
      {activeFormIndex == 1 ? (
        <PersonalDetailsForm enabledNext={(v) => setEnableNext(v)} />
      ) : activeFormIndex == 2 ? (
        <Summery enabledNext={(v) => setEnableNext(v)} />
      ) : activeFormIndex == 4 ? (
        <Projects enabledNext={(v) => setEnableNext(v)} />
      ) : activeFormIndex == 3 ? (
        <Experience enabledNext={(v) => setEnableNext(v)} />
      ) : activeFormIndex == 5 ? (
        <Education enabledNext={(v) => setEnableNext(v)} />
      ) : activeFormIndex == 6 ? (
        <Skills enabledNext={(v) => setEnableNext(v)} />
      ) : activeFormIndex == 7 ? (
        <Navigate to={"/my-resume/" + resumeId + "/view"} />
      ) : null}
    </div>
  );
};

export default FormSection;

// mark experice as no. 4 and projects as 3
