import Title from "../Title/Title";
import ProjectDescription from "./ProjectDescription";
import ProjectSchedule from "./ProjectSchedule";

import "./AboutProject.css";

export default function AboutProject() {
    return (
        <section id="about" className="about-project-section">
            <Title title="О проекте"/>
            <div className="about-project-section__description">
                <ProjectDescription
                    title="Дипломный проект включал 5 этапов"
                    description="Составление плана, работу над бэкендом, вёрстку, добавление функциональности и
                        финальные доработки."
                />
                <ProjectDescription
                    title="На выполнение диплома ушло 5 недель"
                    description="У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы
                        успешно защититься."
                />
            </div>
            <ProjectSchedule/>
        </section>
    );
}
