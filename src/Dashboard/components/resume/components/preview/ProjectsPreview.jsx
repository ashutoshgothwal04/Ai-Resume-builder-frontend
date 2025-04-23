import React from 'react';

const ProjectsPreview = ({ resumeInfo }) => {
  const projects = Array.isArray(resumeInfo?.projects) ? resumeInfo.projects : [];

  return (
    <div className="my-6 overflow-hidden break-words">
      <h2
        className="text-center font-bold text-xl mb-2"
        style={{ color: resumeInfo?.themeColor }}
      >
        Projects
      </h2>

      <hr style={{ borderColor: resumeInfo?.themeColor }} />

      <div>
        {projects.map((project, index) => (
          <div key={index} className="my-3">
            {/* Title + Tech Stack in same line */}
            <p className="text-md">
              <span className="font-bold text-lg">{project.projectName}</span>
              <span className="font-normal text-base">
                {project.LanguagesUsed ? ` – ${project.LanguagesUsed}` : ""}
              </span>
            </p>

            {/* <p className="text-md mt-1">
              {typeof project.description === "string"
                ? project.description.replace(/\s+/g, " ").trim()
                : "No description provided."}
            </p> */}

            {project.description ? (
              <ul className="list-disc pl-5 mt-1 text-md space-y-1 break-words">
              {project.description
                  .split('\n')
                  .filter((line) => line.trim() !== "")
                  .map((line, i) => (
                    <li key={i}>{line.trim()}</li>
                  ))}
              </ul>
            ) : (
              <p className="text-md mt-1 italic">No description provided.</p>
            )}


            {/* GitHub Link */}
            {project.GitHubRepoLink && (
              <p className="text-md mt-1">
                GitHub:{' '}
                <a
                  href={project.GitHubRepoLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium"
                  style={{ color: resumeInfo?.themeColor }}
                >
                  {project.GitHub || "View Repository"}
                </a>
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectsPreview;
