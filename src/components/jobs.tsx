import Style from '../css/jobs.module.css'

interface SectionProps {
    id: string;
}

const Jobs: React.FC<SectionProps> = ({ id }) => {
    return (
        <section className={Style.sectionJ} id={id}>
            <h1 className={Style.jobsTitle}>Jobs</h1>
        </section>
    )
}

export default Jobs
