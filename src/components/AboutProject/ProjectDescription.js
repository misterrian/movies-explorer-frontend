import "./ProjectDescription.css";

export default function ProjectDescription({title, description}) {
    return (
        <div className="project-description">
            <p className="project-description__header">{title}</p>
            <p className="project-description__description">{description}</p>
        </div>
    );
}
