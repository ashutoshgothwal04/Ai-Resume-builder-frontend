import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import RichTextEditor from "@/Dashboard/components/RichTextEditor";
import { LoaderCircle, PlusIcon, Trash2Icon } from "lucide-react";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import GlobleApi from "./../../../../../../services/GlobleApi";
import { toast } from "sonner";

// 🔥 Important: Deep equality checker
const areEqual = (a, b) => JSON.stringify(a) === JSON.stringify(b);

const Projects = () => {
    const fields = {
        projectName: "",
        description: "",
        LanguagesUsed: "",
        GitHubRepoLink: "",
    };

    const [projectsList, setProjectsList] = useState([fields]);
    const [loading, setLoading] = useState(false);
    const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
    const params = useParams();

    const handleInputChange = (e, index) => {
        const { name, value } = e.target;
        const updatedList = JSON.parse(JSON.stringify(projectsList));
        updatedList[index][name] = value;
        setProjectsList(updatedList);
    };

    //   const handleRichTextEditor = (value, name, index) => {
    //     const updatedList = JSON.parse(JSON.stringify(projectsList));
    //     updatedList[index][name] = value;
    //     setProjectsList(updatedList);
    //   };


    const addMoreProjects = () => {
        setProjectsList([...projectsList, { ...fields }]);
    };

    const removeProject = () => {
        if (projectsList.length > 1) {
            setProjectsList(projectsList.slice(0, -1));
        }
    };

    // const onSave = () => {
    //     setLoading(true);
    //     const data = {
    //         data: {
    //             projects: projectsList.map(({ id, ...rest }) => rest),
    //         },
    //     };

    //     GlobleApi.UpdateResumeDetail(data, params?.resumeId)
    //         .then((res) => {
    //             setLoading(false);
    //             toast.success("Projects saved!");
    //         })
    //         .catch((error) => {
    //             setLoading(false);
    //             console.error("Strapi Error Response:", error.response?.data);
    //             toast.error("Failed to save projects. Check console for details.");
    //           });

    // };

    const onSave = () => {
        setLoading(true);
        const data = {
            data: {
                projects: projectsList.map(project => ({
                    projectName: project.projectName,
                    description: project.description,
                    LanguagesUsed: project.LanguagesUsed,
                    GitHubRepoLink: project.GitHubRepoLink
                }))
            }
        };
    
        GlobleApi.UpdateResumeDetail(data, params?.resumeId)
            .then((res) => {
                setLoading(false);
                toast.success("Projects saved!");
            })
            .catch((error) => {
                setLoading(false);
                console.error("Save error:", error.response?.data || error.message);
            });
    };



    // Sync context on first load
    useEffect(() => {
        if (resumeInfo?.projects?.length > 0) {
            setProjectsList(resumeInfo.projects);
        }
    }, []);

    // Update context when local state changes
    useEffect(() => {
        if (!areEqual(resumeInfo?.projects, projectsList)) {
            setResumeInfo((prev) => ({
                ...prev,
                projects: projectsList,
            }));
        }
    }, [projectsList]);

    return (
        <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
            <h2 className="font-bold text-lg">Projects</h2>
            <p>Add your Project name</p>

            <div>
                {projectsList.map((item, index) => (
                    <div key={index} className="grid grid-cols-2 gap-3 border p-3 my-5 rounded-lg">
                        <div>
                            <label className="text-sm">Project Name</label>
                            <Input
                                name="projectName"
                                value={item.projectName}
                                onChange={(e) => handleInputChange(e, index)}
                            />
                        </div>
                        <div className="col-span-2">
                            {/* <RichTextEditor
                                value={item.description} // CHANGED from defaultValue
                                index={index}
                                onRichTextEditorChange={(value) =>
                                    handleRichTextEditor(value, "description", index)
                                }
                            /> */}
                            <label className="text-sm">Description</label>
                            <textarea
                                name="description"
                                rows={5}
                                className="w-full p-2 border rounded resize-y"
                                value={item.description}
                                onChange={(e) => handleInputChange(e, index)}
                                placeholder="• Built X using Y...\n• Integrated Z..."
                            />

                        </div>
                        <div>
                            <label className="text-sm">Languages Used</label>
                            <Input
                                name="LanguagesUsed"
                                value={item.LanguagesUsed}
                                onChange={(e) => handleInputChange(e, index)}
                            />
                        </div>
                        <div>
                            <label className="text-sm">GitHub Repository Link</label>
                            <Input
                                name="GitHubRepoLink"
                                value={item.GitHubRepoLink}
                                onChange={(e) => handleInputChange(e, index)}
                            />
                        </div>
                    </div>
                ))}
            </div>

            <div className="flex justify-between">
                <div className="flex gap-2">
                    <Button
                        variant="outline"
                        className="text-primary border-primary"
                        onClick={addMoreProjects}
                    >
                        <PlusIcon className="mr-1" /> Add More Projects
                    </Button>
                    <Button
                        variant="outline"
                        className="text-primary border-primary"
                        onClick={removeProject}
                    >
                        <Trash2Icon className="text-red-600 mr-1" /> Remove
                    </Button>
                </div>
                <Button disabled={loading} onClick={onSave}>
                    {loading ? <LoaderCircle className="animate-spin" /> : "Save"}
                </Button>
            </div>
        </div>
    );
};

export default Projects;
