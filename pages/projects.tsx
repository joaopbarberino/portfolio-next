import React, { useContext, useState, useEffect, useRef } from 'react';
import Layout from '@/components/Layout';
import StyledProjectsContainer from '@/styles/projects';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import { Typography, Button, FormControlLabel, Switch, Stack, ToggleButtonGroup, ToggleButton, Collapse, Theme, Breakpoint } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import data from '@/helpers/data.json';
import AppContext from '@/services/AppContext';
import ProjectCard from '@/components/Projects/ProjectCard';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import WebIcon from '@mui/icons-material/Web';
import { IProject } from '@/types/projects';
import { useTheme } from '@mui/material/styles';
import { useWidth } from '@/helpers/hooks';
import { arrayChunk } from '@/helpers';
import ProjectDetail from '@/components/Projects/ProjectDetail';
import { motion, AnimatePresence } from 'framer-motion';
import PageActionsContainer from '@/components/PageActionsContainer';
import PageChangeButton from '@/components/PageChangeButton';

enum EProjectTypes {
    GAME = 0,
    WEB = 1
};

interface ILabel {
    [key: string]: {
        en: string,
        ptBr: string
    }
};

const LABELS: ILabel = {
    buttonGroup: {
        en: 'Select project type',
        ptBr: 'Selecione o tipo de projeto'
    },
    gameDevButton: {
        en: 'As a Game Dev',
        ptBr: 'Como Game Dev',
    },
    webDevButton: {
        en: 'As a Web Dev',
        ptBr: 'Como Web Dev',
    }
};

const Projects = () => {
    const { language } = useContext(AppContext);
    const currentBreakpoint = useWidth();

    const [projectType, setProjectType] = useState<EProjectTypes>(0);
    const [projects, setProjects] = useState<IProject[]>([]);
    const [filteredProjects, setFilteredProjects] = useState<IProject[]>([]);
    const [chunkedProjects, setChunkedProjects] = useState<IProject[][]>([]);
    const [selectedProject, setSelectedProject] = useState<IProject>();

    useEffect(() => {
        const filteredProjects = data[language].projects.works.filter(p => p.type === projectType.toString());
        setFilteredProjects(filteredProjects);

        if (selectedProject) {
            // TODO: use project Id for comparison
            setSelectedProject(filteredProjects.filter(project => project.name === selectedProject.name)[0])
        };

    }, [language, projectType, projects, selectedProject]);

    useEffect(() => {
        const breakpoints = {
            xs: 1,
            sm: 2,
            md: 3,
            lg: 4,
            xl: 4
        };

        const chunkSize = breakpoints[currentBreakpoint]

        setChunkedProjects(arrayChunk(filteredProjects, chunkSize));
    }, [currentBreakpoint, filteredProjects]);

    const handleProjectType = (event: React.MouseEvent<HTMLElement>, newType: number) => {
        if (newType)
            setProjectType(newType)
    };

    return (
        <Layout>
            <StyledProjectsContainer maxWidth='xl'>
                <Typography variant='h1' className='title'><AccountTreeIcon /> {data[language].projects.title}</Typography>

                <div className='content'>
                    <Typography dangerouslySetInnerHTML={{ __html: data[language].projects.text }} />

                    <ToggleButtonGroup
                        value={projectType}
                        exclusive
                        onChange={handleProjectType}
                        aria-label={LABELS['buttonGroup'][language]}
                        size='large'
                    >
                        <ToggleButton value={'0'} aria-label={LABELS['gameDevButton'][language]} color='secondary'>
                            <SportsEsportsIcon /> {LABELS['gameDevButton'][language]}
                        </ToggleButton>
                        <ToggleButton value={'1'} aria-label={LABELS['webDevButton'][language]} color='secondary'>
                            <WebIcon /> {LABELS['webDevButton'][language]}
                        </ToggleButton>
                    </ToggleButtonGroup>

                    <Grid container columnSpacing={2} rowSpacing={4} className='projects-container'>
                        {
                            chunkedProjects.map((projects, index) => {
                                const projectsRow = projects.map(project =>
                                    <Grid xs={12} sm={6} md={4} lg={3} key={project.link}>
                                        <ProjectCard
                                            project={project}
                                            setSelectedProject={(project) => setSelectedProject(project)}
                                            isSelected={selectedProject === project}
                                        />
                                    </Grid>
                                );
                                // TODO: use project Id for comparison
                                const showDetail = projects.some(p => p.name === selectedProject?.name);

                                return (
                                    <React.Fragment key={index}>
                                        {projectsRow}
                                        {
                                            <Grid xs={12} className='project-detail-container'>
                                                <AnimatePresence >
                                                    {
                                                        selectedProject && showDetail &&
                                                        <motion.div
                                                            key='selected-project'
                                                            initial={{ opacity: 0, height: 0 }}
                                                            animate={{ opacity: 1, height: 'auto' }}
                                                            exit={{ opacity: 0, height: 0 }}
                                                            transition={{ ease: 'anticipate', duration: .5 }}

                                                        >
                                                            <ProjectDetail
                                                                project={selectedProject}
                                                                onClose={() => setSelectedProject(undefined)}
                                                            />
                                                        </motion.div>
                                                    }

                                                </AnimatePresence>
                                            </Grid>

                                        }
                                    </React.Fragment>
                                )
                            }
                            )
                        }
                    </Grid>

                    <PageActionsContainer>
                        <PageChangeButton href={data[language].header[2].link} text={data[language].header[2].text} type='prev' />
                        <PageChangeButton href={data[language].header[4].link} text={data[language].header[4].text} />
                    </PageActionsContainer>
                </div>
            </StyledProjectsContainer>
        </Layout >
    )
};

export default Projects;